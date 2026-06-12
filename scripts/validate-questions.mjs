#!/usr/bin/env node
// Validates the question bank data files. Run: node scripts/validate-questions.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const EXPECTED = [
  { file: "questions-fundamentals.js", domain: "Network Fundamentals", prefix: "nf-", count: 120 },
  { file: "questions-access.js", domain: "Network Access", prefix: "na-", count: 120 },
  { file: "questions-connectivity.js", domain: "IP Connectivity", prefix: "conn-", count: 150 },
  { file: "questions-services.js", domain: "IP Services", prefix: "ips-", count: 60 },
  { file: "questions-security.js", domain: "Security Fundamentals", prefix: "sec-", count: 90 },
  { file: "questions-automation.js", domain: "Automation and Programmability", prefix: "auto-", count: 60 },
];

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

function loadFile(file) {
  const full = path.join(root, "data", file);
  if (!fs.existsSync(full)) {
    err(`${file}: file missing`);
    return [];
  }
  const window = { QUESTION_BANK: [] };
  try {
    const src = fs.readFileSync(full, "utf8");
    new Function("window", src)(window);
  } catch (e) {
    err(`${file}: failed to evaluate — ${e.message}`);
    return [];
  }
  return window.QUESTION_BANK;
}

const allIds = new Set();
const allTexts = new Map();
let grandTotal = 0;
const typeTotals = { single: 0, multi: 0, dragdrop: 0 };

for (const spec of EXPECTED) {
  const qs = loadFile(spec.file);
  grandTotal += qs.length;
  if (qs.length !== spec.count) {
    err(`${spec.file}: expected ${spec.count} questions, found ${qs.length}`);
  }

  qs.forEach((q, i) => {
    const where = `${spec.file}[${i}] (${q.id || "no id"})`;

    if (!q.id || typeof q.id !== "string") err(`${where}: missing id`);
    else {
      if (!q.id.startsWith(spec.prefix)) err(`${where}: id should start with "${spec.prefix}"`);
      if (allIds.has(q.id)) err(`${where}: duplicate id`);
      allIds.add(q.id);
    }

    if (q.domain !== spec.domain) err(`${where}: domain should be "${spec.domain}", got "${q.domain}"`);

    if (!["single", "multi", "dragdrop"].includes(q.type)) {
      err(`${where}: invalid type "${q.type}"`);
      return;
    }
    typeTotals[q.type]++;

    if (!q.question || typeof q.question !== "string" || q.question.trim().length < 15) {
      err(`${where}: question text missing or too short`);
    } else {
      const norm = q.question.trim().toLowerCase();
      if (allTexts.has(norm)) err(`${where}: duplicate question text of ${allTexts.get(norm)}`);
      else allTexts.set(norm, q.id);
    }

    if (q.exhibit !== undefined && typeof q.exhibit !== "string") err(`${where}: exhibit must be a string`);
    if (q.question && q.question.includes("Refer to the exhibit") && !q.exhibit) {
      err(`${where}: says "Refer to the exhibit" but has no exhibit`);
    }

    if (!Array.isArray(q.answer) || q.answer.length === 0) {
      err(`${where}: answer must be a non-empty array`);
      return;
    }

    if (q.type === "dragdrop") {
      if (!Array.isArray(q.items) || !Array.isArray(q.targets)) {
        err(`${where}: dragdrop needs items[] and targets[]`);
        return;
      }
      if (q.items.length < 3 || q.items.length > 8) warn(`${where}: unusual dragdrop size ${q.items.length}`);
      if (q.items.length !== q.targets.length || q.answer.length !== q.items.length) {
        err(`${where}: items/targets/answer lengths differ (${q.items.length}/${q.targets.length}/${q.answer.length})`);
        return;
      }
      const sorted = q.answer.slice().sort((a, b) => a - b);
      if (!sorted.every((v, idx) => v === idx)) {
        err(`${where}: dragdrop answer must be a permutation of 0..${q.items.length - 1}`);
      }
      if (new Set(q.items.map((s) => String(s).trim().toLowerCase())).size !== q.items.length) {
        err(`${where}: duplicate drag items`);
      }
    } else {
      if (!Array.isArray(q.options) || q.options.length < 4 || q.options.length > 6) {
        err(`${where}: options must have 4-6 entries, got ${Array.isArray(q.options) ? q.options.length : "none"}`);
        return;
      }
      if (new Set(q.options.map((s) => String(s).trim().toLowerCase())).size !== q.options.length) {
        err(`${where}: duplicate options`);
      }
      for (const a of q.answer) {
        if (!Number.isInteger(a) || a < 0 || a >= q.options.length) err(`${where}: answer index ${a} out of range`);
      }
      if (new Set(q.answer).size !== q.answer.length) err(`${where}: duplicate answer indices`);
      if (q.type === "single" && q.answer.length !== 1) err(`${where}: single must have exactly 1 answer`);
      if (q.type === "multi") {
        if (q.answer.length < 2 || q.answer.length > 3) err(`${where}: multi must have 2-3 answers`);
        const m = q.question.match(/\(Choose (two|three)\.\)\s*$/);
        if (!m) err(`${where}: multi question must end with "(Choose two.)" or "(Choose three.)"`);
        else {
          const expected = m[1] === "two" ? 2 : 3;
          if (q.answer.length !== expected) err(`${where}: says "Choose ${m[1]}" but has ${q.answer.length} answers`);
        }
      }
    }

    if (!q.explanation || typeof q.explanation !== "string" || q.explanation.trim().length < 80) {
      err(`${where}: explanation missing or too short (<80 chars)`);
    }
  });
}

console.log(`Total questions: ${grandTotal}`);
console.log(`Types: single=${typeTotals.single} multi=${typeTotals.multi} dragdrop=${typeTotals.dragdrop}`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.slice(0, 30).forEach((w) => console.log("  WARN " + w));
}
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  errors.slice(0, 80).forEach((e) => console.error("  ERR  " + e));
  if (errors.length > 80) console.error(`  ... and ${errors.length - 80} more`);
  process.exit(1);
}
console.log("\nAll checks passed.");
