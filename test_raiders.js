/* Regression test for Word Raiders — same freeze-after-answer contract as the other engines,
 * plus the side-scroller specifics:
 *   - the guns fire on their own (no input needed)
 *   - vertical movement works from BOTH a finger/mouse pointer and the keyboard
 *   - a correct answer resumes the game and consumes the word
 *   - a wrong answer resumes, costs a life, and makes that raider briefly immune so the
 *     automatic fire cannot instantly re-open the same question
 *   - difficulty ramps smoothly, waves grow, and a restart re-shuffles the words
 * Reuses the browser-stub loader pattern from test_defender.js.
 */
const fs = require("fs");
const vm = require("vm");

function makeCtxProxy() {
  return new Proxy({}, {
    get(_t, prop) {
      if (prop === "measureText") return () => ({ width: 10 });
      if (prop === "createLinearGradient" || prop === "createRadialGradient")
        return () => ({ addColorStop() {} });
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

const html = fs.readFileSync("games/raiders/raiders.html", "utf8");
const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const common = fs.readFileSync("js/engine-common.js", "utf8");

const winListeners = {};
const WORDS = [];
for (let i = 0; i < 12; i++) WORDS.push({ from: "kelime" + (i + 1), correct: "word" + String.fromCharCode(97 + i) });

const sandbox = {
  console, Math, JSON, Date, Object, Array, String, Number, Boolean, parseInt, parseFloat, isNaN,
  Set, Map,
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
  location: { search: "?payload=" + Buffer.from(JSON.stringify({
    vocab: WORDS, fromLang: "Turkish", toLang: "English", accent: "#f76707",
  })).toString("base64") },
  addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
  removeEventListener() {},
  parent: { postMessage() {} },
  VocabEngine: null,
  __RAI_TEST__: true,
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
vm.runInContext(inline, sandbox, { filename: "raiders.html" });

const rai = sandbox.window.__rai;
const fireMsg = (type, extra) => (winListeners["message"] || []).forEach((fn) => fn({ data: Object.assign({ type }, extra || {}) }));
const fireRaw = (type, ev) => (winListeners[type] || []).forEach((fn) => fn(ev || {}));
const tick = (n, dt) => { for (let i = 0; i < n; i++) rai.tick(dt == null ? 0.016 : dt); };

let pass = true;
function check(name, cond, extra) { console.log((cond ? "OK  " : "FAIL ") + name + (extra ? "  " + extra : "")); if (!cond) pass = false; }

// ---- boot / auto-fire ----
fireMsg("start");
check("game started -> playing", rai.getState() === "playing");
const y0 = rai.ship().y;
tick(15);
check("the guns fire by themselves (no input needed)", rai.bullets() > 0, "bullets=" + rai.bullets());

// ---- vertical movement: finger / mouse ----
// clear the board first so a stray auto-fire quiz cannot freeze the ship mid-test
rai.clearEnemies();
fireRaw("pointermove", { clientX: 400, clientY: 500 });
check("pointer row became the movement target", Math.abs(rai.targetY() - 500) < 0.001, "targetY=" + rai.targetY());
tick(40);
check("ship eases down to the finger's row", Math.abs(rai.ship().y - 500) < 6, "y=" + Math.round(rai.ship().y));
rai.clearEnemies();
fireRaw("pointermove", { clientX: 400, clientY: 90 });
tick(40);
check("ship eases up to the finger's row", Math.abs(rai.ship().y - 90) < 6, "y=" + Math.round(rai.ship().y));
// a partial event (no clientY) must not poison the target with NaN — the harness sends these
fireRaw("pointermove", { clientX: 300 });
tick(5);
check("a clientY-less pointer event is ignored (no NaN)", isFinite(rai.ship().y) && isFinite(rai.targetY()));

// ---- vertical movement: keyboard ----
rai.clearEnemies();
const yk = rai.ship().y;
fireRaw("keydown", { key: "ArrowDown", preventDefault() {} });
tick(20);
fireRaw("keyup", { key: "ArrowDown" });
check("ArrowDown moves the ship down", rai.ship().y > yk + 20, yk + " -> " + rai.ship().y);
rai.clearEnemies();
const yk2 = rai.ship().y;
fireRaw("keydown", { key: "ArrowUp", preventDefault() {} });
tick(20);
fireRaw("keyup", { key: "ArrowUp" });
check("ArrowUp moves the ship up", rai.ship().y < yk2 - 20, yk2 + " -> " + rai.ship().y);

// ---- raiders stream in and are killable ----
function ensureEnemy() {
  let g = 0;
  while (g++ < 500) {
    if (rai.getState() === "over") rai.restart();
    // free play can raise a quiz of its own — answer it so the game keeps running
    if (rai.getState() === "paused") { fireMsg("answer", { correct: true }); continue; }
    if (rai.enemies() > 0) return;
    tick(1);
  }
}
// sweep the fighter up and down the way a player would, so bullets meet raiders
function sweepUntilScored(maxFrames, dt) {
  for (let i = 0; i < maxFrames; i++) {
    rai.setShipY(60 + (Math.sin(i / 22) + 1) * 240);
    rai.tick(dt);
    if (rai.getState() === "paused") { fireMsg("answer", { correct: true }); continue; }
    if (rai.score() > 0) return true;
    if (rai.getState() === "over") rai.restart();
  }
  return false;
}
ensureEnemy();
check("raiders stream in from the right", rai.enemies() > 0, "on screen: " + rai.enemies());
check("plain raiders get shot down (score rises)", sweepUntilScored(1500, 0.016), "score=" + rai.score());

// ---- tuning: many raiders at once, and they come in fast ----
rai.restart();
let gPeak = 0, peak = 0;
while (gPeak++ < 500 && peak < 8) {
  tick(1);
  if (rai.getState() === "paused") { fireMsg("answer", { correct: true }); continue; }
  if (rai.getState() === "over") { rai.restart(); continue; }
  peak = Math.max(peak, rai.enemies());
}
check("many raiders share the screen at once", peak >= 5, "peak simultaneous = " + peak);

rai.restart();
let gs = 0;
while (rai.enemies() === 0 && gs++ < 400) {
  tick(1);
  if (rai.getState() === "paused") fireMsg("answer", { correct: true });
}
const xs0 = rai.maxX();
tick(30);
const xs1 = rai.maxX();
const ips = (xs0 - xs1) / (30 * 0.016);
check("raiders are fast (>100 px/s at difficulty 0)", ips > 100, Math.round(ips) + " px/s");

// ---- ❓ raiders are now rare: about one in eight ----
rai.restart();
let gp = 0;
while (rai.wavePlan().size === 0 && gp++ < 400) {
  tick(1);
  if (rai.getState() === "paused") fireMsg("answer", { correct: true });
}
const wp = rai.wavePlan();
check("❓ raiders are half as common (≈1 per 8 raiders)", wp.edu >= 1 && wp.edu <= Math.ceil(wp.size / 8),
  wp.edu + " ❓ in a wave of " + wp.size);

// ---- quiz: correct answer resumes + consumes the word ----
ensureEnemy();
const wl0 = rai.wordsLeft();
const st1 = rai.forceEdu(true);
check("after CORRECT -> playing (not frozen)", st1 === "playing");
check("a correct answer consumes a word", rai.wordsLeft() === wl0 - 1, wl0 + " -> " + rai.wordsLeft());

// ---- quiz: wrong answer resumes, costs a life, and blocks an instant re-ask ----
ensureEnemy();
const lB = rai.lives(), wB = rai.wordsLeft();
const st2 = rai.forceEdu(false);
check("after WRONG -> playing (not frozen)", st2 === "playing");
check("WRONG cost a life", rai.lives() === lB - 1);
check("WRONG does not consume the word", rai.wordsLeft() === wB);
check("the wrongly-answered raider goes briefly immune", rai.immuneCount() === 1, "immune=" + rai.immuneCount());
// isolate it: with every other raider gone, the only possible source of a question is
// the immune one, so "still playing" proves the automatic fire cannot re-ask the word
rai.onlyImmune();
rai.freezeSpawns();          // no new raider may join, so nothing but the immune one can be hit
const lImm = rai.lives();
let badFrame = -1;
for (let i = 0; i < 60; i++) { tick(1); if (rai.getState() !== "playing") { badFrame = i; break; } }
check("auto-fire cannot re-open the question while it is immune", badFrame < 0,
  badFrame < 0 ? "" : ("state=" + rai.getState() + " at frame " + badFrame + " lives=" + rai.lives() + " score=" + rai.score()));
check("(sanity) the immune window did not cost a life either", rai.lives() === lImm);

// ---- fast bullets must not tunnel (sub-stepped) ----
rai.restart();
check("restart -> playing", rai.getState() === "playing");
check("at the largest frame step (50ms) shots still connect", sweepUntilScored(600, 0.05), "score=" + rai.score());

// ---- difficulty ramp (smooth, score-driven) ----
rai.restart();
check("difficulty starts at 0", rai.diff() === 0);
let mono = true, maxStep = 0, prev = rai.diff();
for (let s = 0; s <= 3200; s += 50) {
  rai.setScore(s);
  const d = rai.diff();
  if (d < prev - 1e-9) mono = false;
  if (d - prev > maxStep) maxStep = d - prev;
  prev = d;
}
check("difficulty rises monotonically with score", mono);
check("difficulty rises smoothly (max step < 0.05 per 50 score)", maxStep < 0.05);
check("difficulty is capped at 1", rai.diff() === 1);
rai.setScore(0);

// ---- waves grow ----
rai.restart();
const w0 = rai.waveNo();
let g3 = 0;
while (rai.getState() === "playing" && rai.waveNo() === w0 && g3++ < 60) { ensureEnemy(); rai.forceEdu(true); tick(20); }
check("clearing a wave starts the next one", rai.waveNo() > w0, "wave " + w0 + " -> " + rai.waveNo());

// ---- game over on the last life ----
rai.restart();
let g4 = 0;
while (rai.lives() > 1 && g4++ < 20) { ensureEnemy(); rai.forceEdu(false); }
ensureEnemy();
const st3 = rai.forceEdu(false);
check("WRONG on the last life ends the game", st3 === "over");

// ---- restart re-shuffles the words ----
rai.restart();
const o1 = rai.vocabOrder().join(",");
rai.restart();
const o2 = rai.vocabOrder().join(",");
check("restarting re-shuffles the question order", o1 !== o2);

console.log(pass ? "\nALL RAIDERS REGRESSION TESTS PASSED" : "\nRAIDERS TESTS FAILED");
process.exit(pass ? 0 : 1);
