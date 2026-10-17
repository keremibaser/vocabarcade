/*
 * VocabArcade — Engine Common
 * ---------------------------------------------------------------
 * Shared contract between the host (index.html) and any game iframe.
 * Every game engine (breakout/invaders/...) loads this file FIRST and
 * uses these helpers. The contract mirrors the Godot original's design:
 *   - the game owns its physics; the host owns chrome + vocabulary.
 *   - when the ball hits an educational brick, the game PAUSES itself and
 *     asks the host to show the quiz; the host replies and the game resumes.
 *
 * MESSAGES  (postMessage, { type, ... } on event.data)
 *   engine -> host:
 *     "ready"            engine finished loading
 *     "hud"   { score, lives, correct, combo, level }
 *     "result" { win:bool, score:int, correct:int, total:int }
 *     "event" { name:string }        ("correct" | "wrong" | "miss" | "win" | "lose")
 *     "ask"   { word:string, options:[...] }   request a quiz popup
 *   host -> engine:
 *     "start"
 *     "pause"
 *     "resume"
 *     "quit"
 *     "answer" { correct:bool }      response to "ask"
 */
(function () {
  "use strict";

  const MSG = {
    READY: "ready",
    HUD: "hud",
    RESULT: "result",
    EVENT: "event",
    ASK: "ask",
    START: "start",
    PAUSE: "pause",
    RESUME: "resume",
    QUIT: "quit",
    ANSWER: "answer",
  };

  // parse the launch payload from the iframe URL: ?payload=<url-safe base64 json>
  // UTF-8 safe: Turkish chars (ç ğ ı ö ş) are NOT Latin1, so plain btoa/atob throws.
  function decodePayload(str) {
    try {
      // URLSearchParams already percent-decodes; also undo url-safe base64
      // (- > +, _ > /) so the strict browser atob() accepts it.
      let s = decodeURIComponent(str);
      s = s.replace(/-/g, "+").replace(/_/g, "/");
      while (s.length % 4) s += "=";
      const bin = atob(s);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const txt = new TextDecoder("utf-8").decode(bytes);
      return JSON.parse(txt);
    } catch (e) {
      console.error("[engine] bad payload", e);
      return null;
    }
  }

  // encode an arbitrary (UTF-8) string to a URL-safe base64 token
  function encodePayload(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  // readLaunch() hands the topic to an engine. Two transports, in order:
  //   1. the host writes it to sessionStorage (same origin) — no size limit, so a
  //      164-word unit can never blow the URL length cap (GitHub Pages answers 414
  //      to long query strings, which shows up as a dead game frame)
  //   2. ?payload=<url-safe base64 json> — used by tests, tools and by the host when
  //      storage is unavailable. Keep this path for standalone/short payloads only.
  const LAUNCH_KEY = "VOCABARC_LAUNCH_V1";

  function normalizeLaunch(launch) {
    // the URL transport ships a compact list (no `_pool`), so rebuild the distractor
    // pool from the pairs themselves. A payload that already has one is left alone.
    if (!launch || !Array.isArray(launch.vocab)) return launch;
    const pool = launch.vocab.map(function (v) { return v.correct; });
    launch.vocab.forEach(function (v) {
      if (!Array.isArray(v._pool) || !v._pool.length) v._pool = pool;
    });
    return launch;
  }

  function writeLaunch(obj) {
    try { sessionStorage.setItem(LAUNCH_KEY, JSON.stringify(obj)); return true; }
    catch (e) { return false; }
  }

  function readLaunch() {
    try {
      const raw = sessionStorage.getItem(LAUNCH_KEY);
      if (raw) {
        sessionStorage.removeItem(LAUNCH_KEY);        // consume it: never stale
        return normalizeLaunch(JSON.parse(raw));
      }
    } catch (e) {}
    const q = new URLSearchParams(window.location.search);
    const p = q.get("payload");
    if (!p) return null;
    return normalizeLaunch(decodePayload(p));
  }

  // post a message to the parent (the host)
  function send(type, extra) {
    const msg = Object.assign({ type: type }, extra || {});
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(msg, "*");
    }
  }

  // listen for host messages; cb(msg) receives parsed event.data
  function listen(cb) {
    window.addEventListener("message", function (ev) {
      const data = ev.data;
      if (!data || !data.type) return;
      cb(data);
    });
  }

  // build the 4-option list for a word entry, shuffled, returning
  // { options:[...], correct:string }
  // If the entry carries a _pool (all English words in the topic), we pick
  // 3 random distractors from it each time — so every quiz attempt shows
  // different wrong answers and kids can't memorise a fixed pattern.
  function buildOptions(entry) {
    var correct = entry.correct;
    var ds;

    if (entry._pool && entry._pool.length > 1) {
      // Build a list of candidates excluding the correct answer
      var available = entry._pool.filter(function (e) { return e !== correct; });
      // Fisher-Yates shuffle the candidates
      for (var i = available.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = available[i]; available[i] = available[j]; available[j] = t;
      }
      ds = available.slice(0, 3);
    } else {
      // Fallback: use pre-set distractors (backward compatibility)
      ds = (entry.distractors || []).slice(0, 3);
    }

    // Combine correct + distractors and shuffle the final options
    var opts = [correct].concat(ds);
    for (var i = opts.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = opts[i]; opts[i] = opts[j]; opts[j] = t;
    }
    return { options: opts, correct: correct };
  }

  // shuffle an array of entries (returns new array)
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  // ---- touch controls (smartboard / mouse-click buttons, shared by every engine) ----
  const TC_CSS =
    ".touch-controls{position:fixed;left:0;right:0;bottom:0;z-index:50;" +
    "display:flex;gap:10px;padding:10px 12px;justify-content:center;align-items:flex-end;" +
    "background:linear-gradient(180deg,rgba(5,6,15,0),rgba(5,6,15,0.82));" +
    "touch-action:none;user-select:none;-webkit-user-select:none;}" +
    ".touch-controls.hidden{display:none;}" +
    ".tc-btn{appearance:none;border:0;cursor:pointer;color:#eef;font-weight:700;" +
    "font-family:system-ui,'Segoe UI',Arial,sans-serif;font-size:20px;line-height:1;" +
    "min-width:64px;height:60px;padding:0 14px;border-radius:14px;" +
    "background:rgba(40,48,82,0.92);box-shadow:0 3px 0 rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.08);" +
    "border:1px solid rgba(255,255,255,0.10);touch-action:none;user-select:none;-webkit-user-select:none;" +
    "transition:transform .04s ease,background .1s ease;}" +
    ".tc-btn:active{transform:translateY(2px);background:rgba(112,72,232,0.95);}" +
    ".tc-btn.tc-wide{min-width:96px;}" +
    ".tc-btn.tc-accent{background:rgba(112,72,232,0.92);}";
  let tcStyleInjected = false;
  function ensureTouchStyles() {
    if (tcStyleInjected) return;
    if (!document || !document.head) return;   // no DOM (e.g. test env) — skip
    const s = document.createElement("style");
    s.textContent = TC_CSS;
    document.head.appendChild(s);
    tcStyleInjected = true;
  }

  // buttons: [{ id, label, kind:'tap'|'hold', wide?, accent?, onPress?, onRelease? }]
  //  - onPress  : fires ONCE, only on the initial press (pointerdown) and only if the
  //               button isn't already held. This is the single "fire for one frame" event.
  //  - onRelease: fires ONCE when the press ends (pointerup / pointercancel), even if the
  //               cursor drifted off the button (we use pointer capture).
  //  - kind 'hold' is just a hint for engines that want a held flag; the EVENTS are always
  //    single-shot per press/release. No repeat-on-hold, no fire-on-enter, no fire-on-leave.
  function mountTouchControls(buttons) {
    ensureTouchStyles();
    let wrap = document.getElementById("touch-controls");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "touch-controls";
      wrap.className = "touch-controls";
      document.body.appendChild(wrap);
    }
    wrap.innerHTML = "";
    const els = {};
    buttons.forEach(function (b) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tc-btn" + (b.wide ? " tc-wide" : "") + (b.accent ? " tc-accent" : "");
      btn.setAttribute("aria-label", b.label.replace(/<[^>]+>/g, "").trim());
      btn.innerHTML = b.label;
      let held = false;
      const press = function (e) {
        if (held) return;            // ignore extra downs (e.g. re-entry) until release
        held = true;
        if (e.pointerId != null && btn.setPointerCapture) { try { btn.setPointerCapture(e.pointerId); } catch (_) {} }
        e.preventDefault(); e.stopPropagation();
        if (b.onPress) b.onPress();
      };
      const release = function (e) {
        if (!held) return;
        held = false;
        if (e && e.pointerId != null && btn.releasePointerCapture) { try { btn.releasePointerCapture(e.pointerId); } catch (_) {} }
        if (e) e.preventDefault();
        if (b.onRelease) b.onRelease();
      };
      btn.addEventListener("pointerdown", press);
      btn.addEventListener("pointerup", release);
      btn.addEventListener("pointercancel", release);
      // NOTE: deliberately no pointerleave / pointerenter -> no fire-on-enter/leave,
      //       and capture guarantees release is delivered to this button.
      btn.addEventListener("contextmenu", function (e) { e.preventDefault(); });
      wrap.appendChild(btn);
      els[b.id] = btn;
    });
    return els;
  }

  // ---- shared lightweight SFX (Web Audio synthesis, no asset files) ----
  // Engines create one per launch and gate it with the host's sound toggle:
  //   const Sfx = E.sfx({ enabled: launch.sound !== false });
  //   Sfx.shoot(); Sfx.hit(); Sfx.pickup(); Sfx.edu(); ...
  // Every call is a no-op when disabled or when Web Audio is unavailable
  // (headless test shims, blocked autoplay) — it never throws.
  function sfx(opts) {
    const on = !opts || opts.enabled !== false;
    let ctx = null;
    function ac() {
      if (!on) return null;
      if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
      if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
      return ctx;
    }
    function tone(f1, f2, dur, type, vol, delay) {
      const c = ac(); if (!c) return;
      const t = c.currentTime + (delay || 0);
      const o = c.createOscillator(), g = c.createGain();
      o.type = type || "square";
      o.frequency.setValueAtTime(f1, t);
      try { if (f2 != null) o.frequency.exponentialRampToValueAtTime(Math.max(1, f2), t + dur); } catch (e) {}
      g.gain.setValueAtTime(vol == null ? 0.06 : vol, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(c.destination);
      o.start(t); o.stop(t + dur + 0.03);
    }
    function noise(dur, vol, cutoff) {
      const c = ac(); if (!c) return;
      const t = c.currentTime, n = Math.floor(c.sampleRate * dur);
      const buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
      const src = c.createBufferSource(); src.buffer = buf;
      const f = c.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = cutoff || 1200;
      const g = c.createGain(); g.gain.value = vol == null ? 0.2 : vol;
      src.connect(f); f.connect(g); g.connect(c.destination);
      src.start(t);
    }
    return {
      enabled: on,
      tone: tone, noise: noise,
      blip:    function () { tone(620, 760, 0.045, "square", 0.035); },   // tiny UI/eat tick
      hit:     function () { tone(320, 240, 0.06, "square", 0.05); },     // bounce / tap
      break_:  function () { noise(0.12, 0.16, 2200); },                  // brick / block pop
      lock:    function () { tone(180, 120, 0.08, "square", 0.05); },     // piece lands (tetris)
      shoot:   function () { tone(900, 190, 0.13, "square", 0.05); },     // laser
      explode: function () { noise(0.32, 0.20, 1500); tone(240, 60, 0.26, "sawtooth", 0.045); },
      pickup:  function () { tone(520, 880, 0.10, "triangle", 0.06); },   // eat / score
      clear:   function () { tone(660, 990, 0.15, "triangle", 0.06); tone(990, 1320, 0.15, "triangle", 0.05, 0.08); },
      flap:    function () { noise(0.09, 0.12, 900); },                   // wing swoosh
      edu:     function () { tone(560, 980, 0.16, "triangle", 0.06); },   // quiz opens
    };
  }

  // ---- crisp canvas fitting (shared by every engine) ----
  // Engines draw in logical W x H units, but the canvas is stretched to fill the
  // screen. If the backing store stays at W x H while CSS displays it larger, every
  // glyph gets upscaled and looks blurry on a smartboard/projector. So size the
  // backing store to the REAL on-screen pixel size (CSS px * devicePixelRatio) and
  // scale the context back to logical units — drawing code keeps using W/H as-is.
  function fitCanvas(canvas, ctx, W, H) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const vw = window.innerWidth, vh = window.innerHeight;
    const ratio = W / H;
    let cw = vw, ch = vw / ratio;
    if (ch > vh) { ch = vh; cw = vh * ratio; }
    canvas.style.width = cw + "px";
    canvas.style.height = ch + "px";
    canvas.width = Math.max(1, Math.round(cw * dpr));
    canvas.height = Math.max(1, Math.round(ch * dpr));
    const sx = canvas.width / W, sy = canvas.height / H;
    if (ctx && ctx.setTransform) ctx.setTransform(sx, 0, 0, sy, 0, 0);
    return { sx: sx, sy: sy, cssW: cw, cssH: ch, dpr: dpr };
  }

  // ---- game-over screen lock ----
  // A game-over screen has to stay up for a moment: on a smartboard a stray tap
  // would otherwise skip straight past it. Each engine arms the lock when the game
  // ends and asks live() at the top of startGame(), so nothing can restart the run
  // for that long. Tests set window.__OVER_GUARD_OFF__ to restart immediately.
  function overGuard(ms) {
    var until = 0;
    return {
      arm: function () { until = Date.now() + (ms || 2000); },
      live: function () {
        if (typeof window !== "undefined" && window.__OVER_GUARD_OFF__) return false;
        return Date.now() < until;
      },
      left: function () { return Math.max(0, until - Date.now()); },
    };
  }

  window.VocabEngine = {
    MSG: MSG,
    overGuard: overGuard,
    fitCanvas: fitCanvas,
    readLaunch: readLaunch,
    writeLaunch: writeLaunch,
    decodePayload: decodePayload,
    encodePayload: encodePayload,
    mountTouchControls: mountTouchControls,
    sfx: sfx,
    send: send,
    listen: listen,
    buildOptions: buildOptions,
    shuffle: shuffle,
  };
})();
