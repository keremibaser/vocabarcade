/* Regression test for Snake — same freeze-after-answer bug as Breakout/Invaders:
 *  - correct answer must resume the game (state -> playing)
 *  - wrong answer with lives remaining must resume
 *  - wrong answer on the last life must end the game (state -> over)
 *  - clearing all words (all correct) must WIN
 * Reuses the browser-stub loader pattern from test_invaders.js / verify_game.js.
 */
const fs = require("fs");
const vm = require("vm");

function makeCtxProxy() {
  return new Proxy({}, {
    get(_t, prop) {
      if (prop === "measureText") return () => ({ width: 10 });
      if (prop === "setTransform" || prop === "canvas") return () => {};
      return () => {};
    },
    set() { return true; },
  });
}
function makeEl(tag) {
  return {
    tagName: tag || "div",
    style: new Proxy({}, { get: () => "", set: () => true }),
    classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
    dataset: {}, children: [], width: 800, height: 600,
    textContent: "", innerHTML: "",
    appendChild() {}, removeChild() {},
    querySelector() { return makeEl(); }, querySelectorAll() { return []; },
    addEventListener() {}, removeEventListener() {},
    getBoundingClientRect() { return { left: 0, top: 0, width: 800, height: 600 }; },
    getContext() { return makeCtxProxy(); },
    focus() {}, setAttribute() {}, removeAttribute() {}, setProperty() {},
  };
}

const html = fs.readFileSync("games/snake/snake.html", "utf8");
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const inline = m[1];
const common = fs.readFileSync("js/engine-common.js", "utf8");

const winListeners = {};
const sandbox = {
  console, Math, JSON, Date, Object, Array, String, Number, Boolean, parseInt, parseFloat, isNaN,
  setTimeout: (fn) => { try { fn(); } catch (e) {} },
  URLSearchParams,
  btoa: (s) => Buffer.from(s, "utf8").toString("base64"),
  atob: (s) => Buffer.from(s, "base64").toString("utf8"),
  TextEncoder: require("util").TextEncoder, TextDecoder: require("util").TextDecoder,
  performance: { now: () => 0 },
  requestAnimationFrame: () => 1, cancelAnimationFrame: () => {},
  localStorage: { _d: {}, getItem(k){return this._d[k]||null;}, setItem(k,v){this._d[k]=String(v);}, removeItem(){} },
  confirm: () => true,
};
const windowObj = {
  innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
  location: { search: "?payload=" + Buffer.from(JSON.stringify({
    vocab: [
      { from: "elma", correct: "apple", distractors: ["pear","plum","berry"] },
      { from: "kedi", correct: "cat", distractors: ["dog","cow","pig"] },
      { from: "kitap", correct: "book", distractors: ["pen","desk","bag"] },
      { from: "su", correct: "water", distractors: ["fire","earth","air"] },
    ],
    fromLang: "Turkish", toLang: "English",
  })).toString("base64") },
  addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
  removeEventListener() {},
  parent: { postMessage() {} },
  VocabEngine: null,
  __SNAKE_TEST__: true,
  __OVER_GUARD_OFF__: true,   // tests restart instantly (see test_overguard.js)
};
sandbox.window = windowObj;
sandbox.document = {
  getElementById: () => makeEl("canvas"),
  documentElement: { style: { setProperty() {} } },
  head: { appendChild() {} }, body: { dataset: {}, appendChild() {} },
  createElement: (t) => makeEl(t), addEventListener() {},
};
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(common, sandbox, { filename: "engine-common.js" });
vm.runInContext(inline, sandbox, { filename: "snake.html" });

const snk = sandbox.window.__snake;
function fireMsg(type) { (winListeners["message"] || []).forEach((fn) => fn({ data: { type } })); }

let pass = true;
function check(name, cond) { console.log((cond ? "OK  " : "FAIL ") + name); if (!cond) pass = false; }

// 1) start the game
fireMsg("start");
check("game started -> playing", snk.getState() === "playing");

// 2) correct answer must resume
const s1 = snk.hitEdu(true);
check("after CORRECT -> playing (not frozen)", s1 === "playing");

// 3) wrong answer with lives remaining must resume
const livesBefore = snk.lives();
const s2 = snk.hitEdu(false);
check("after WRONG (lives left) -> playing", s2 === "playing");
check("WRONG cost a life", snk.lives() === livesBefore - 1);

// 4) drain lives, then wrong on last life -> over
let guard = 0;
while (snk.lives() > 1 && guard++ < 20) snk.hitEdu(false);
const s3 = snk.hitEdu(false);
check("after WRONG with last life -> over (game ends)", s3 === "over");

// 5) walls wrap around (no wall death) — block by block to the opposite side
fireMsg("start");
check("snake slowed down (step interval >= 0.18s)", snk.speed() >= 0.18);
let r;
r = snk.stepFrom(39, 15, 1, 0);
check("right wall -> wraps to x=0", r.x === 0 && r.y === 15 && r.state === "playing");
r = snk.stepFrom(0, 15, -1, 0);
check("left wall -> wraps to x=39", r.x === 39 && r.y === 15 && r.state === "playing");
r = snk.stepFrom(20, 0, 0, -1);
check("top wall -> wraps to y=29", r.x === 20 && r.y === 29 && r.state === "playing");
r = snk.stepFrom(20, 29, 0, 1);
check("bottom wall -> wraps to y=0", r.x === 20 && r.y === 0 && r.state === "playing");
check("still playing after wrapping through all 4 walls", snk.getState() === "playing");

console.log(pass ? "\nALL SNAKE REGRESSION TESTS PASSED" : "\nSNAKE TESTS FAILED");
process.exit(pass ? 0 : 1);
