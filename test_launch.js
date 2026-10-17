/* Regression test for the launch transport (js/engine-common.js + the host's use).
 * The topic used to ride in the iframe URL as ?payload=<base64>. For the big
 * curriculum units that URL reached ~380 KB and GitHub Pages answered HTTP 414,
 * so no game would open on the live site. The launch now goes through
 * sessionStorage with a compact word list; the URL stays as a fallback.
 */
const fs = require("fs");
const vm = require("vm");

const COMMON = fs.readFileSync("js/engine-common.js", "utf8");

function boot(search, store) {
  const data = store || {};
  const sessionStorage = {
    getItem(k) { return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
    setItem(k, v) { data[k] = String(v); },
    removeItem(k) { delete data[k]; },
  };
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    sessionStorage: sessionStorage,
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    URLSearchParams: URLSearchParams,
    TextEncoder: require("util").TextEncoder,
    TextDecoder: require("util").TextDecoder,
    btoa: (s) => Buffer.from(s, "binary").toString("base64"),
    atob: (s) => Buffer.from(s, "base64").toString("binary"),
    document: { getElementById: () => null, addEventListener() {}, createElement: () => ({ style: {}, appendChild() {} }) },
    performance: { now: () => 0 }, requestAnimationFrame: () => 1, setTimeout: (f) => f(),
    Math: Math, JSON: JSON, Date: Date, Array: Array, Object: Object, String: String, Number: Number,
  };
  sandbox.window = { location: { search: search || "" }, addEventListener() {}, parent: null };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(COMMON, sandbox, { filename: "engine-common.js" });
  return { E: sandbox.window.VocabEngine, data: data };
}

let pass = true;
function check(name, cond, extra) {
  console.log((cond ? "OK   " : "FAIL ") + name + (extra ? "   " + extra : ""));
  if (!cond) pass = false;
}

// a 164-word topic, the size that broke the URL transport
const big = [];
for (let i = 0; i < 164; i++) big.push({ from: "türkçe" + i, correct: "english" + i });

// ── 1) the host hands the topic over through sessionStorage ──
const A = boot("?t=1234", {});
const handed = A.E.writeLaunch({ vocab: big.map((v) => ({ from: v.from, correct: v.correct })),
                                 fromLang: "Turkish", toLang: "English", accent: "#123456", sound: false });
check("the host can hand a launch over", handed === true);
const payloadSize = A.data.VOCABARC_LAUNCH_V1.length;
check("the handed-over payload is far under any URL limit", payloadSize < 12000, payloadSize + " bytes");
const got = A.E.readLaunch();
check("the engine receives it", !!got && got.vocab.length === 164, got ? got.vocab.length + " words" : "null");
check("...with the accent and settings", got.accent === "#123456" && got.sound === false);
check("Turkish characters survive the trip", /türkçe/.test(got.vocab[0].from), got.vocab[0].from);
check("reading it consumes it (never a stale topic)", A.E.readLaunch() === null || A.data.VOCABARC_LAUNCH_V1 === undefined,
  String(A.data.VOCABARC_LAUNCH_V1));
check("a second read finds nothing", A.E.readLaunch() === null);

// ── 2) the compact payload still yields distractors ──
const B = boot("?t=1", {});
B.E.writeLaunch({ vocab: big.map((v) => ({ from: v.from, correct: v.correct })), fromLang: "Turkish", toLang: "English" });
const b = B.E.readLaunch();
check("distractor pool is rebuilt from the pairs", Array.isArray(b.vocab[0]._pool) && b.vocab[0]._pool.length === 164,
  b.vocab[0]._pool ? b.vocab[0]._pool.length + " in pool" : "no pool");
const opts = B.E.buildOptions(b.vocab[0]);
check("a question still offers 4 options including the answer",
  opts.options.length === 4 && opts.options.indexOf(opts.correct) !== -1,
  opts.options.join(" / "));
check("the pool really contains the right answer", b.vocab[0]._pool.indexOf(b.vocab[0].correct) !== -1);

// ── 3) the URL fallback still works (tests, tools, no-storage builds) ──
const C = boot("", {});
const tok = C.E.encodePayload(JSON.stringify({
  vocab: [{ from: "elma", en: "", correct: "apple", _pool: ["apple", "pear", "plum", "fig"] }],
  fromLang: "Turkish", toLang: "English",
}));
const D = boot("?payload=" + encodeURIComponent(tok), {});
const d = D.E.readLaunch();
check("the ?payload= fallback still loads a topic", !!d && d.vocab.length === 1, d ? d.vocab[0].correct : "null");
check("a payload that already carries a pool is left as it was", d.vocab[0]._pool.length === 4, d.vocab[0]._pool.join(","));
check("Turkish in the URL payload decodes", (function () {
  const t = D.E.encodePayload(JSON.stringify({ vocab: [{ from: "çğıöşü" }] }));
  const E2 = boot("?payload=" + encodeURIComponent(t), {});
  const l = E2.E.readLaunch();
  return l.vocab[0].from === "çğıöşü";
})(), "");

// ── 4) the host no longer puts the word list in the URL ──
const appSrc = fs.readFileSync("js/app.js", "utf8");
check("the host hands the launch over instead of building a URL payload",
  /E\.writeLaunch\(/.test(appSrc) && /handed \? "" : "&payload="/.test(appSrc));
check("the frame URL stays tiny (a cache-buster is all that is added)",
  /\?t=" \+ Date\.now\(\)/.test(appSrc));
check("...and the URL no longer depends on the topic size", !/\?payload=" \+ encodeURIComponent\(payload\)/.test(appSrc));

console.log(pass ? "\nALL LAUNCH TESTS PASSED" : "\nSOME LAUNCH TESTS FAILED");
process.exit(pass ? 0 : 1);
