/*
 * Headless verification harness for VocabArcade engines.
 * Stubs the browser APIs the game scripts need, loads engine-common.js +
 * the inline game script, then drives: MENU frames -> START -> ~250 frames
 * (with input) -> answers any quiz that appears. Catches the dead-loop bug.
 */
const fs = require("fs");
const path = require("path");
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
  const el = {
    tagName: tag || "div",
    style: new Proxy({}, { get: () => "", set: () => true }),
    classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
    dataset: {},
    children: [],
    width: 800, height: 600,
    textContent: "", innerHTML: "",
    appendChild() {}, removeChild() {},
    querySelector() { return makeEl(); },
    querySelectorAll() { return []; },
    addEventListener() {}, removeEventListener() {},
    getBoundingClientRect() { return { left: 0, top: 0, width: 800, height: 600 }; },
    getContext() { return makeCtxProxy(); },
    focus() {}, setAttribute() {}, removeAttribute() {},
    setProperty() {},
  };
  return el;
}

function run(htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const dir = path.dirname(htmlPath);
  // inline script = <script> with no attributes
  const m = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) throw new Error("no inline script found in " + htmlPath);
  const inline = m[1];
  const commonPath = path.resolve(dir, "..", "..", "js", "engine-common.js");
  const common = fs.readFileSync(commonPath, "utf8");

  const winListeners = {};
  const parentMessages = [];
  let rafCb = null;
  let clock = 0;
  let t = 0;

  const sandbox = {
    console,
    Math, JSON, Date, Object, Array, String, Number, Boolean, parseInt, parseFloat,
    isNaN, setTimeout: (fn) => { /* run immediately for quiz auto-resume */ try { fn(); } catch (e) {} },
    URLSearchParams,
    btoa: (s) => Buffer.from(s, "utf8").toString("base64"),
    atob: (s) => Buffer.from(s, "base64").toString("utf8"),
    TextEncoder: require("util").TextEncoder,
    TextDecoder: require("util").TextDecoder,
    performance: { now: () => clock },
    requestAnimationFrame: (cb) => { rafCb = cb; return 1; },
    cancelAnimationFrame: () => {},
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    confirm: () => true,
  };
  const windowObj = {
    innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
    location: { search: "?payload=" + Buffer.from(JSON.stringify({
      vocab: [{ from: "merhaba", correct: "hello", distractors: ["bye", "thanks", "no"] }],
      fromLang: "Turkish", toLang: "English", accent: "#e64980",
    })).toString("base64") },
    addEventListener(type, fn) { (winListeners[type] = winListeners[type] || []).push(fn); },
    removeEventListener() {},
    parent: { postMessage: (msg) => { parentMessages.push(msg); } },
    VocabEngine: null,
    __SNAKE_TEST__: true,
    __AST_TEST__: true,
    __FLAP_TEST__: true,
    __PAC_TEST__: true,
    __DEF_TEST__: true,
    __RAI_TEST__: true,
    __OVER_GUARD_OFF__: true,   // tests restart instantly; the real lock is covered by test_overguard.js
    __QUIZ_TEST__: true,
    __WHEEL_TEST__: true,
    __TUG_TEST__: true,
    __WALL_TEST__: true,
  };
  sandbox.window = windowObj;
  sandbox.document = {
    getElementById: () => makeEl("canvas"),
    documentElement: { style: { setProperty() {} } },
    head: { appendChild() {} },
    body: { dataset: {}, appendChild() {} },
    createElement: (t) => makeEl(t),
    addEventListener() {},
  };
  sandbox.global = sandbox;

  vm.createContext(sandbox);
  // load common (sets window.VocabEngine)
  vm.runInContext(common, sandbox, { filename: "engine-common.js" });
  // load inline game
  vm.runInContext(inline, sandbox, { filename: path.basename(htmlPath) });

  function tick(n) {
    for (let i = 0; i < n; i++) {
      clock += 16; // ~60fps wall-clock advance so dt is realistic
      const cb = rafCb; rafCb = null;
      if (!cb) throw new Error("render loop died (no rAF scheduled) at frame " + i);
      cb(clock);
    }
  }

  function fireRaw(type, evObj) {
    (winListeners[type] || []).forEach((fn) => fn(evObj));
  }
  function fireMsg(type, extra) {
    fireRaw("message", { data: Object.assign({ type }, extra || {}) });
  }

  // 1) menu frames (must not throw)
  tick(5);
  // 2) start
  fireMsg("start");
  // 3) play frames; drive the paddle and fire so bricks/quizzes actually happen
  let asks = 0, answered = 0, hud = 0;
  let sweep = 0;
  const isTetris = /tetris/i.test(htmlPath);
  const isSnake = /snake/i.test(htmlPath);
  const isAsteroids = /asteroids/i.test(htmlPath);
  const isFlappy = /flappy/i.test(htmlPath);
  const isPac = /pacman/i.test(htmlPath);
  const isDef = /defender/i.test(htmlPath);
  const isRai = /raiders/i.test(htmlPath);
  const isWheel = /wheel/i.test(htmlPath);
  const isTug = /tug/i.test(htmlPath);
  for (let i = 0; i < 40000; i++) {
    if (isTetris) {
      // Tetris: rotate, shift, and soft-drop to actually fill rows and clear lines
      if (i % 3 === 0) fireRaw("keydown", { key: "ArrowLeft", preventDefault() {} });
      if (i % 5 === 0) fireRaw("keydown", { key: "ArrowRight", preventDefault() {} });
      if (i % 7 === 0) fireRaw("keydown", { key: "ArrowUp", preventDefault() {} });
      if (i % 2 === 0) fireRaw("keydown", { key: "ArrowDown", preventDefault() {} });
      // occasional hard drop to settle pieces fast
      if (i % 11 === 0) fireRaw("keydown", { key: " ", preventDefault() {} });
    } else if (isSnake) {
      // steer the snake toward the food so it actually eats (and quizzes) apples
      const se = sandbox.window.__snake;
      if (se && se.getState && se.getState() === "over") { fireMsg("start"); }
      if (se && se.food && se.head) {
        const h = se.head(), f = se.food();
        if (h && f) {
          const dx = f.x - h.x, dy = f.y - h.y;
          let nx = 0, ny = 0;
          if (Math.abs(dx) >= Math.abs(dy)) nx = dx > 0 ? 1 : -1; else ny = dy > 0 ? 1 : -1;
          se.setDir(nx, ny);
        }
      }
      // sweep the mouse too (exercises the pointer-steering path)
      sweep = (sweep + 0.18) % (Math.PI * 2);
      fireRaw("pointermove", { clientX: 400 + Math.sin(sweep) * 380, clientY: 300 + Math.cos(sweep) * 200 });
    } else if (isAsteroids) {
      // hold fire + sweep rotation so the ship clears asteroids (and quizzes)
      const se = sandbox.window.__ast;
      if (se && se.getState && se.getState() === "over") { fireMsg("start"); }
      if (i % 2 === 0) fireRaw("keydown", { key: " ", preventDefault() {} });
      if (i % 30 === 0) fireRaw("keydown", { key: "ArrowLeft", preventDefault() {} });
      else if (i % 30 === 15) fireRaw("keyup", { key: "ArrowLeft" });
      if (i % 30 === 5) fireRaw("keydown", { key: "ArrowRight", preventDefault() {} });
      else if (i % 30 === 20) fireRaw("keyup", { key: "ArrowRight" });
      if (i % 3 === 0) fireRaw("keydown", { key: "ArrowUp", preventDefault() {} });
    } else if (isFlappy) {
      // flap periodically so the bird stays aloft; restart if it dies
      const se = sandbox.window.__flap;
      if (se && se.getState && se.getState() === "over") { fireMsg("start"); }
      if (i % 14 === 0) fireRaw("keydown", { key: " ", preventDefault() {} });
    } else if (isPac) {
      // restart if dead; otherwise wander the maze via a simple direction sweep
      const se = sandbox.window.__pac;
      if (se && se.getState && se.getState() === "over") { fireMsg("start"); }
      const dirs = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
      if (i % 9 === 0) fireRaw("keydown", { key: dirs[(i / 9) % 4 | 0], preventDefault() {} });
    } else if (isDef) {
      // ground turret: click to fire toward a moving cursor; restart if dead
      const se = sandbox.window.__def;
      if (se && se.getState && se.getState() === "over") { fireMsg("start"); }
      // sweep the cursor across the sky so the turret tracks + fires at saucers
      sweep = (sweep + 0.13) % (Math.PI * 2);
      const cx = 400 + Math.sin(sweep) * 360;
      const cy = 120 + (Math.cos(sweep * 1.3) + 1) * 120;
      fireRaw("pointermove", { clientX: cx, clientY: cy });
      // press-and-hold to fire continuously
      fireRaw("pointerdown", { clientX: cx, clientY: cy });
      if (i % 25 === 0) fireRaw("pointerup", {});   // release occasionally, then re-press next tick
    } else if (isRai) {
      // side-scrolling fighter: sweep it up and down so its automatic guns meet the raiders
      const se = sandbox.window.__rai;
      if (se && se.getState && se.getState() === "over") { fireMsg("start"); }
      const cy = 60 + (Math.sin(i / 22) + 1) * 240;
      fireRaw("pointermove", { clientX: 400, clientY: cy });
    } else if (isWheel) {
      // prize wheel: spin whenever it is idle; the loop below answers the question
      const se = sandbox.window.__wheel;
      if (se && se.getState && se.getState() === "ready") se.spin();
    } else if (isTug) {
      // head-to-head duel: answer only for the red side so the rope really travels
      // (answering every question correctly would leave the net pull oscillating).
      // Pending asks are consumed here; the generic block below is told to stay out.
      const se = sandbox.window.__tug;
      if (se && se.getState) {
        const st = se.getState();
        if (st === "asking" || st === "steal") {
          for (let k = parentMessages.length - 1; k >= 0; k--) {
            if (parentMessages[k].type === "ask") { asks++; parentMessages.splice(k, 1); }
          }
          se.answer(se.askTeam() === 0);
          answered++;
        }
      }
    } else {
      // sweep the paddle across the screen to deflect the ball horizontally
      sweep = (sweep + 0.18) % (Math.PI * 2);
      fireRaw("pointermove", { clientX: 400 + Math.sin(sweep) * 380 });
      // auto-fire for invaders-style games
      if (i % 14 === 0) fireRaw("keydown", { key: " ", preventDefault() {} });
    }
    tick(1);
    // answer any quiz the engine raises
    for (let k = parentMessages.length - 1; k >= 0; k--) {
      const msg = parentMessages[k];
      if (msg.type === "ask") {
        asks++;
        parentMessages.splice(k, 1);
        if (isTug) continue;   // the duel answers through its own seam above
        fireMsg("answer", { correct: true });
        answered++;
      } else if (msg.type === "hud") {
        hud++;
        parentMessages.splice(k, 1);
      }
    }
  }
  // pause/resume sanity
  fireMsg("pause");
  tick(3);
  fireMsg("resume");
  tick(3);

  const results = parentMessages.filter((m) => m.type === "result");
  console.log(
    "  OK  " + path.basename(htmlPath) +
    " | asks=" + asks + " answered=" + answered +
    " hudSeen=" + hud +
    " results=" + results.length +
    (results.length ? " (" + (results[0].win ? "WIN" : "LOSE") + ",score=" + results[0].score + ",correct=" + results[0].correct + ")" : "")
  );
  return { asks, answered, results };
}

const games = process.argv.slice(2);
if (games.length === 0) {
  console.error("usage: node verify_game.js <engine.html> [...]");
  process.exit(1);
}
let failed = false;
for (const g of games) {
  try {
    run(path.resolve(g));
  } catch (e) {
    failed = true;
    console.log("  FAIL " + path.basename(g) + " -> " + e.message);
  }
}
process.exit(failed ? 1 : 0);
