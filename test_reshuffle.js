/* Verifies the "re-shuffle the words on every restart / game over" behaviour for ALL engines,
 * without a browser: each engine is loaded in a VM sandbox and every E.shuffle() call is
 * recorded. startGame() must pass the SAME launch.vocab object again, and the resulting
 * order must differ from the previous run — that is exactly the re-shuffle.
 */
const fs = require("fs");
const vm = require("vm");

const ENGINES = ["breakout", "invaders", "snake", "tetris", "asteroids", "flappy", "pacman", "defender"];
const N = 20;
const WORDS = [];
for (let i = 0; i < N; i++) WORDS.push({ from: "kelime" + (i + 1), correct: "w" + String.fromCharCode(97 + i) });

function makeCtxProxy() {
  return new Proxy({}, {
    get(_t, prop) {
      if (prop === "measureText") return () => ({ width: 10 });
      if (prop === "createRadialGradient" || prop === "createLinearGradient")
        return () => ({ addColorStop() {} });
      if (prop === "canvas") return () => ({ width: 800, height: 600 });
      return () => {};
    },
    set() { return true; },
  });
}
function makeEl(tag) {
  return {
    tagName: (tag || "div").toUpperCase(),
    style: new Proxy({}, { get: () => "", set: () => true }),
    classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
    dataset: {}, children: [], width: 800, height: 600, value: "",
    textContent: "", innerHTML: "", checked: false,
    appendChild() {}, removeChild() {}, insertBefore() {}, focus() {},
    querySelector() { return makeEl(); }, querySelectorAll() { return []; },
    addEventListener() {}, removeEventListener() {}, setAttribute() {}, removeAttribute() {},
    getBoundingClientRect() { return { left: 0, top: 0, width: 800, height: 600 }; },
    getContext() { return makeCtxProxy(); },
  };
}

function loadEngine(eng) {
  const html = fs.readFileSync("games/" + eng + "/" + eng + ".html", "utf8");
  const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1];
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
    localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem() {} },
  };
  const windowObj = {
    innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
    location: { search: "?payload=" + Buffer.from(JSON.stringify({
      vocab: WORDS, fromLang: "Turkish", toLang: "English",
    })).toString("base64") },
    addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
    removeEventListener() {},
    parent: { postMessage() {} },
    VocabEngine: null,
  };
  sandbox.window = windowObj;
  sandbox.document = {
    getElementById: () => makeEl("canvas"),
    documentElement: { style: { setProperty() {} } },
    head: { appendChild() {} },
    body: { dataset: {}, appendChild() {}, style: {} },
    createElement: (t) => makeEl(t),
    addEventListener() {},
  };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(common, sandbox, { filename: "engine-common.js" });

  // probe every E.shuffle() call
  const E = sandbox.window.VocabEngine;
  const orig = E.shuffle, calls = [];
  E.shuffle = function (a) {
    const r = orig(a);
    calls.push({ arg: a, order: r.map((x) => (x && x.correct !== undefined ? x.from : x)).join(",") });
    return r;
  };
  vm.runInContext(inline, sandbox, { filename: eng + ".html" });
  return { calls, fire: (type) => (winListeners["message"] || []).forEach((fn) => fn({ data: { type } })) };
}

let pass = true;
for (const eng of ENGINES) {
  let r;
  try { r = loadEngine(eng); } catch (e) { console.log("FAIL " + eng + " could not load: " + e.message); pass = false; continue; }
  r.fire("start");            // run 1
  r.fire("start");            // run 2 (same as replaying after game over)

  // keep only the shuffles whose argument IS the launch.vocab object (load + each startGame)
  const vocabArg = r.calls.find((c) => c.order.split(",").length === N) && r.calls.find((c) => c.arg === r.calls[0].arg).arg;
  const withLaunchVocab = r.calls.filter((c) => c.arg === vocabArg);
  const orders = withLaunchVocab.map((c) => c.order);
  const distinct = new Set(orders).size;
  const okCount = withLaunchVocab.length >= 3;             // load + start + start
  const okDiff = orders.length >= 2 && orders[orders.length - 1] !== orders[orders.length - 2];
  if (!okCount || !okDiff) pass = false;
  console.log(
    (okCount && okDiff ? "OK  " : "FAIL") + " " + eng.padEnd(10) +
    " shuffle-of-launch-vocab calls=" + withLaunchVocab.length +
    " distinct orders=" + distinct +
    "  (load + one per restart)"
  );
}
console.log(pass ? "\nALL ENGINES RE-SHUFFLE ON RESTART" : "\nRE-SHUFFLE TEST FAILED");
process.exit(pass ? 0 : 1);
