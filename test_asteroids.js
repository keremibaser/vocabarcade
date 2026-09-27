/* Regression test for Asteroids — same freeze-after-answer bug as the other engines:
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

const html = fs.readFileSync("games/asteroids/asteroids.html", "utf8");
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
  __AST_TEST__: true,
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
vm.runInContext(inline, sandbox, { filename: "asteroids.html" });

const ast = sandbox.window.__ast;
function fireMsg(type) { (winListeners["message"] || []).forEach((fn) => fn({ data: { type } })); }

let pass = true;
function check(name, cond) { console.log((cond ? "OK  " : "FAIL ") + name); if (!cond) pass = false; }

// 1) start the game
fireMsg("start");
check("game started -> playing", ast.getState() === "playing");

// 2) correct answer must resume
const s1 = ast.hitEdu(true);
check("after CORRECT -> playing (not frozen)", s1 === "playing");

// 3) wrong answer with lives remaining must resume
const livesBefore = ast.lives();
const s2 = ast.hitEdu(false);
check("after WRONG (lives left) -> playing", s2 === "playing");
check("WRONG cost a life", ast.lives() === livesBefore - 1);

// 4) drain lives, then wrong on last life -> over
let guard = 0;
while (ast.lives() > 1 && guard++ < 20) ast.hitEdu(false);
const s3 = ast.hitEdu(false);
check("after WRONG with last life -> over (game ends)", s3 === "over");

// 5) finger/mouse aiming: setAim stores + clamps, and the ship turns & eases toward the target
fireMsg("start");
const S0 = ast.ship();
ast.setAim(S0.x + 300, S0.y);
check("aim target stored", !!ast.aim() && ast.aim().x === S0.x + 300 && ast.aim().y === S0.y);
ast.setAim(-50, 900);
check("aim clamps into the canvas", ast.aim().x === 0 && ast.aim().y === 600);
ast.setAim(S0.x + 300, S0.y);
for (let i = 0; i < 25; i++) ast.tick(0.016);      // ~0.4s (no bullets yet -> deterministic)
const S1 = ast.ship();
check("ship turns toward the finger target", Math.abs(S1.angle) < 0.4);
check("ship advances toward the target", S1.vx > 5);
check("speed stays under the cap", Math.hypot(S1.vx, S1.vy) <= 300.5);

// 6) the target clears once the ship is on top of it (so it stops steering)
const S2 = ast.ship();
ast.setAim(S2.x + 6, S2.y + 4);
check("close target stored", !!ast.aim());
ast.tick(0.016);
check("aim clears on arrival", ast.aim() === null);

console.log(pass ? "\nALL ASTEROIDS REGRESSION TESTS PASSED" : "\nASTEROIDS TESTS FAILED");
process.exit(pass ? 0 : 1);
