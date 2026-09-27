/* Unit test for the single-shot touch-button contract (engine-common.mountTouchControls).
 * Verifies: press fires once; a second pointerdown before release does NOT refire;
 * release re-arms; pointerleave does NOT fire (the smartboard bug we fixed). */
const fs = require("fs");
const vm = require("vm");

// minimal DOM stub
function makeEl() {
  const listeners = {};
  return {
    style: {}, classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
    dataset: {}, innerHTML: "", children: [],
    setPointerCapture() {}, releasePointerCapture() {},
    addEventListener(t, fn) { (listeners[t] = listeners[t] || []).push(fn); },
    removeEventListener() {},
    _emit(t, ev) { (listeners[t] || []).forEach((fn) => fn(ev || { pointerId: 1, preventDefault() {} })); },
    appendChild() {}, setAttribute() {}, focus() {},
  };
}

const common = fs.readFileSync("js/engine-common.js", "utf8");
const document = {
  head: { appendChild() {} },
  body: { appendChild() {} },
  getElementById() { return null; },
  createElement() { return makeEl(); },
  addEventListener() {},
};
const sandbox = {
  console, Math, JSON, Object, Array, String, Number, Boolean, parseInt, parseFloat, isNaN,
  TextEncoder: require("util").TextEncoder, TextDecoder: require("util").TextDecoder,
  URLSearchParams, btoa: (s) => Buffer.from(s, "utf8").toString("base64"),
  atob: (s) => Buffer.from(s, "base64").toString("utf8"),
  document,
  window: { addEventListener() {}, location: { search: "" } },
};
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(common, sandbox, { filename: "engine-common.js" });

const E = sandbox.window.VocabEngine;
let presses = 0;
const els = E.mountTouchControls([
  { id: "left", label: "◀", onPress: function () { presses++; } },
]);
const btn = els.left;
const ev = (id) => ({ pointerId: id == null ? 1 : id, preventDefault() {}, stopPropagation() {} });

// 1) first press -> 1
btn._emit("pointerdown", ev(1));
// 2) second pointerdown WITHOUT release (cursor re-entry / smartboard quirk) -> still 1
btn._emit("pointerdown", ev(1));
// 3) pointerup -> re-arm
btn._emit("pointerup", ev(1));
// 4) pointerdown again -> 2
btn._emit("pointerdown", ev(1));
// 5) pointerleave while held -> must NOT fire
btn._emit("pointerleave", ev(1));
// 6) pointerup -> re-arm, no extra fires
btn._emit("pointerup", ev(1));

console.log("presses:", presses);
const ok = presses === 2;
console.log(ok ? "OK  single-shot: 2 distinct presses -> 2 fires; no refire-on-hold, no fire-on-leave"
              : "FAIL: expected 2 fires, got " + presses);
process.exit(ok ? 0 : 1);
