/* Regression test for Pac-Man — same freeze-after-answer bug as the other engines:
 *  - correct answer must resume the game (state -> playing)
 *  - wrong answer with lives remaining must resume
 *  - wrong answer on the last life must end the game (state -> over)
 * Reuses the browser-stub loader pattern from test_snake.js / verify_game.js.
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

const html = fs.readFileSync("games/pacman/pacman.html", "utf8");
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
      { from: "gunes", correct: "sun", distractors: ["moon","star","sky"] },
      { from: "ev", correct: "house", distractors: ["tree","door","car"] },
    ],
    fromLang: "Turkish", toLang: "English",
  })).toString("base64") },
  addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
  removeEventListener() {},
  parent: { postMessage() {} },
  VocabEngine: null,
  __PAC_TEST__: true,
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
vm.runInContext(inline, sandbox, { filename: "pacman.html" });

const pac = sandbox.window.__pac;
function fireMsg(type) { (winListeners["message"] || []).forEach((fn) => fn({ data: { type } })); }

let pass = true;
function check(name, cond) { console.log((cond ? "OK  " : "FAIL ") + name); if (!cond) pass = false; }

fireMsg("start");
check("game started -> playing", pac.getState() === "playing");

const s1 = pac.hitEdu(true);
check("after CORRECT -> playing (not frozen)", s1 === "playing");

const livesBefore = pac.lives();
const s2 = pac.hitEdu(false);
check("after WRONG (lives left) -> playing", s2 === "playing");
check("WRONG cost a life", pac.lives() === livesBefore - 1);

let guard = 0;
while (pac.lives() > 1 && guard++ < 20) pac.hitEdu(false);
const s3 = pac.hitEdu(false);
check("after WRONG with last life -> over (game ends)", s3 === "over");

// ── word-ghost rotation: never the same ghost twice in a row, and all ghosts used ──
fireMsg("start");
check("restarted -> playing", pac.getState() === "playing");
let prev = -1, repeats = 0;
const seen = {};
for (let n = 0; n < 8; n++) {
  const idx = pac.eduIndex();
  if (idx < 0) break;            // no word left
  seen[idx] = true;
  if (idx === prev) repeats++;
  prev = idx;
  const st = pac.forceCorrect();
  if (st !== "playing" && st !== "over") { check("after correct -> resumes/ends cleanly", false); break; }
}
check("word-ghost never same twice in a row", repeats === 0);
check("more than one ghost carries words (not always same)", Object.keys(seen).length > 1);

console.log(pass ? "\nALL PAC-MAN REGRESSION TESTS PASSED" : "\nPAC-MAN TESTS FAILED");
process.exit(pass ? 0 : 1);
