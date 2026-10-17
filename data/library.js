/*
 * VocabArcade — Game Catalog (v3: topic-agnostic engine types)
 * ---------------------------------------------------------------
 * GAMES are engine TYPES, not per-topic copies. A game's `engine` maps to a
 * folder games/<engine>/<engine>.html whose iframe accepts a `payload` of
 * vocab (Turkish -> English) supplied at play time. So ANY topic loads into
 * ANY game — no duplication.
 *
 * `ready:true` games have a working engine. `ready:false` entries are placeholders
 * for games we have NOT built: they are deliberately NOT shown in the menu (a card
 * that cannot be played just wastes the class's attention). The one exception kept
 * on purpose is `whack` — Word Whack-a-Mole, the next engine we plan to build.
 *
 * game entry: { id, title, engine, emoji, accent, ready, blurb }
 */
(function () {
  "use strict";

  const GAMES = [
    { id: "breakout",  title: "Brick Breakout",  engine: "breakout",  emoji: "🧱", accent: "#e64980", ready: true,  blurb: "Bounce the ball, answer the words, keep the combo alive." },
    { id: "invaders",  title: "Word Invaders",   engine: "invaders",  emoji: "👾", accent: "#0ca678", ready: true,  blurb: "Shoot the aliens; educational ones quiz you before they fall." },
    { id: "flappy",    title: "Flappy Words",    engine: "flappy",    emoji: "🐤", accent: "#ffd43b", ready: true,  blurb: "Flap through pipes; ❓ orbs quiz you, answer all to win." },

    { id: "snake",     title: "Vocab Snake",     engine: "snake",     emoji: "🐍", accent: "#2f9e44", ready: true,  blurb: "Eat the apples; ❓ ones quiz you, clear all words to win." },
    { id: "pacman",   title: "Vocab Pac-Man",  engine: "pacman",   emoji: "🟡", accent: "#fcc419", ready: true,  blurb: "Eat the maze; ❓ ghosts quiz you, clear all to win." },
    { id: "defender", title: "Vocab Defender", engine: "defender", emoji: "🛡️", accent: "#12b886", ready: true, blurb: "Shoot saucers; ❓ ones quiz you, clear them all to win." },
    { id: "tetris",    title: "Word Tetris",     engine: "tetris",    emoji: "🧩", accent: "#7048e8", ready: true,  blurb: "Clear lines by matching meanings." },
    { id: "asteroids", title: "Meaningoids",     engine: "asteroids", emoji: "☄️", accent: "#1098ad", ready: true,  blurb: "Blast asteroids; ❓ ones quiz you, clear them all to win." },
    { id: "raiders",   title: "Word Raiders",    engine: "raiders",   emoji: "🛸", accent: "#f76707", ready: true,  blurb: "A side-scrolling fighter — the guns fire on their own at raiders streaming in from the right." },
    { id: "quiz",      title: "Word Quiz — Test", engine: "quiz",     emoji: "🧪", accent: "#364fc7", ready: true,  blurb: "Test only: asks every word of the topic once, in a random order — pure multiple-choice drill, no gameplay." },
    { id: "wordwall",  title: "Word Wall",       engine: "wordwall",  emoji: "📋", accent: "#1971c2", ready: true,  blurb: "Big-screen word list: number, English and Turkish on one line — scroll when the list is long." },
    { id: "wheel",     title: "Word Wheel",      engine: "wheel",     emoji: "🎡", accent: "#f59f00", ready: true,  blurb: "Spin the wheel: every word of the topic is a slice — answer whatever it lands on." },
    { id: "tug",       title: "Word Tug-of-War", engine: "tug",       emoji: "⚔️", accent: "#e8590c", ready: true,  blurb: "Two teams, one rope: answer right to haul it your way — miss and the other team steals the word." },
    { id: "whack",     title: "Word Whack-a-Mole", engine: "whack",    emoji: "🔨", accent: "#d6336c", ready: false, blurb: "Whack the correct translation." },
  ];

  window.VOCAB_GAMES = GAMES;
})();
