/* Regression test for the topic catalog + the seed sync (js/store.js).
 * The seed (data/topics.js) is the curriculum source of truth:
 *   - every MEB unit topic is tagged 7. Sınıf / 8. Sınıf and numbered Ünite 1..10
 *   - the sync refreshes metadata for topics the user has not edited
 *   - it NEVER overwrites a topic the user saved (marked `touched`)
 *   - it adds topics the user is missing, and reorders to the seed's order
 *   - no words are ever lost
 */
const fs = require("fs");
const vm = require("vm");

const TOPICS_SRC = fs.readFileSync("data/topics.js", "utf8");
const STORE_SRC = fs.readFileSync("js/store.js", "utf8");
const TOPICS_KEY = "VOCABARC_TOPICS_V3";

function boot(localTopics) {
  const data = {};
  if (localTopics) data[TOPICS_KEY] = JSON.stringify(localTopics);
  const localStorage = {
    getItem(k) { return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
    setItem(k, v) { data[k] = String(v); },
    removeItem(k) { delete data[k]; },
  };
  const sandbox = { window: {}, console: { log() {}, warn() {}, error() {} }, localStorage };
  vm.createContext(sandbox);
  vm.runInContext(TOPICS_SRC, sandbox, { filename: "topics.js" });
  vm.runInContext(fs.readFileSync("data/library.js", "utf8"), sandbox, { filename: "library.js" });
  vm.runInContext(STORE_SRC, sandbox, { filename: "store.js" });
  return { store: sandbox.window.VocabStore, data: data, seed: sandbox.window.VOCAB_TOPICS };
}
const saved = (data) => JSON.parse(data[TOPICS_KEY] || "[]");

let pass = true;
function check(name, cond, extra) {
  console.log((cond ? "OK   " : "FAIL ") + name + (extra ? "   " + extra : ""));
  if (!cond) pass = false;
}

// ── 1) fresh install: the curriculum units are there, tagged and numbered ──
const A = boot(null);
const fresh = A.store.topics();
check("the seed loads every topic", fresh.length === 56, fresh.length + " topics");
const g7 = fresh.filter((t) => t.category === "7. Sınıf");
const g8 = fresh.filter((t) => t.category === "8. Sınıf");
check("10 topics are tagged 7. Sınıf", g7.length === 10, g7.length + "");
check("10 topics are tagged 8. Sınıf", g8.length === 10, g8.length + "");
check("the curriculum units come first", fresh[0].category === "7. Sınıf", fresh[0].category + " / " + fresh[0].title);
check("...and they are in unit order",
  g7.map((t) => t.title.replace(/^Ünite (\d+).*/, "$1")).join(",") === "1,2,3,4,5,6,7,8,9,10",
  g7.map((t) => t.title).join(" | "));
check("7th grade unit 1 is Appearance and Personality", /Appearance and Personality/.test(g7[0].title), g7[0].title);
check("7th grade unit 10 is Planets", /Planets/.test(g7[9].title), g7[9].title);
check("8th grade unit 1 is Friendship", /Friendship \(Arkadaşlık\)/.test(g8[0].title), g8[0].title);
check("8th grade unit 10 is Natural Forces", /Natural Forces/.test(g8[9].title), g8[9].title);
check("every unit topic carries the unit number in its title", g7.concat(g8).every((t) => /^Ünite \d+ · /.test(t.title)));
const totalFresh = fresh.reduce((n, t) => n + (t.words || []).length, 0);
check("all 3705 word pairs survive", totalFresh === 3705, totalFresh + " words");

// ── 2) an existing board: metadata refreshes, the user's WORDS are kept ──
const editedWords = [{ tr: "benim kelimem", en: "my word" }];
const B = boot([{ id: "src-tourism", title: "Tourism", emoji: "🏠", category: "Daily Life", desc: "old",
                   words: editedWords }]);
const bT = B.store.getTopic("src-tourism");
check("the unit category reaches an existing board", bT.category === "8. Sınıf", bT.category);
check("the unit-numbered title reaches an existing board", bT.title === "Ünite 7 · Tourism (Turizm)", bT.title);
check("the unit emoji is refreshed", bT.emoji === "🧳", bT.emoji);
check("...but the user's edited WORDS are untouched",
  bT.words.length === 1 && bT.words[0].tr === "benim kelimem" && bT.words[0].en === "my word",
  JSON.stringify(bT.words));
check("the rest of the catalog was filled in", B.store.topics().length === 56, B.store.topics().length + " topics");

// ── 3) a topic the user saved is never overwritten ──
const C = boot([{ id: "src-tourism", title: "Benim Turizm Konum", emoji: "🧳", category: "Özel",
                   desc: "mine", touched: true, words: editedWords }]);
const cT = C.store.getTopic("src-tourism");
check("a user-edited topic keeps its own category", cT.category === "Özel", cT.category);
check("a user-edited topic keeps its own title", cT.title === "Benim Turizm Konum", cT.title);
check("...and its words", cT.words[0].tr === "benim kelimem");

// ── 4) missing topics are added, user-made ones go last ──
const mine = { id: "my-own", title: "My Topic", emoji: "⭐", category: "Custom", words: [{ tr: "deneme", en: "test" }] };
const D = boot([mine, { id: "src-planets", title: "Planets", category: "Nature", emoji: "🚀", words: [] }]);
const dList = D.store.topics();
check("every missing seed topic is added back", dList.length === 57, dList.length + " topics (56 seed + the user's own)");
check("the user's own topic is kept", !!D.store.getTopic("my-own"));
check("...and it sits at the end", dList[dList.length - 1].id === "my-own", dList[dList.length - 1].id);
check("the seed's order is applied to the rest", dList[0].id === "src-appearance-and-personality", dList[0].id);

// ── 5) the editor marks a topic as touched ──
const E = boot(null);
const t = E.store.getTopic("src-sports");
E.store.setTopicMeta("src-sports", { category: "Benim Kategorim" });
const eSaved = saved(E.data).find((x) => x.id === "src-sports");
check("saving through the editor marks the topic touched", eSaved.touched === true);
check("the editor's category is stored", eSaved.category === "Benim Kategorim", eSaved.category);
// a fresh boot must respect it
const F = boot(saved(E.data));
check("...and a later page load does not revert it",
  F.store.getTopic("src-sports").category === "Benim Kategorim",
  F.store.getTopic("src-sports").category);

// ── 6) resolve: a topic still builds a playable vocab payload ──
const G = boot(null);
const game = G.store.buildGame("src-dreams", "tug");
check("...and builds into a game", !!game && game.topicId === "src-dreams" && game.type === "tug",
  game ? game.title + " / " + game.topicTitle : "null");
const v = (game && game.vocab) || [];
check("a unit topic still resolves into a game payload",
  v.length > 0 && !!v[0].from && !!v[0].correct && Array.isArray(v[0]._pool) && v[0]._pool.length === v.length,
  v.length + " pairs");

console.log(pass ? "\nALL STORE / SEED TESTS PASSED" : "\nSOME STORE TESTS FAILED");
process.exit(pass ? 0 : 1);
