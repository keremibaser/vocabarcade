/* Regression test for the Word Quiz (TEST) engine.
 * It is not a game — it just asks every word of the topic once, in a random
 * order, and keeps score. This test covers the whole host contract:
 *   - menu until started, then one question per word
 *   - the ASK payload really carries a 4-option question with the right answer
 *   - correct/wrong tallies, the short reveal beat, then the next question
 *   - every word asked exactly once, never twice
 *   - RESULT win/lose against the pass mark, and a fresh random order on restart
 * Reuses the browser-stub loader pattern from test_invaders.js.
 */
const fs = require("fs");
const vm = require("vm");

function makeCtxProxy() {
  return new Proxy({}, {
    get(_t, prop) {
      if (prop === "measureText") return () => ({ width: 10 });
      if (prop === "createLinearGradient" || prop === "createRadialGradient") return () => ({ addColorStop() {} });
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

const html = fs.readFileSync("games/quiz/quiz.html", "utf8");
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const inline = m[1];
const common = fs.readFileSync("js/engine-common.js", "utf8");

const WORDS = ["apple", "banana", "cherry", "dragon", "eagle", "forest", "garden", "harbor"];
const vocab = WORDS.map(function (w, i) { return { from: "kelime" + (i + 1), correct: w, _pool: WORDS }; });

const winListeners = {};
const parentMessages = [];
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
const windowObj = {
  innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
  location: {
    search: "?payload=" + Buffer.from(JSON.stringify({
      vocab: vocab, fromLang: "Turkish", toLang: "English", accent: "#364fc7",
    })).toString("base64"),
  },
  addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
  removeEventListener() {},
  parent: { postMessage: (msg) => { parentMessages.push(msg); } },
  VocabEngine: null,
  __QUIZ_TEST__: true,
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
vm.runInContext(inline, sandbox, { filename: "quiz.html" });

const q = sandbox.window.__quiz;
function fireMsg(type, extra) { (winListeners["message"] || []).forEach((fn) => fn({ data: Object.assign({ type }, extra || {}) })); }
function ofType(t) { return parentMessages.filter((m) => m.type === t); }

let pass = true;
function check(name, cond, extra) {
  console.log((cond ? "OK  " : "FAIL ") + name + (extra ? "  " + extra : ""));
  if (!cond) pass = false;
}

// 0) idle on the menu until the host (or a tap) starts it
check("starts on the menu screen", q.getState() === "menu");
check("it reported READY to the host", ofType("ready").length === 1);

// 1) start -> first question
fireMsg("start");
check("start -> asking", q.getState() === "asking");
check("total equals the topic size", q.total() === WORDS.length, q.total() + " words");
check("the first question is open", q.asked() === 1);
check("a HUD was emitted with the first question", ofType("hud").length >= 1);

// 2) the ASK payload is a real question
const a1 = ofType("ask")[0];
check("ASK posted to the host", !!a1);
check("ASK carries the word being asked", !!a1 && a1.word === q.current().word, a1 && a1.word);
check("ASK offers 4 options", !!a1 && a1.options.length === 4, a1 && a1.options.join(" / "));
check("ASK options include the correct answer", !!a1 && a1.options.indexOf(a1.correct) !== -1);
check("ASK answer comes from the topic pool", !!a1 && WORDS.indexOf(a1.correct) !== -1);

// 3) a correct answer scores and, after a short beat, opens the next question
check("correct answer -> reveal", q.answer(true) === "reveal");
check("correct tally rose", q.correct() === 1);
q.tick(0.5);
check("next question opens after the reveal", q.getState() === "asking" && q.asked() === 2, "asked=" + q.asked());

// 4) a wrong answer scores too
check("wrong answer -> reveal", q.answer(false) === "reveal");
check("wrong tally rose", q.wrong() === 1);
q.tick(0.5);

// 5) play the rest out — the main promise: every word once, in random order
let guard = 0;
while (q.getState() !== "over" && guard++ < 60) {
  if (q.getState() === "asking") q.answer(true);
  q.tick(0.5);
}
check("the test ends when the words run out", q.getState() === "over");
check("exactly one question per word", q.asked() === WORDS.length, "asked=" + q.asked());
const askedWords = ofType("ask").map((a) => a.word);
check("no word is asked twice", new Set(askedWords).size === askedWords.length, askedWords.length + " asks");
check("every word of the topic came up", new Set(askedWords).size === WORDS.length);
check("combo counts the current streak", q.bestCombo() >= 1, "best=" + q.bestCombo());

// 6) RESULT is reported against the pass mark
const r1 = ofType("result")[0];
check("RESULT posted to the host", !!r1);
check("pass mark is half the words", q.passMark() === Math.ceil(WORDS.length / 2), "pass=" + q.passMark());
check("a mostly-correct run wins", !!r1 && r1.win === true, r1 && ("score=" + r1.score + "/" + r1.total));
check("RESULT total equals the topic size", !!r1 && r1.total === WORDS.length);

// 7) an all-wrong run reports a loss
q.restart();
guard = 0;
while (q.getState() === "asking" && guard++ < 60) { q.answer(false); q.tick(0.5); }
const r2 = ofType("result")[1];
check("all-wrong run -> LOSE", !!r2 && r2.win === false, r2 && ("win=" + r2.win + " score=" + r2.score + "/" + r2.total));
check("all-wrong run scored 0", q.correct() === 0 && q.wrong() === WORDS.length);

// 8) every run re-shuffles the order (the "random order" promise)
const o1 = q.vocabOrder().join(",");
q.restart();
const o2 = q.vocabOrder().join(",");
check("restarting re-shuffles the question order", o1 !== o2);

console.log(pass ? "\nALL WORD QUIZ TESTS PASSED" : "\nWORD QUIZ TESTS FAILED");
process.exit(pass ? 0 : 1);
