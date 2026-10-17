# VocabArcade — Turkish → English Game Host

A web tool for teaching **middle-school Turkish students English vocabulary** through
classic arcade games. The flow is **topic-first then game**: pick a vocabulary topic,
then any game — the game loads that topic. There are **no per-topic game copies**; a
topic is content, a game is an engine, and the two are mixed on demand.

No build step, no server, no dependencies. Pure HTML/CSS/JS.

## The flow (topic-first, then game)
1. **📚 Topics** — choose a topic (a set of Turkish → English word pairs). It becomes the
   *active topic* (shown in a banner on the Games tab, and remembered for next visit).
2. **🎮 Games** — pick any game. The active topic is loaded into that engine — Breakout,
   Invaders, or any other. Each topic+game combo keeps its own 🏆 highscore.

Because topics and games are independent, adding a 21st game (or a new topic) never
requires duplicating anything.

## Vocabulary model
- A **topic** holds `{ tr, en, distractors? }` pairs (Turkish → English).
- **Distractors are optional.** If a word has fewer than 3 distractors, the game auto-fills
  the rest from other English meanings in the same topic, so a topic only needs `{ tr, en }`.
A **game** is an engine TYPE (`breakout`, `invaders`, `tetris`, …). `ready:true` games have a
working engine; the rest are catalog entries shown as "coming soon" so the full 20-game host is
visible and extensible.

### The quiz mechanic per game
- **Breakout / Invaders** — ~1/3 of targets are "educational"; hitting one pauses the game and
  asks the word. Correct → score + combo (wider paddle / points); wrong → −1 life.
- **Asteroids** — every 3rd asteroid (while words remain) is an educational ❓ asteroid; shooting one
  pauses the game and asks the word. Correct → it's destroyed (no split) + score + combo; wrong → −1 life
  (it stays alive to retry). Clear all asteroids to WIN. **Touch / mouse: just touch (or click) where you
  want the ship to go — it swings toward your finger and eases forward slowly to that spot** (a dashed
  line + ring marks the target, which clears once the ship arrives). Keyboard still works on desktop
  (← → rotate, ↑ thrust) and the ship auto-fires 2×/sec. The corner D-pad was removed — direct aiming
  replaces it. Visually the scene is a drifting star field with twinkling depth layers, soft nebula glow,
  a cratered moon and the odd comet; the rocks are cratered with a lit and a shadowed side, and the
  ❓ rocks glow gold.
- **Raiders (side-scrolling shoot 'em up)** — the fighter sits on the left and **its guns fire by
  themselves**; raiders stream in from the right in three flavours (straight, weaving, and divers
  that slide toward your row). Movement is **vertical only: drag your finger up / down** on the
  screen (or ↑ ↓ / W S). Every so often a golden ❓ raider carries a word — shooting it pauses the
  game and asks the question. Correct → it's destroyed + score + combo; wrong → −1 life and that
  raider goes briefly **immune** (it flashes) so the automatic fire cannot instantly re-ask the same
  word. Answer every word and clear the wave to WIN. Difficulty ramps smoothly with score (raiders
  fly faster and arrive closer together) and each wave sends one more raider.
- **Quiz — Test (deliberately not a game)** — the plain drill, kept as the reference for how the
  host/engine contract should behave: it asks **every word of the topic exactly once, in a random
  order**, keeps score, and passes with half or more correct. No ship to fly, no lives to lose —
  just `READY → ASK → ANSWER → EVENT → HUD → RESULT` end to end.
- **Word Wall (big display, not a game)** — puts the whole topic on screen **one line per word:
  number, English, Turkish** (e.g. `1 apple elma`), so the class can read it from the back of the room.
  Rows are aligned into columns like a table and run straight down (never side by side); when the list
  is taller than the screen it **scrolls** (finger drag, mouse wheel, or ↑ ↓ / PageUp / PageDown /
  Home / End) with a scrollbar and a soft fade at the band edges. It stays in **topic order** (never
  shuffled), asks nothing, and reports no score.
- **Word Wheel** — a prize wheel with **every word of the topic as a slice**. Tap the screen (or press
  Space) to spin it: the slice that stops under the pointer is the word you have to answer, and the host
  then asks it on the usual panel. A correct answer **retires that slice** (it greys out and the word
  stays legible); a wrong one costs a life and leaves the slice on the wheel. Clear every slice to WIN,
  run out of 3 lives and it's game over. The wheel only ever lands on words that are still open, so a
  run always moves forward.
- **Word Tug-of-War (two teams)** — a classroom duel. One rope, two teams (🔴 KIRMIZI vs 🔵 MAVİ), and
  every word of the topic is a question: **a correct answer hauls the rope one pull toward your side**.
  Miss, and the **other team gets one steal attempt on the same word** — answer it and they take the pull
  instead. Three in a row is a **power pull** (two at once). Haul the knot past your own marker to win.
  Teams take turns, so the class always knows who is up: the panel names the team
  (`ASK.team` / `ASK.teamColor`) and the arena glows in that team's colour. After every haul the arena
  **holds the new rope position for a couple of seconds** (with a thin countdown bar) before the next word
  is asked, so the class can see what the answer did. When the topic runs out the words are reshuffled and
  the duel continues rather than stopping on a leader.
- **Pac-Man** — one ghost is an educational ❓ ghost; touching it pauses the game and asks the word.
  Correct → the ghost respawns and the word advances; wrong → −1 life (the word comes up again on the
  next ❓ ghost). Power pellets frighten ghosts (eat them for points). Win = clear every dot AND answer
  all words; lose = 3 lives lost to ghost contact or wrong answers.
- **Defender** — about one in seven saucers is an educational ❓ saucer; shoot it to pause and answer the word.
  Correct → it's destroyed + score + combo; wrong → −1 life (it stays alive to retry). Saucers that slip PAST
  you mutate into chasing marauders that shoot back. Clear the waves and answer every word to WIN; lose = 3
  lives lost to marauder hits or wrong answers. Visually the scene is a parallax deep-space backdrop — a
  **ringed planet**, a cratered **moon**, three depth layers of **twinkling stars**, nebula haze, occasional
  shooting stars and two distant terrain ridges above a glowing horizon. Landers are **purple saucers** with
  a glass dome, glowing pilot eyes, claw emitters, blinking rim lights and a pulsing tractor beam, while
  marauders are **red swept-wing fighters with a glowing eye that rotate to face the turret** as they hunt it.
- **Flappy** — every 3rd pipe spawns an educational ❓ orb in its gap; collecting it pauses the game and
  asks the word. Correct → score + combo and the word advances; wrong → −1 life (the orb stays in place to retry).
  Answer all topic words to WIN.
- **Snake** — every 3rd spawned apple (while words remain) is an educational ❓ apple; eating one
  pauses the game and asks the word. Correct → score + combo and the word advances; wrong → −1 life
  (the word stays in the queue and comes up again). Clear all topic words to WIN. The snake moves
  at a relaxed cadence and **walls wrap around** — the head slips out the opposite side (block by
  block), so only a self-collision ends the run.
- **Tetris** — every time you clear one or more lines, the game pauses and asks a topic word
  (picked round-robin). Correct → the lines clear and you get the line + combo bonus; wrong →
  −1 life and the pending lines stay on the board. Score-scaled drop speed (faster at thresholds
  like Breakout).

**Breakout** is adapted from the supplied Godot `vocabulary-breakout` project: 9×5 bricks, every
3rd `(col+row)%3` is an educational ❓ brick that pauses the ball and asks the word; correct →
+20 and a combo bonus plus a paddle-stretch power-up (combo ≥ 2), wrong → −1 life; ball speed
scales at score thresholds `[120,300,520,800,1100]`. It has a **start screen** and a
**win/lose screen** with words-correct + score, and persists a **high score** to `localStorage`.

### Touch controls (smartboard / mouse)
All engines show on-screen control buttons (bottom bar) for touch/click play, since the target
hardware is a smartboard that emulates a mouse from touch. The buttons are created by a shared
helper `VocabEngine.mountTouchControls([...])` in `js/engine-common.js`, so every game gets
consistent, styled buttons without duplication.

**Input contract (important):** each button fires exactly once per press-and-release.
- `pointerdown` triggers the action a single time (and is ignored if the button is already held,
  so a held/mouse-drag does NOT auto-repeat).
- `pointerleave` / `pointerenter` do **not** trigger anything (fixes the "fires when the cursor
  enters/leaves" smartboard bug).
- `pointerup`/`pointercancel` re-arm the button (delivered via pointer capture even if the
  cursor drifted off the button).
- So a click/tap = exactly one action; there is no continuous-hold repeat. Movement buttons
  (paddle/ship/block) therefore nudge one step per tap rather than slide while held.
Buttons:
- **Breakout**: ◀ ▶ nudge paddle, ▶ START (launch / restart).
- **Invaders**: no buttons — the ship **auto-fires 1×/sec** and **steers by holding + dragging
  the mouse** (like Breakout's paddle). The player is a **single-wing delta fighter** (top-down)
  and the enemies are spaceships (three hull designs cycled by row) marching at a calm, slow pace
  over a decorative star + asteroid field (visual only). Engine-local Web-Audio SFX for **firing**,
  **explosions** and hitting a ❓ alien — gated by the host's 🔊/🔇 toggle.
- **Tetris**: ◀ ▼ ▶ move one step, ⟲ ⟳ rotate, ⤓ DROP (hard drop; also START on menu/over).

### In-game sound effects (every engine)
Engines synthesize their own sounds with the **Web Audio** API — no audio files, nothing to load.
The shared helper `E.sfx({ enabled })` in `js/engine-common.js` exposes: `shoot` (fire), `hit`
(bounce/tap), `break_` (brick pop), `explode` (destroyed), `pickup` (eat/score), `blip` (dot tick),
`lock` (piece lands), `clear` (line clear), `flap` (wing), `edu` (a ❓ target → quiz opens), plus raw
`tone(f1,f2,dur,type,vol,delay)` / `noise(dur,vol,cutoff)` for custom cues.

Wiring per game: **Breakout** wall + paddle bounce `hit`, brick `break_`, ball launch `pickup`;
**Invaders** fire `shoot`, alien `explode`, ❓ alien `edu`; **Snake** apple `pickup`, ❓ apple `edu`;
**Tetris** piece `lock`, line clear `clear`, ❓ line `edu`; **Asteroids** fire `shoot`, rock
`explode`, ❓ rock `edu`; **Flappy** flap `flap`, pipe pass `pickup`, ❓ orb `edu`, crash `hit`;
**Pac-Man** dot `blip`, pellet `pickup`, ❓ ghost `edu`, ghost eaten `explode`, death (falling tone);
**Defender** fire `shoot`, saucer `explode`, ❓ saucer `edu`, turret lost `explode`;
**Raiders** fire `shoot`, raider `explode`, ❓ raider `edu`, fighter hit `hit`.

The host sends its 🔊/🔇 state in the launch payload (`sound`), so muting the host mutes the engines
too. Win/lose/correct/wrong stay host-side (driven by the engine's event messages) so they are never
doubled up. Every SFX call is a safe no-op when Web Audio is unavailable or autoplay is blocked.

Everything is saved to `localStorage` (topics, active topic, scores). **＋ New topic** adds
a blank topic; **↺ Reset all** (see below) restores the 20 default topics.

### Crisp rendering (every engine)

The engines draw in **logical units** (800×600, or 820×720 for Tetris) and let CSS stretch the canvas
to the screen. If the backing store stayed at the logical size while being displayed ~1333 px wide,
every glyph was upscaled and looked **blurry** on a smartboard or projector. So every engine now sizes
its canvas through the shared `E.fitCanvas(canvas, ctx, W, H)`: the backing store is set to the **real
on-screen pixel size** (CSS px × `devicePixelRatio`) and the context is scaled back to logical units,
so drawing code is unchanged but the pixels land 1:1.

`fitCanvas` also **preserves each engine's aspect ratio** — it picks the largest W:H box that fits the
window and centres it, so the x and y scale factors are always equal. Two traps worth remembering:
comparing against `getBoundingClientRect()` counts a CSS border (snake/pacman have a 3 px one), so check
`canvas.width >= canvas.clientWidth`; and never size a canvas by its container instead (an earlier
`fitCanvasElement` did, which stretched Tetris's 820:720 playfield on a 16:10 screen at unequal
`setTransform` x/y scales). Verify in a browser with:

    canvas.width >= canvas.clientWidth            // crisp
    Math.abs(ctx.getTransform().a - ctx.getTransform().d) < 0.01   // not stretched

### The question overlay (every engine)

When an engine asks a question, the host draws the shared overlay: the Turkish word as the prompt and
four English options (A–D). **Once the question is answered, every option gets its own Turkish meaning
in amber beside it** — including the choices the player did not pick — so the whole class sees what all
four words mean, not only the right one. The Turkish is added only *after* the answer is settled, so it
can never give the answer away. (Amber = "Turkish" everywhere in the app, same as the Word Wall.)

### Game-over screens hold for two seconds

Every engine arms `E.overGuard(2000)` in its `gameOver()` and asks `live()` at the top of
`startGame()`, so **taps and key presses are ignored for two seconds** after a run ends — on a
smartboard a stray touch used to skip the result screen instantly. Gating `startGame()` (rather than
each input handler) covers every path at once: canvas taps, key presses and on-screen buttons.
Tests set `window.__OVER_GUARD_OFF__` so they can restart immediately; `test_overguard.js` covers the
real lock with the real clock and checks the wiring in all ten game engines.

## Host polish (shared, zero engine edits)
These three features are driven entirely by the messages every engine already emits
(`event`, `result`, `hud`), so they apply to all current **and** future games without
touching any engine file:
- **Sound** — synthesized WebAudio blips (no asset files). `correct` rises in pitch with the
  combo; distinct tones for `wrong` / `miss` / `win` (arpeggio) / `lose` (descending), plus a
  launch chirp. A **🔊 Sound: On/Off** toggle on the Games screen persists to `localStorage`.
  Browsers require a user gesture before audio starts, so the first sound plays on the first
  click (e.g. launching a game or toggling sound).
- **Combo burst** — a host overlay above the iframe. On `correct` it pops a "✓ NICE" (or
  "COMBO ×N!" at combo ≥ 2) with a 14-particle spark fan tinted by the game's accent; on
  `wrong` it pops a red "✗ WRONG". Respects `prefers-reduced-motion`.
- **🎲 Random Game** — a launcher on the Games screen. With a topic active it picks a
  random *ready* game and plays it with the current topic; with no topic it nudges you to the
  Topics tab.

## How a game works (host ↔ engine contract)
The host and each game iframe talk over `postMessage`. When the ball/bullet hits an
**educational** brick/alien:
1. the engine pauses and sends `ask { word, options, correct }`,
2. the host shows the quiz overlay (Turkish word → pick the English meaning),
3. the host replies `answer { correct: bool }`,
4. the engine resumes, scoring/destroying the brick or (on a wrong answer) costing a life.

This preserves the original *Vocabulary Breakout* design: **knowing the word is an in-game
advantage** — correct answers build a combo (wider paddle / score bonuses).

**How the topic reaches the engine.** The host writes the launch object
(`{ vocab, fromLang, toLang, accent, sound }`) into `sessionStorage` under
`VOCABARC_LAUNCH_V1` and loads `games/<type>/<type>.html?t=<stamp>`; the engine's
`E.readLaunch()` consumes that key (so it is never stale) and, if it is missing, falls
back to `?payload=<url-safe base64 json>`. The URL path is kept for tests and tools —
**never for the host**: a 164-word unit encoded that way makes a ~380 KB query string,
and GitHub Pages rejects it with `HTTP 414 URI Too Long`, which shows up as a dead
player frame. For the same reason the compact payload carries only `{from, correct}`
per word; `readLaunch()` rebuilds each entry's distractor `_pool` from the pairs.

## Run it
```
cd "D:/tool projects/VocabArcade"
python -m http.server 8080      # recommended (full localStorage persistence)
# open http://localhost:8080
```
Or double-click `index.html`. (Some browsers restrict `localStorage` on `file://`; the
HTTP server avoids that.)

## Layout
```
index.html              host UI (Topics + Games tabs, active-topic banner, player, editor)
css/styles.css          theming
data/topics.js          seed of 56 Turkish→English topics — the 7. & 8. Sınıf curriculum units first, then general sets
data/library.js          the game TYPES (engines; topic-agnostic) — 13 playable + whack-a-mole planned
js/store.js             localStorage: topics, active topic, scores + distractor autofill
js/engine-common.js     shared host<->engine message protocol
js/app.js               host controller (topic-first flow, player, editor)
games/breakout/         breakout engine
games/invaders/         invaders engine
games/tetris/           tetris engine (quiz on line clear)
games/raiders/          side-scrolling shoot 'em up engine (auto-fire, vertical movement)
games/quiz/             plain question drill — asks every word once in random order (test engine)
games/wordwall/         big-display word list — huge Turkish + English, scrolls when long
games/wheel/            prize wheel — every word is a slice; spin it and answer what it lands on
games/tug/              two-team rope duel — answer right to haul the rope; miss and it can be stolen
verify_game.js          headless no-crash + quiz-roundtrip test (breakout/invaders/tetris)
test_tetris.js          deterministic test: line-clear -> quiz -> clear/wrong-answer paths
```

## Editing
- **Edit a topic's words:** Topics tab → ✎ Words. Rows are `Turkish | English | 3 optional
  distractors`. Saved words apply wherever that topic is played.
- **New topic:** Topics tab → ＋ New topic → add rows → Save.
- **Rename a topic:** Topics tab → 🏷 on the topic card → type a new name → Rename.
- **Delete a topic:** Topics tab → 🗑 on the topic card → confirm. If it was the active
  topic, the active selection is cleared. Scores are keyed per topic+game and are left alone.
- **Grades & units (7. Sınıf / 8. Sınıf):** the 20 MEB unit topics are tagged `7. Sınıf` /
  `8. Sınıf` and titled `Ünite N · Name`, they sit at the top of the Topics tab, and each grade
  gets its own filter chip. `data/topics.js` is the source of truth: on every load the host
  **adds** any topic you are missing, **refreshes** the title/emoji/category/desc of topics you
  have not edited, and **keeps your words**. Anything you save through the editor is marked
  `touched` and is never overwritten afterwards — your edits always win.
- **New game engine:** copy `games/breakout/breakout.html` to `games/<type>/<type>.html`,
  keep the `VocabEngine` contract, add `{ id, title, engine:"<type>", emoji, accent, ready:true,
  blurb }` to `data/library.js`.

## Not built yet
The menu only lists games that can actually be played, plus `whack` (Word Whack-a-Mole), which is the
**next engine on the roadmap** and is kept as a visible placeholder. Ideas parked for later, in no order:
Memory Match, Hangman, Word Runner, Typing Typer, Falling Words, Spell Bee, Mini Crossword, Word Search,
Slide Puzzle, Word Darts, Word Race.

## Verify (no browser needed)
`node verify_game.js games/breakout/breakout.html games/invaders/invaders.html`
Runs each engine headlessly (menu → start → thousands of play frames → pause/resume) and
asserts the render loop never dies and at least one quiz round-trip succeeds.
