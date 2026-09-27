/* Regression test for Breakout:
 *  - correct answer after an educational brick MUST resume the game (state -> playing, ball active)
 *  - wrong answer with lives remaining must also resume
 *  - wrong answer on the last life must end the game (state -> over)
 * Reuses the same browser-stub loader as verify_game.js.
 */
const fs = require("fs");
const path = require("path");
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

const html = fs.readFileSync("games/breakout/breakout.html", "utf8");
const dir = path.dirname("games/breakout/breakout.html");
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
    vocab: [{ tr: "elma", en: "apple", distractors: ["pear","plum","berry"] }],
    fromLang: "Turkish", toLang: "English",
  })).toString("base64") },
  addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
  removeEventListener() {},
  parent: { postMessage() {} },
  VocabEngine: null,
  __BRK_TEST__: true,
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
vm.runInContext(inline, sandbox, { filename: "breakout.html" });

const brk = sandbox.window.__brk;
function fireMsg(type) { (winListeners["message"] || []).forEach((fn) => fn({ data: { type } })); }

let pass = true;
function check(name, cond) { console.log((cond ? "OK  " : "FAIL ") + name); if (!cond) pass = false; }

// 1) start the game
fireMsg("start");
check("game started -> playing", brk.getState() === "playing");
check("ball active after start", brk.isBallActive() === true);

// 2) correct answer must resume WITHOUT resetting the ball position
brk.setBall(150, 200);
const s1 = brk.hitEdu(true);
check("after CORRECT -> playing (not frozen)", s1 === "playing");
check("after CORRECT -> ball active", brk.isBallActive() === true);
const p1 = brk.ballPos();
check("after CORRECT -> ball position preserved (not reset to center)",
  p1 && Math.abs(p1.x - 150) < 1 && Math.abs(p1.y - 200) < 1);

// 3) wrong answer with lives remaining must resume WITHOUT resetting position
const livesBefore = brk.lives();
brk.setBall(300, 250);
const s2 = brk.hitEdu(false);
check("after WRONG (lives left) -> playing", s2 === "playing");
check("after WRONG -> ball active", brk.isBallActive() === true);
check("WRONG cost a life", brk.lives() === livesBefore - 1);
const p2 = brk.ballPos();
check("after WRONG (life lost) -> ball position preserved (not reset)",
  p2 && Math.abs(p2.x - 300) < 1 && Math.abs(p2.y - 250) < 1);

// 4) drain lives, then wrong on last life -> over
let guard = 0;
while (brk.lives() > 1 && guard++ < 20) brk.hitEdu(false);
const s3 = brk.hitEdu(false);
check("after WRONG with last life -> over (game ends)", s3 === "over");

console.log(pass ? "\nALL BREAKOUT REGRESSION TESTS PASSED" : "\nBREAKOUT TESTS FAILED");
process.exit(pass ? 0 : 1);
