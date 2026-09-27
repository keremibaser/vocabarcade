/*
 * VocabArcade — Game Catalog (v3: topic-agnostic engine types)
 * ---------------------------------------------------------------
 * GAMES are engine TYPES, not per-topic copies. A game's `engine` maps to a
 * folder games/<engine>/<engine>.html whose iframe accepts a `payload` of
 * vocab (Turkish -> English) supplied at play time. So ANY topic loads into
 * ANY game — no duplication.
 *
 * `ready:true` games have a working engine; `ready:false` are catalog entries
 * shown as "soon" so the 20-game host you asked for is visible and extensible.
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
    { id: "memory",    title: "Memory Match",    engine: "memory",    emoji: "🃏", accent: "#c2255c", ready: false, blurb: "Flip pairs of matching words." },
    { id: "hangman",   title: "Hangman",         engine: "hangman",   emoji: "🪢", accent: "#e8590c", ready: false, blurb: "Guess the English word letter by letter." },
    { id: "whack",     title: "Word Whack-a-Mole", engine: "whack",    emoji: "🔨", accent: "#d6336c", ready: false, blurb: "Whack the correct translation." },
    { id: "runner",    title: "Word Runner",     engine: "runner",    emoji: "🏃", accent: "#5c940d", ready: false, blurb: "Jump and answer on the run." },
    { id: "typing",    title: "Typing Typer",    engine: "typing",    emoji: "⌨️", accent: "#1c7ed6", ready: false, blurb: "Type the English meaning fast." },
    { id: "falling",   title: "Falling Words",   engine: "falling",   emoji: "🍂", accent: "#0b7285", ready: false, blurb: "Catch the correct falling word." },
    { id: "quiz",      title: "Quick Quiz",      engine: "quiz",      emoji: "❓", accent: "#364fc7", ready: false, blurb: "Straight multiple-choice drill." },
    { id: "spelling",  title: "Spell Bee",       engine: "spelling",  emoji: "🐝", accent: "#e03131", ready: false, blurb: "Spell the English word out loud/typed." },
    { id: "crossword", title: "Mini Crossword",  engine: "crossword", emoji: "📰", accent: "#9c36b5", ready: false, blurb: "Fill the grid with meanings." },
    { id: "wordfind",  title: "Word Search",     engine: "wordfind",  emoji: "🔎", accent: "#0c8599", ready: false, blurb: "Find the English words hidden in the grid." },
    { id: "puzzle",    title: "Slide Puzzle",    engine: "puzzle",    emoji: "🧠", accent: "#6741d9", ready: false, blurb: "Slide tiles to reveal the word." },
    { id: "darts",     title: "Word Darts",      engine: "darts",     emoji: "🎯", accent: "#c92a2a", ready: false, blurb: "Aim and answer for bullseyes." },
    { id: "race",      title: "Word Race",       engine: "race",      emoji: "🏁", accent: "#2b8a3e", ready: false, blurb: "Race to the answer first." },
  ];

  window.VOCAB_GAMES = GAMES;
})();
