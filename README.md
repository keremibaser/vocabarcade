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
**Defender** fire `shoot`, saucer `explode`, ❓ saucer `edu`, turret lost `explode`.

The host sends its 🔊/🔇 state in the launch payload (`sound`), so muting the host mutes the engines
too. Win/lose/correct/wrong stay host-side (driven by the engine's event messages) so they are never
doubled up. Every SFX call is a safe no-op when Web Audio is unavailable or autoplay is blocked.

Everything is saved to `localStorage` (topics, active topic, scores). **＋ New topic** adds
a blank topic; **↺ Reset all** (see below) restores the 20 default topics.

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
data/topics.js          seed of 20 Turkish→English topics (content)
data/library.js         seed of 20 game TYPES (engines; topic-agnostic)
js/store.js             localStorage: topics, active topic, scores + distractor autofill
js/engine-common.js     shared host<->engine message protocol
js/app.js               host controller (topic-first flow, player, editor)
games/breakout/         breakout engine
games/invaders/         invaders engine
games/tetris/           tetris engine (quiz on line clear)
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
- **New game engine:** copy `games/breakout/breakout.html` to `games/<type>/<type>.html`,
  keep the `VocabEngine` contract, add `{ id, title, engine:"<type>", emoji, accent, ready:true,
  blurb }` to `data/library.js`.

## Verify (no browser needed)
`node verify_game.js games/breakout/breakout.html games/invaders/invaders.html`
Runs each engine headlessly (menu → start → thousands of play frames → pause/resume) and
asserts the render loop never dies and at least one quiz round-trip succeeds.
