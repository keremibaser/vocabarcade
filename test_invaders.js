/* Regression test for Invaders — same freeze-after-answer bug as Breakout had:
 *  - correct answer must resume the game (state -> playing)
 *  - wrong answer with lives remaining must resume
 *  - wrong answer on the last life must end the game (state -> over)
 * Reuses the browser-stub loader pattern from verify_game.js / test_breakout.js.
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

const html = fs.readFileSync("games/invaders/invaders.html", "utf8");
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
  __INV_TEST__: true,
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
vm.runInContext(inline, sandbox, { filename: "invaders.html" });

const inv = sandbox.window.__inv;
function fireMsg(type) { (winListeners["message"] || []).forEach((fn) => fn({ data: { type } })); }

let pass = true;
function check(name, cond) { console.log((cond ? "OK  " : "FAIL ") + name); if (!cond) pass = false; }

// 1) start the game
fireMsg("start");
check("game started -> playing", inv.getState() === "playing");

// 2) correct answer must resume
const s1 = inv.hitEdu(true);
check("after CORRECT -> playing (not frozen)", s1 === "playing");

// 3) wrong answer with lives remaining must resume
const livesBefore = inv.lives();
const s2 = inv.hitEdu(false);
check("after WRONG (lives left) -> playing", s2 === "playing");
check("WRONG cost a life", inv.lives() === livesBefore - 1);

// 4) drain lives, then wrong on last life -> over
let guard = 0;
while (inv.lives() > 1 && guard++ < 20) inv.hitEdu(false);
const s3 = inv.hitEdu(false);
check("after WRONG with last life -> over (game ends)", s3 === "over");

// 6) player bullet is 2x faster + enemy march speed ramps smoothly (no sudden jumps)
fireMsg("start");
check("player bullet vy doubled to -1120", inv.shootOnce() === -1120);
inv.setScore(0);
check("march speed base ~0.6", Math.abs(inv.marchSpeed() - 0.6) < 0.001);
inv.setScore(1800);
check("march speed caps at 1.25", Math.abs(inv.marchSpeed() - 1.25) < 0.001);
inv.setScore(999999);
check("march speed never exceeds the cap", inv.marchSpeed() <= 1.2501);
let prev = null, maxStep = 0;
for (let s = 0; s <= 1800; s += 50) { inv.setScore(s); const v = inv.marchSpeed(); if (prev !== null) maxStep = Math.max(maxStep, v - prev); prev = v; }
check("ramp is smooth (max step per 50 score < 0.05)", maxStep > 0 && maxStep < 0.05);

console.log(pass ? "\nALL INVADERS REGRESSION TESTS PASSED" : "\nINVADERS TESTS FAILED");
process.exit(pass ? 0 : 1);
