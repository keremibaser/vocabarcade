/* Regression test for the Word Wall (big-display) engine.
 * It shows the whole topic at once, Turkish + English, and scrolls when the list
 * is taller than the screen. This test covers:
 *   - layout: two columns for long lists, one giant column for short ones
 *   - "does it need to scroll?" is computed correctly (and is 0 when everything fits)
 *   - scroll clamping (top / bottom), drag, wheel and keyboard all move it
 *   - the animated position eases to the target and settles
 *   - the WORD ORDER stays the topic order (a wall chart must be predictable)
 *   - it never asks a question and never reports a result
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
    getBoundingClientRect() { return { left: 0, top: 0, width: 1024, height: 768 }; },
    getContext() { return makeCtxProxy(); },
    focus() {}, setAttribute() {}, removeAttribute() {}, setProperty() {},
  };
}

const html = fs.readFileSync("games/wordwall/wordwall.html", "utf8");
const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const common = fs.readFileSync("js/engine-common.js", "utf8");

function load(vocab) {
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
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    confirm: () => true,
  };
  const windowObj = {
    innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
    location: {
      search: "?payload=" + Buffer.from(JSON.stringify({
        vocab: vocab, fromLang: "Turkish", toLang: "English", accent: "#1971c2",
      })).toString("base64"),
    },
    addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
    removeEventListener() {},
    parent: { postMessage: (msg) => { parentMessages.push(msg); } },
    VocabEngine: null,
    __WALL_TEST__: true,
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
  vm.runInContext(inline, sandbox, { filename: "wordwall.html" });
  return {
    wall: sandbox.window.__wall,
    fire: (type, ev) => (winListeners[type] || []).forEach((fn) => fn(ev || {})),
    messages: parentMessages,
  };
}

let pass = true;
function check(name, cond, extra) {
  console.log((cond ? "OK  " : "FAIL ") + name + (extra ? "  " + extra : ""));
  if (!cond) pass = false;
}

// ---------------- long topic: 20 words ----------------
const L = [];
for (let i = 0; i < 20; i++) L.push({ from: "kelime" + (i + 1), correct: "word" + (i + 1), _pool: [] });
const long = load(L);
const w = long.wall;

check("it reported READY to the host", long.messages.filter((m) => m.type === "ready").length === 1);
check("nothing is asked and no result is reported",
  long.messages.filter((m) => m.type === "ask" || m.type === "result").length === 0);
const hud = long.messages.filter((m) => m.type === "hud");
check("a zeroed HUD is sent once (a display has no score)", hud.length === 1 && hud[0].score === 0 && hud[0].correct === 0);

check("all words are on the wall", w.total() === 20);
check("words keep the topic order (no shuffling)", w.words().map((x) => x.tr).join(",") === L.map((x) => x.from).join(","));
check("the wall is a single column (no side-by-side pairs)", w.cols() === 1, "cols=" + w.cols());
check("one row per word — the list runs straight down", w.rows() === 20, "rows=" + w.rows());
check("cards are a compact single-line box", w.cardH() === 48, "cardH=" + w.cardH());
check("each row is  number + English + Turkish on ONE line",
  w.row(0).num === 1 && w.row(0).en === L[0].correct && w.row(0).tr === L[0].from,
  w.row(0).num + " " + w.row(0).en + " " + w.row(0).tr);
check("the number sits immediately before the English word",
  w.row(4).num === 5 && w.row(4).en === L[4].correct, "row5 = " + w.row(4).num + " " + w.row(4).en);

// the Turkish line must stay readable on the dark starfield: a bright colour, not
// the topic accent blue (which is what made it invisible before)
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
check("the Turkish line is bright enough to read on the dark background",
  lum(w.colors().tr) > 0.55, "relative luminance=" + lum(w.colors().tr).toFixed(2));
check("the Turkish line is brighter than the old accent blue", lum(w.colors().tr) > lum("#1971c2"));
check("the Turkish line has its own colour, not the English one",
  w.colors().tr !== w.colors().en, w.colors().tr + " vs " + w.colors().en);
check("it knows it must scroll", w.maxScroll() > 0, "content=" + Math.round(w.contentH()) + " view=" + w.viewH() + " max=" + Math.round(w.maxScroll()));
check("scrolling starts at the top", w.scrollY() === 0);

// clamping
check("scrolling past the end clamps to the bottom", w.scrollTo(99999) === w.maxScroll(), "y=" + Math.round(w.scrollY()));
check("scrolling above the top clamps to 0", w.scrollTo(-500) === 0);

// drag: dragging up reveals further down
w.scrollTo(0);
const afterDrag = w.drag(500, 300);         // finger moves up 200px
check("dragging up scrolls down", afterDrag > 0, "y=" + Math.round(afterDrag));
// dragging down at the top stays at the top
w.scrollTo(0);
check("dragging down at the top stays at 0", w.drag(300, 500) === 0);

// wheel
w.scrollTo(0);
long.fire("wheel", { deltaY: 200, preventDefault() {} });
check("the mouse wheel scrolls", w.scrollY() > 0, "y=" + Math.round(w.scrollY()));

// keyboard
w.scrollTo(0);
long.fire("keydown", { key: "ArrowDown", preventDefault() {} });
check("ArrowDown scrolls", w.scrollY() === 70, "y=" + w.scrollY());
long.fire("keydown", { key: "End", preventDefault() {} });
check("End jumps to the bottom", w.scrollY() === w.maxScroll());
long.fire("keydown", { key: "Home", preventDefault() {} });
check("Home jumps back to the top", w.scrollY() === 0);
long.fire("keydown", { key: "PageDown", preventDefault() {} });
check("PageDown moves about a screenful", Math.abs(w.scrollY() - w.viewH() * 0.85) < 0.001, "y=" + Math.round(w.scrollY()));

// the drawn position eases toward the target, then settles exactly on it
w.scrollTo(400);
check("the drawn position lags behind the target right after a jump", Math.abs(w.viewY() - 400) > 1, "viewY=" + Math.round(w.viewY()));
for (let i = 0; i < 60; i++) w.tick(0.016);
check("it eases onto the target", Math.abs(w.viewY() - 400) < 1, "viewY=" + Math.round(w.viewY()));

// the visible band really moves with the scroll (let the animation settle first)
function settle(w2) { for (let i = 0; i < 60; i++) w2.tick(0.016); }
w.scrollTo(0); settle(w);
const topVisible = w.visible();
check("the first words are visible at the top", topVisible.indexOf(0) !== -1 && topVisible.indexOf(1) !== -1, "visible=" + topVisible.join(","));
check("the last words are not visible at the top", topVisible.indexOf(19) === -1);
w.scrollTo(w.maxScroll()); settle(w);
const bottomVisible = w.visible();
check("the last words come into view at the bottom", bottomVisible.indexOf(19) !== -1, "visible=" + bottomVisible.join(","));
check("the first words have scrolled out at the bottom", bottomVisible.indexOf(0) === -1);

// ---------------- short topic: 3 words ----------------
const S = L.slice(0, 3);
const short = load(S);
const s = short.wall;
check("a short list also stays in one column", s.cols() === 1, "cols=" + s.cols());
check("a short list needs no scrolling", s.maxScroll() === 0, "content=" + Math.round(s.contentH()) + " view=" + s.viewH());
s.scrollTo(500);
check("scroll stays at 0 when everything already fits", s.scrollY() === 0);
short.fire("keydown", { key: "ArrowDown", preventDefault() {} });
check("scrolling keys do nothing when everything fits", s.scrollY() === 0);

// ---------------- empty topic ----------------
const empty = load([]);
check("an empty topic does not crash and reports no scroll", empty.wall.maxScroll() === 0 && empty.wall.total() === 0);

console.log(pass ? "\nALL WORD WALL TESTS PASSED" : "\nWORD WALL TESTS FAILED");
process.exit(pass ? 0 : 1);
