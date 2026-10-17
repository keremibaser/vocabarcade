/* Regression test for the 2-second game-over lock (E.overGuard).
 *
 * On a smartboard a stray tap can easily land right as a run ends; without a lock
 * that tap skips the result screen before anyone has read it. So every engine arms
 * the lock in gameOver() and startGame() refuses to run while the lock is live.
 *
 * This drives the real Word Quiz engine with the real clock (no
 * __OVER_GUARD_OFF__): taps and keys must be ignored for ~2s, then work again.
 * It also asserts the wiring exists in every other game engine, because a single
 * engine forgetting it would bring the bug straight back.
 */
const fs = require("fs");
const vm = require("vm");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let pass = true;
function check(name, cond, extra) {
  console.log((cond ? "OK   " : "FAIL ") + name + (extra ? "   " + extra : ""));
  if (!cond) pass = false;
}

// ---------------------------------------------------------------- static wiring
const GAMES = ["breakout", "invaders", "snake", "tetris", "asteroids", "flappy",
               "pacman", "defender", "raiders", "quiz", "wheel", "tug"];
GAMES.forEach(function (g) {
  const src = fs.readFileSync("games/" + g + "/" + g + ".html", "utf8");
  const armed = /OverLock\.arm\(\)/.test(src);
  const locked = /OverLock\.live\(\)/.test(src);
  const built = /E\.overGuard\(2000\)/.test(src);
  check(g + " arms the game-over lock and gates startGame", armed && locked && built,
    "arm=" + armed + " live=" + locked + " guard=" + built);
});

// ---------------------------------------------------------------- live behaviour
function makeCtxProxy() {
  return new Proxy({}, {
    get(_t, prop) {
      if (prop === "measureText") return () => ({ width: 10 });
      if (prop === "createLinearGradient" || prop === "createRadialGradient") return () => ({ addColorStop() {} });
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
    dataset: {}, children: [], width: 800, height: 600, textContent: "", innerHTML: "",
    appendChild() {}, removeChild() {},
    querySelector() { return makeEl(); }, querySelectorAll() { return []; },
    addEventListener() {}, removeEventListener() {},
    getBoundingClientRect() { return { left: 0, top: 0, width: 800, height: 600 }; },
    getContext() { return makeCtxProxy(); },
    focus() {}, setAttribute() {}, removeAttribute() {}, setProperty() {},
  };
}

const html = fs.readFileSync("games/quiz/quiz.html", "utf8");
const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const common = fs.readFileSync("js/engine-common.js", "utf8");

const WORDS = ["apple", "banana", "cherry", "dragon", "eagle"];
const vocab = WORDS.map((w, i) => ({ from: "kelime" + (i + 1), correct: w, _pool: WORDS }));

const winListeners = {};
const windowObj = {
  innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
  location: {
    search: "?payload=" + Buffer.from(JSON.stringify({
      vocab: vocab, fromLang: "Turkish", toLang: "English", accent: "#364fc7",
    })).toString("base64"),
  },
  addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
  removeEventListener() {},
  parent: { postMessage() {} },
  VocabEngine: null,
  __QUIZ_TEST__: true,
  // NOTE: deliberately NO __OVER_GUARD_OFF__ here — this file tests the real lock
};
const sandbox = {
  console, Math, JSON, Date, Object, Array, String, Number, Boolean, parseInt, parseFloat, isNaN,
  setTimeout: (fn) => { try { fn(); } catch (e) {} },
  URLSearchParams,
  btoa: (s) => Buffer.from(s, "utf8").toString("base64"),
  atob: (s) => Buffer.from(s, "base64").toString("utf8"),
  TextEncoder: require("util").TextEncoder, TextDecoder: require("util").TextDecoder,
  performance: { now: () => 0 },
  requestAnimationFrame: () => 1, cancelAnimationFrame: () => {},
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem() {} },
  confirm: () => true,
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
vm.runInContext(inline, sandbox, { filename: "quiz.html" });

const q = sandbox.window.__quiz;
const fire = (type, ev) => (winListeners[type] || []).forEach((fn) => fn(ev || {}));

(async () => {
  check("the engine starts on its menu", q.getState() === "menu");

  // drive the whole test: answer every question correctly until the result screen
  fire("message", { data: { type: "start" } });
  let guard = 0;
  while (q.getState() !== "over" && guard++ < 200) {
    if (q.getState() === "asking") q.answer(true);
    q.tick(0.5);
  }
  check("the run reaches its result screen", q.getState() === "over", "state=" + q.getState());

  // --- the lock: nothing may restart the run for two seconds -------------------
  fire("pointerdown", { clientX: 10, clientY: 10 });
  check("a tap right after the result does NOT restart", q.getState() === "over", "state=" + q.getState());
  fire("keydown", { key: " ", preventDefault() {} });
  check("a key press right after the result does NOT restart", q.getState() === "over", "state=" + q.getState());

  await sleep(900);
  fire("pointerdown", { clientX: 10, clientY: 10 });
  check("still locked a second in", q.getState() === "over", "state=" + q.getState());

  await sleep(1300);   // ~2.2s since the result screen appeared
  fire("pointerdown", { clientX: 10, clientY: 10 });
  check("after the two seconds a tap restarts the run", q.getState() === "asking", "state=" + q.getState());

  console.log(pass ? "\nALL OVER-LOCK TESTS PASSED" : "\nSOME OVER-LOCK TESTS FAILED");
  process.exit(pass ? 0 : 1);
})();
