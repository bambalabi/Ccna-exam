#!/usr/bin/env node
// DOM-free smoke test of the exam engine against the real question bank.
// Run: node scripts/test-exam-logic.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

// minimal DOM stub so the modules load and render outside a browser
function makeEl() {
  const el = {
    children: [],
    classList: {
      _set: new Set(),
      add(...c) { c.forEach((x) => this._set.add(x)); },
      remove(...c) { c.forEach((x) => this._set.delete(x)); },
      toggle(c, force) {
        const on = force === undefined ? !this._set.has(c) : force;
        on ? this._set.add(c) : this._set.delete(c);
      },
      contains(c) { return this._set.has(c); },
    },
    style: {},
    dataset: {},
    textContent: "",
    innerHTML: "",
    value: "",
    disabled: false,
    draggable: false,
    listeners: {},
    appendChild(c) { this.children.push(c); return c; },
    append(...cs) { this.children.push(...cs); },
    addEventListener(ev, fn) { (this.listeners[ev] = this.listeners[ev] || []).push(fn); },
    querySelector() { return makeEl(); },
    querySelectorAll() { return []; },
  };
  return el;
}

const elements = new Map();
const getEl = (id) => {
  if (!elements.has(id)) elements.set(id, makeEl());
  return elements.get(id);
};

const sandbox = {
  window: { addEventListener() {}, scrollTo() {} },
  document: {
    getElementById: getEl,
    createElement: () => makeEl(),
    querySelector: () => makeEl(),
    querySelectorAll: () => [],
    addEventListener() {},
  },
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  confirm: () => true,
  setInterval: () => 0,
  clearInterval() {},
  console,
};
sandbox.window.QUESTION_BANK = undefined;
sandbox.globalThis = sandbox;

const sources = [
  "data/questions-fundamentals.js",
  "data/questions-access.js",
  "data/questions-connectivity.js",
  "data/questions-services.js",
  "data/questions-security.js",
  "data/questions-automation.js",
  "js/storage.js",
  "js/timer.js",
  "js/scoring.js",
  "js/exam.js",
].map(read).join("\n");

const harness = `
function assert(cond, msg) { if (!cond) throw new Error("FAIL: " + msg); }
const bank = window.QUESTION_BANK;
assert(bank.length === 600, "bank should have 600 questions, has " + bank.length);

const { sampleQuestions, prepareQuestion } = Exam._internals;

// --- sampling: exact count, unique ids, sane domain proportions ---
for (const n of [10, 20, 33, 50, 100, 120]) {
  const sample = sampleQuestions(bank, n);
  assert(sample.length === n, n + "-question sample has " + sample.length);
  assert(new Set(sample.map((q) => q.id)).size === n, "duplicate ids in sample of " + n);
  const perDomain = {};
  sample.forEach((q) => (perDomain[q.domain] = (perDomain[q.domain] || 0) + 1));
  for (const [d, w] of Object.entries(Exam.DOMAIN_WEIGHTS)) {
    const expected = (n * w) / 100;
    const got = perDomain[d] || 0;
    assert(Math.abs(got - expected) <= 1, d + " in sample of " + n + ": got " + got + ", expected ~" + expected);
  }
}

// successive 100-question exams should differ (fresh random draw each time)
const a = sampleQuestions(bank, 100).map((q) => q.id).join(",");
const b = sampleQuestions(bank, 100).map((q) => q.id).join(",");
assert(a !== b, "two exams drew identical question sets in identical order");

// --- prepareQuestion: shuffled options/items keep answers pointing at the same content ---
for (const q of bank) {
  const p = prepareQuestion(q);
  if (q.type === "dragdrop") {
    assert(new Set(p.items).size === p.items.length, "dup items after shuffle " + q.id);
    q.targets.forEach((t, i) => {
      assert(p.targets[i] === t, "targets reordered " + q.id);
      assert(p.items[p.answer[i]] === q.items[q.answer[i]], "dd answer remap broken " + q.id);
    });
  } else {
    const origCorrect = q.answer.map((i) => q.options[i]).sort();
    const newCorrect = p.answer.map((i) => p.options[i]).sort();
    assert(JSON.stringify(origCorrect) === JSON.stringify(newCorrect), "answer remap broken " + q.id);
    assert(p.options.slice().sort().join("|") === q.options.slice().sort().join("|"), "options changed " + q.id);
  }
  assert(p.explanation === q.explanation && p.domain === q.domain, "metadata lost " + q.id);
}

// --- full exam flow with DOM stub: start renders without throwing ---
for (const mode of ["exam", "practice"]) {
  let finished = null;
  Exam.start({ count: 20, mode }, (bundle) => { finished = bundle; });
  assert(Exam.inProgress(), mode + ": exam should be in progress");
}

console.log("exam-logic tests passed: sampling, shuffling remap (600/600), render smoke (both modes)");
`;

new Function(
  "window", "document", "localStorage", "confirm", "setInterval", "clearInterval", "console",
  sources + harness
)(
  sandbox.window, sandbox.document, sandbox.localStorage, sandbox.confirm,
  sandbox.setInterval, sandbox.clearInterval, console
);
