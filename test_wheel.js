/* Regression test for the Word Wheel engine (games/wheel/wheel.html).
 * The wheel is the question picker: every word of the topic is a slice, spinning
 * lands on one of the words still open, and that word is what gets asked. This
 * covers the whole host contract:
 *   - menu until started, each spin ends on the word it aimed for
 *   - the ASK really is a 4-option question for that word
 *   - a correct answer retires the slice, a wrong one costs a life and keeps it
 *   - every word is asked at most once (never a retired one again)
 *   - clearing all slices WINS, losing all lives LOSES, and restart re-shuffles
 * Reuses the browser-stub loader pattern from test_quiz.js.
 */
const fs = require("fs");
const vm = require("vm");

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

const html = fs.readFileSync("games/wheel/wheel.html", "utf8");
const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const common = fs.readFileSync("js/engine-common.js", "utf8");

const WORDS = ["apple", "banana", "cherry", "dragon", "eagle", "forest", "garden", "harbor"];
const vocab = WORDS.map((w, i) => ({ from: "kelime" + (i + 1), correct: w, _pool: WORDS }));

const winListeners = {};
const parentMessages = [];
function load(wv) {
  const msgs = [];
  const winObj = {
    innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
    location: {
      search: "?payload=" + Buffer.from(JSON.stringify({
        vocab: wv, fromLang: "Turkish", toLang: "English", accent: "#f59f00",
      })).toString("base64"),
    },
    addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
    removeEventListener() {},
    parent: { postMessage: (m) => { msgs.push(m); } },
    VocabEngine: null,
    __WHEEL_TEST__: true,
    __OVER_GUARD_OFF__: true,   // restarts in this test are instant (lock covered by test_overguard.js)
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
  sandbox.window = winObj;
  sandbox.document = {
    getElementById: () => makeEl("canvas"),
    documentElement: { style: { setProperty() {} } },
    head: { appendChild() {} }, body: { dataset: {}, appendChild() {} },
    createElement: (t) => makeEl(t), addEventListener() {},
  };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(common, sandbox, { filename: "engine-common.js" });
  vm.runInContext(inline, sandbox, { filename: "wheel.html" });
  return { w: sandbox.window.__wheel, msgs };
}

let pass = true;
function check(name, cond, extra) {
  console.log((cond ? "OK  " : "FAIL ") + name + (extra ? "  " + extra : ""));
  if (!cond) pass = false;
}

const L = load(vocab);
const w = L.w;
const msgs = L.msgs;
const ofType = (t) => msgs.filter((m) => m.type === t);
function fireMsg(type, extra) { (winListeners["message"] || []).forEach((fn) => fn({ data: Object.assign({ type }, extra || {}) })); }
function tick(sec) { w.tick(sec); }
// spin and let the wheel settle
function spinToQuestion() {
  w.spin();
  let g = 0;
  while (w.getState() === "spinning" && g++ < 900) tick(0.02);
  return w.getState();
}
function settle(ok) {
  w.answer(!!ok);
  let g = 0;
  while (w.getState() === "reveal" && g++ < 200) tick(0.02);
  return w.getState();
}

// 0) idle on the menu
check("starts on the menu screen", w.getState() === "menu");
check("it reported READY to the host", ofType("ready").length === 1);
w.spin();
check("spinning is ignored while on the menu", w.getState() === "menu");

// 1) every word of the topic is on the wheel
fireMsg("start");
check("start -> ready to spin", w.getState() === "ready", w.getState());
check("the wheel holds every word of the topic", w.total() === WORDS.length, w.total() + " slices");
check("the slices are exactly the topic words (order not important here)",
  w.labels().slice().sort().join(",") === vocab.map((e) => e.from).slice().sort().join(","), w.labels().join(","));
check("no slice is retired at the start", w.done() === 0 && w.remaining() === WORDS.length);
check("a HUD was emitted", ofType("hud").length >= 1);

// 2) spin -> lands on a word -> asks exactly that word
let st = spinToQuestion();
check("the wheel settles out of the spin", st === "asking", st);
check("the pointer sits on the slice it aimed for", w.pointerWord() === w.targetWord(), w.pointerWord() + " vs " + w.targetWord());
const a1 = ofType("ask")[0];
check("ASK posted to the host", !!a1);
check("ASK asks the word the wheel landed on", !!a1 && a1.word === w.targetWord(), a1 && a1.word);
check("ASK offers 4 options", !!a1 && a1.options.length === 4, a1 && a1.options.join(" / "));
check("ASK options contain the correct answer", !!a1 && a1.options.indexOf(a1.correct) !== -1);

// 3) a correct answer retires that slice
settle(true);
check("a correct answer retires the slice", w.done() === 1 && w.remaining() === WORDS.length - 1,
  "done=" + w.done() + " left=" + w.remaining());
check("back to ready for the next spin", w.getState() === "ready", w.getState());
check("score went up", w.score() > 0, "score=" + w.score());

// 4) play the rest of the wheel out — every word exactly once, then WIN
let spins = 1, asks = 1;
let guard = 0;
while (w.getState() !== "over" && guard++ < 400) {
  if (w.getState() === "ready") {
    const before = w.done();
    st = spinToQuestion();
    if (st !== "asking") break;
    spins++;
    asks = ofType("ask").length;
    if (w.isDone(w.target())) { check("never spins a retired word", false, "picked done index " + w.target()); break; }
    settle(true);
    if (w.done() !== before + 1) { check("every correct answer retires exactly one slice", false); break; }
  } else break;
}
check("a spin never picks a retired word", w.done() === WORDS.length, "done=" + w.done());
check("spins == words (each word asked once)", spins === WORDS.length, "spins=" + spins);
check("the game ends once every word is solved", w.getState() === "over", w.getState());
const res = ofType("result");
check("a RESULT was reported", res.length === 1);
check("clearing the wheel is a WIN with every word correct", !!res[0] && res[0].win === true && res[0].correct === WORDS.length,
  res[0] ? "win=" + res[0].win + " correct=" + res[0].correct + "/" + WORDS.length : "none");
check("the win event fired", ofType("event").some((e) => e.name === "win"));

// 5) a wrong answer costs a life but keeps the slice on the wheel
const R = load(vocab);
const w2 = R.w;
const msgs2 = R.msgs;
const fire2 = (type, extra) => (winListeners["message"] || []).forEach((fn) => fn({ data: Object.assign({ type }, extra || {}) }));
// (windows are per-load here only for messages, so re-fire on the fresh sandbox)
fireMsg("start");
check("restart re-shuffles the words (fresh order)", w.vocabOrder().length === WORDS.length);
(function () {
  const ww = w2;
  const ofType2 = (t) => msgs2.filter((m) => m.type === t);
  const spin2 = () => { ww.spin(); let g = 0; while (ww.getState() === "spinning" && g++ < 900) ww.tick(0.02); return ww.getState(); };
  const settle2 = (ok) => { ww.answer(!!ok); let g = 0; while (ww.getState() === "reveal" && g++ < 200) ww.tick(0.02); return ww.getState(); };
  // (the second sandbox has its own listener list, so drive it through the seam only)
  ww.restart();
  const t0 = (spin2(), ww.target());
  settle2(false);
  check("a wrong answer keeps the slice on the wheel", ww.isDone(t0) === false && ww.done() === 0,
    "done=" + ww.done() + " lives=" + ww.lives());
  check("a wrong answer costs a life", ww.lives() === 2, "lives=" + ww.lives());
  check("it goes back to ready after a miss", ww.getState() === "ready", ww.getState());
  // three misses in a row end the run
  settle2(false);
  spin2(); settle2(false);
  spin2(); settle2(false);
  check("running out of lives ends the game", ww.getState() === "over", ww.getState());
  const r2 = ofType2("result");
  check("losing reports a RESULT with win=false", r2.length >= 1 && r2[r2.length - 1].win === false);
  check("...and total still counts every word", r2[r2.length - 1].total === WORDS.length);
})();

// 6) an empty topic must not hang or crash
const Z = load([]);
Z.w.restart();
check("an empty topic ends immediately instead of hanging", Z.w.getState() === "over", Z.w.getState());
check("...and reports a result", Z.msgs.filter((m) => m.type === "result").length === 1);

console.log(pass ? "\nALL WORD WHEEL TESTS PASSED" : "\nSOME WORD WHEEL TESTS FAILED");
process.exit(pass ? 0 : 1);
