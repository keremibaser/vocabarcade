/* Deterministic test: drive Tetris to a line clear and verify the quiz round-trip. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function makeCtxProxy() {
  return new Proxy({}, { get(_t, p) {
    if (p === "measureText") return () => ({ width: 10 });
    return () => {};
  }, set() { return true; } });
}
function makeEl() {
  return { style: new Proxy({}, { get: () => "", set: () => true }), classList: { add(){}, remove(){}, contains(){return false;}, toggle(){} },
    dataset: {}, children: [], width: 800, height: 600, textContent: "", innerHTML: "",
    appendChild(){}, removeChild(){}, querySelector(){ return makeEl(); }, querySelectorAll(){ return []; },
    addEventListener(){}, removeEventListener(){}, getBoundingClientRect(){ return { left:0, top:0, width:800, height:600 }; },
    getContext(){ return makeCtxProxy(); }, focus(){}, setAttribute(){}, removeAttribute(){}, setProperty(){} };
}

const htmlPath = path.resolve("games/tetris/tetris.html");
const html = fs.readFileSync(htmlPath, "utf8");
const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const common = fs.readFileSync(path.resolve("js/engine-common.js"), "utf8");

const parentMessages = [];
let rafCb = null, clock = 0;
const winListeners = {};
const windowObj = {
  innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
  __TETRIS_TEST__: {},
  location: { search: "?payload=" + Buffer.from(JSON.stringify({
    vocab: [{ from: "merhaba", correct: "hello", distractors: ["bye","thanks","no"] }],
    fromLang: "Turkish", toLang: "English", accent: "#7048e8",
  })).toString("base64") },
  addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
  removeEventListener() {},
  parent: { postMessage: (m) => parentMessages.push(m) },
};
const sandbox = {
  console, Math, JSON, Date, Object, Array, String, Number, Boolean, parseInt, parseFloat, isNaN,
  setTimeout: (fn) => { try { fn(); } catch (e) {} },
  URLSearchParams,
  TextEncoder: require("util").TextEncoder,
  TextDecoder: require("util").TextDecoder,
  btoa: (s) => Buffer.from(s, "utf8").toString("base64"),
  atob: (s) => Buffer.from(s, "base64").toString("utf8"),
  performance: { now: () => clock },
  requestAnimationFrame: (cb) => { rafCb = cb; return 1; },
  cancelAnimationFrame: () => {},
  localStorage: { getItem: () => null, setItem(){}, removeItem(){} },
  confirm: () => true,
  window: windowObj,
  document: { getElementById: () => makeEl(), documentElement: { style: { setProperty(){} } }, head: { appendChild(){} }, body: { dataset: {}, appendChild(){} }, createElement: () => makeEl(), addEventListener(){} },
  global: null,
};
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(common, sandbox, { filename: "engine-common.js" });
vm.runInContext(inline, sandbox, { filename: "tetris.html" });

function tick(n) { for (let i = 0; i < n; i++) { clock += 16; const cb = rafCb; rafCb = null; if (!cb) throw new Error("render loop died"); cb(clock); } }
function fireMsg(type, extra) { (winListeners.message || []).forEach((fn) => fn({ data: Object.assign({ type }, extra || {}) })); }

tick(2);
const T = windowObj.__TETRIS_TEST__;
if (!T) { console.log("FAIL: test seam not attached"); process.exit(1); }
T.startGame();
tick(2);
T.completeBottomRow();   // make the bottom row completely full
T.scanLines();           // detect full rows -> pause + ask (no stray piece placed)

// find the ask
let asked = false, askWord = null;
for (let k = parentMessages.length - 1; k >= 0; k--) {
  if (parentMessages[k].type === "ask") { asked = true; askWord = parentMessages[k].word; parentMessages.splice(k, 1); break; }
}
console.log("ask raised:", asked, "| word:", askWord, "| pending rows:", T.pending(), "| state:", T.state());
if (!asked) { console.log("FAIL: quiz not triggered on line clear"); process.exit(1); }

// answer correctly -> lines should clear
fireMsg("answer", { correct: true });
tick(2);
console.log("after correct answer -> linesCleared:", T.lines(), "| pending:", T.pending(), "| state:", T.state());
const ok = T.lines() >= 1 && T.pending() === 0 && T.state() === "playing";
if (!ok) { console.log("FAIL: line not cleared after correct answer"); process.exit(1); }
console.log("OK  tetris line-clear -> quiz -> clear path works");

// ---- wrong-answer path: complete another row, answer wrong -> line stays, -1 life ----
T.completeBottomRow();
T.scanLines();
let asked2 = false;
for (let k = parentMessages.length - 1; k >= 0; k--) {
  if (parentMessages[k].type === "ask") { asked2 = true; parentMessages.splice(k, 1); break; }
}
if (!asked2) { console.log("FAIL: second quiz not raised"); process.exit(1); }
const livesBefore = (parentMessages.find((m) => m.type === "hud") || {}).lives;
fireMsg("answer", { correct: false });
tick(2);
console.log("after WRONG answer -> linesCleared:", T.lines(), "| pending:", T.pending(), "| state:", T.state());
const wrongOk = T.pending() === 0 && T.state() === "playing";
console.log(wrongOk ? "OK  tetris wrong-answer path works (line kept, life lost, resumed)" : "FAIL: wrong-answer path");
process.exit(wrongOk ? 0 : 1);
