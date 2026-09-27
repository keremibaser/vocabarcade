/* Regression test for Defender — same freeze-after-answer bug as the other engines:
 *  - correct answer must resume the game (state -> playing)
 *  - wrong answer with lives remaining must resume
 *  - wrong answer on the last life must end the game (state -> over)
 * Reuses the browser-stub loader pattern from test_asteroids.js / test_snake.js.
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

const html = fs.readFileSync("games/defender/defender.html", "utf8");
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
      { from: "ev", correct: "house", distractors: ["tent","boat","car"] },
      { from: "arkadas", correct: "friend", distractors: ["enemy","stranger","teacher"] },
      { from: "okul", correct: "school", distractors: ["park","shop","farm"] },
      { from: "deniz", correct: "sea", distractors: ["lake","pond","river"] },
      { from: "gunes", correct: "sun", distractors: ["moon","star","cloud"] },
      { from: "kus", correct: "bird", distractors: ["fish","bee","ant"] },
      { from: "cicek", correct: "flower", distractors: ["tree","grass","leaf"] },
      { from: "yol", correct: "road", distractors: ["bridge","wall","fence"] },
    ],
    fromLang: "Turkish", toLang: "English",
  })).toString("base64") },
  addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
  removeEventListener() {},
  parent: { postMessage() {} },
  VocabEngine: null,
  __DEF_TEST__: true,
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
vm.runInContext(inline, sandbox, { filename: "defender.html" });

const def = sandbox.window.__def;
function fireMsg(type) { (winListeners["message"] || []).forEach((fn) => fn({ data: { type } })); }

let pass = true;
function check(name, cond) { console.log((cond ? "OK  " : "FAIL ") + name); if (!cond) pass = false; }

fireMsg("start");
check("game started -> playing", def.getState() === "playing");

const s1 = def.hitEdu(true);
check("after CORRECT -> playing (not frozen)", s1 === "playing");

const livesBefore = def.lives();
const s2 = def.hitEdu(false);
check("after WRONG (lives left) -> playing", s2 === "playing");
check("WRONG cost a life", def.lives() === livesBefore - 1);

let guard = 0;
while (def.lives() > 1 && guard++ < 20) def.hitEdu(false);
const s3 = def.hitEdu(false);
check("after WRONG with last life -> over (game ends)", s3 === "over");

// ==================== progressive difficulty + word re-shuffle ====================
def.restart();
check("restart puts the game back in play", def.getState() === "playing");

// difficulty ramps SMOOTHLY with score (no jarring per-level jumps)
check("difficulty starts at 0", def.diff() === 0);
let monotonic = true, maxStep = 0, prev = def.diff();
for (let s = 0; s <= 3000; s += 50) {
  def.setScore(s);
  const d = def.diff();
  if (d < prev - 1e-9) monotonic = false;
  if (d - prev > maxStep) maxStep = d - prev;
  prev = d;
}
check("difficulty rises monotonically with score", monotonic);
check("difficulty rises smoothly (max step < 0.05 per 50 score)", maxStep < 0.05);
check("difficulty is capped at 1", def.diff() === 1);
def.setScore(0);
check("difficulty is back to 0 at zero score", def.diff() === 0);

// every cleared wave brings a bigger wave
const w0No = def.waveNo(), w0Size = def.waveSize();
let g2 = 0;
while (def.getState() === "playing" && def.waveNo() === w0No && g2++ < 40) def.hitEdu(true);
check("clearing a wave starts the next one", def.getState() === "playing" && def.waveNo() === w0No + 1);
check("the next wave is larger", def.waveSize() > w0Size, w0Size + " -> " + def.waveSize());

// restarting (i.e. after game over) re-shuffles the question order
def.restart();
const o1 = def.vocabOrder().join(",");
def.restart();
const o2 = def.vocabOrder().join(",");
check("restarting re-shuffles the question order", o1 !== o2);

console.log(pass ? "\nALL DEFENDER REGRESSION TESTS PASSED" : "\nDEFENDER TESTS FAILED");
process.exit(pass ? 0 : 1);
