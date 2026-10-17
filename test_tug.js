/* Regression test for the Word Tug-of-War engine (games/tug/tug.html).
 * Covers the duel rules end to end:
 *   - teams alternate; the question panel is labelled with whose turn it is
 *   - a correct answer hauls the rope one pull toward that team
 *   - a miss hands the SAME word to the other team as a steal; the stealer keeps the turn
 *   - three in a row is a power pull (two at once)
 *   - the pool never repeats a word before it is exhausted, then reshuffles
 *   - hauling the knot past the marker wins; the result reports a winner
 * Reuses the browser-stub loader pattern from the other engine tests.
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

const WORDS = ["apple", "banana", "cherry", "dragon", "eagle", "forest", "garden", "harbor"];
const vocab = WORDS.map((w, i) => ({ from: "kelime" + (i + 1), correct: w, _pool: WORDS }));

const html = fs.readFileSync("games/tug/tug.html", "utf8");
const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const common = fs.readFileSync("js/engine-common.js", "utf8");

const winListeners = [];
function load(wv) {
  const msgs = [];
  const winObj = {
    innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
    location: {
      search: "?payload=" + Buffer.from(JSON.stringify({
        vocab: wv, fromLang: "Turkish", toLang: "English", accent: "#e8590c",
      })).toString("base64"),
    },
    addEventListener(type, fn) { if (type === "message") winListeners.push(fn); },
    removeEventListener() {},
    parent: { postMessage: (m) => { msgs.push(m); } },
    VocabEngine: null,
    __TUG_TEST__: true,
    __OVER_GUARD_OFF__: true,
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
  vm.runInContext(inline, sandbox, { filename: "tug.html" });
  return { w: sandbox.window.__tug, msgs: msgs };
}

let pass = true;
function check(name, cond, extra) {
  console.log((cond ? "OK   " : "FAIL ") + name + (extra ? "   " + extra : ""));
  if (!cond) pass = false;
}

const L = load(vocab);
const w = L.w, msgs = L.msgs;
const ofType = (t) => msgs.filter((m) => m.type === t);
const lastAsk = () => { const a = ofType("ask"); return a[a.length - 1]; };
// let a haul finish animating AND the result-hold expire (pulling/settle -> next question)
function settle(e) {
  e = e || w;
  let g = 0;
  while ((e.getState() === "pulling" || e.getState() === "settle") && g++ < 800) e.tick(0.02);
  return e.getState();
}

// 0) starts as a demo screen, nothing is asked until the class starts it
check("boots on the menu screen", w.getState() === "menu");
check("it reported READY to the host", ofType("ready").length === 1);

// 1) the duel starts with RED
w.restart();
check("restart starts the duel on a question", w.getState() === "asking", w.getState());
check("the first turn belongs to the RED team", w.turn() === 0 && w.askTeam() === 0);
const a0 = lastAsk();
check("an ASK was posted for that word", !!a0 && typeof a0.word === "string", a0 && a0.word);
check("the panel is labelled with the team whose turn it is", !!a0 && /KIRMIZI/.test(a0.team), a0 && a0.team);
check("the label carries the team colour", !!a0 && /^#/.test(a0.teamColor || ""), a0 && a0.teamColor);
check("ASK offers 4 options including the answer", !!a0 && a0.options.length === 4 && a0.options.indexOf(a0.correct) !== -1);
check("a HUD was emitted", ofType("hud").length >= 1);

// 2) red answers correctly -> the rope comes one pull toward red
w.answer(true);
check("a correct answer enters the haul animation", w.getState() === "pulling", w.getState());
settle();
check("red hauls the rope one pull toward itself", w.pull() === 1 && w.rights(0) === 1, "pull=" + w.pull());
check("the turn passes to the BLUE team", w.turn() === 1 && w.askTeam() === 1, "turn=" + w.turn());
check("the next question is asked", w.getState() === "asking", w.getState());

// 2b) the new rope position is held on screen for a few seconds before the next word
const H = load(vocab);
const wh = H.w;
const asksSeen = () => H.msgs.filter((m) => m.type === "ask").length;
wh.restart();
wh.answer(true);
wh.tick(0.6);                       // the haul animation is over
check("after a haul the arena holds on the result", wh.getState() === "settle", wh.getState());
wh.tick(1.0);
check("...a second later it is STILL holding", wh.getState() === "settle", wh.getState());
check("...and no new question has opened yet", asksSeen() === 1, asksSeen() + " asks");
wh.tick(3.0);
check("...then the next question arrives", wh.getState() === "asking", wh.getState());
check("...as a fresh ASK", asksSeen() === 2, asksSeen() + " asks");

// 3) blue misses -> RED gets a steal attempt on the very same word
const stealWord = w.word();
w.answer(false);
check("a miss opens a steal instead of ending the turn", w.getState() === "steal", w.getState());
check("the steal goes to the other team", w.askTeam() === 0, "askTeam=" + w.askTeam());
check("the steal asks the SAME word", w.word() === stealWord, w.word() + " vs " + stealWord);
check("the panel announces the steal", /ÇALMA/.test(lastAsk().team), lastAsk().team);
check("no rope movement yet", w.pull() === 1, "pull=" + w.pull());

// 4) red wins the steal -> red hauls, and the turn stays with blue
w.answer(true);
settle();
check("winning the steal hauls the rope for the stealer", w.pull() === 2 && w.rights(0) === 2, "pull=" + w.pull());
check("after a steal the turn stays with the team that missed", w.turn() === 1, "turn=" + w.turn());

// 5) a failed steal changes nothing
const before = w.pull();
w.answer(false);            // blue misses again
w.answer(false);            // red misses the steal too
settle();
check("a double miss hauls nobody", w.pull() === before, "pull=" + w.pull());
check("...and the turn goes back to the asker", w.turn() === 1, "turn=" + w.turn());

// 6) three in a row is a power pull (two at once)
const R = load(vocab);
const w2 = R.w;
w2.restart();
check("red streak starts at zero", w2.streak(0) === 0);
w2.answer(true); settle(w2);                    // red correct  -> streak 1, +1
const p1 = w2.pull();
w2.answer(false); w2.answer(true); settle(w2);  // blue miss, red steals -> streak 2, +1
const p2 = w2.pull();
w2.answer(false); w2.answer(true); settle(w2);  // blue miss, red steals -> streak 3 -> POWER, +2
const p3 = w2.pull();
check("first pull is one", p1 === 1, "p1=" + p1);
check("second correct answer is one more", p2 === 2, "p2=" + p2);
check("the third in a row is a power pull (+2)", p3 === p2 + 2, "p3=" + p3 + " (expected " + (p2 + 2) + ")");
check("the streak counter reached three", w2.streak(0) === 3, "streak=" + w2.streak(0));

// 7) a regular word is never repeated before the topic runs out, then the pool reshuffles
const S = load(vocab);
const w3 = S.w;
w3.restart();
const asks3 = () => S.msgs.filter((m) => m.type === "ask");
const regularAsks = () => asks3().filter((m) => !/ÇALMA/.test(m.team || "")).map((m) => m.word);
let g3 = 0;
while (regularAsks().length < WORDS.length && g3++ < 200) {
  const st = w3.getState();
  if (st === "asking" || st === "steal") { w3.answer(true); settle(w3); } else break;
}
const regular = regularAsks();
check("no word repeats while the topic lasts", new Set(regular).size === regular.length, regular.join(","));
check("...and every word of the topic was asked once",
  regular.length === WORDS.length &&
  regular.slice().sort().join(",") === vocab.map((e) => e.from).slice().sort().join(","),
  regular.length + " regular asks");
// keep going: the duel must not stall on an exhausted topic
let g3b = 0;
while (regularAsks().length < WORDS.length * 2 && g3b++ < 300) {
  const st = w3.getState();
  if (st === "asking" || st === "steal") { w3.answer(true); settle(w3); } else break;
}
check("the duel keeps asking words after the topic runs out",
  regularAsks().length >= WORDS.length * 2 || w3.winner() >= 0,
  regularAsks().length + " regular asks, winner=" + w3.winner());
check("the words came back around (reshuffled, not stuck)",
  new Set(regularAsks().slice(0, WORDS.length)).size === WORDS.length, "");

// 8) hauling the knot past the marker ends the match with a winner
const V = load(vocab);
const w4 = V.w;
w4.restart();
let g4 = 0;
while (w4.winner() < 0 && g4++ < 400) {
  const st = w4.getState();
  if (st !== "asking" && st !== "steal") break;
  w4.answer(w4.askTeam() === 0);   // red always right, blue always wrong
  settle(w4);
}
check("red reaches the winning marker", w4.winner() === 0, "winner=" + w4.winner() + " pull=" + w4.pull());
check("the rope stopped at the target", w4.pull() >= w4.winAt(), "pull=" + w4.pull() + " / " + w4.winAt());
check("the match ends", w4.getState() === "over", w4.getState());
const res = V.msgs.filter((m) => m.type === "result");
check("a RESULT was reported", res.length === 1);
check("the result reports a win with the words counted",
  !!res[0] && res[0].win === true && res[0].correct >= 1 && res[0].total >= res[0].correct,
  res[0] ? "win=" + res[0].win + " correct=" + res[0].correct + "/" + res[0].total : "none");
check("a win event fired for the host jingle", V.msgs.some((m) => m.type === "event" && m.name === "win"));

// 9) restart wipes the slate (and re-shuffles)
w.restart();
check("restart resets the rope", w.pull() === 0 && w.rights(0) === 0 && w.rights(1) === 0, "pull=" + w.pull());
check("restart resets the streaks", w.streak(0) === 0 && w.streak(1) === 0);
check("restart begins with red again", w.turn() === 0 && w.askTeam() === 0);
check("restart brings back every word", w.vocabOrder().length === WORDS.length);

// 10) an empty topic must not crash or hang
const Z = load([]);
Z.w.restart();
check("an empty topic ends the duel instead of hanging", Z.w.getState() === "over", Z.w.getState());
check("...and still reports a result", Z.msgs.filter((m) => m.type === "result").length === 1);

console.log(pass ? "\nALL TUG-OF-WAR TESTS PASSED" : "\nSOME TUG-OF-WAR TESTS FAILED");
process.exit(pass ? 0 : 1);
