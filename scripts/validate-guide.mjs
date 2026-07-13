#!/usr/bin/env node
// Validates the study guide data files. Run: node scripts/validate-guide.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const EXPECTED = [
  { file: "guide-fundamentals.js", domain: "Network Fundamentals", prefix: "gf-", count: 4 },
  { file: "guide-access.js", domain: "Network Access", prefix: "ga-", count: 5 },
  { file: "guide-connectivity.js", domain: "IP Connectivity", prefix: "gc-", count: 4 },
];

const errors = [];
const err = (m) => errors.push(m);

function loadFile(file) {
  const full = path.join(root, "data", file);
  if (!fs.existsSync(full)) {
    err(`${file}: file missing`);
    return [];
  }
  const window = { GUIDE_BANK: [] };
  try {
    const src = fs.readFileSync(full, "utf8");
    new Function("window", src)(window);
  } catch (e) {
    err(`${file}: failed to evaluate — ${e.message}`);
    return [];
  }
  return window.GUIDE_BANK;
}

const allIds = new Set();
let grandTotal = 0;

for (const spec of EXPECTED) {
  const topics = loadFile(spec.file);
  grandTotal += topics.length;
  if (topics.length !== spec.count) {
    err(`${spec.file}: expected ${spec.count} topics, found ${topics.length}`);
  }

  topics.forEach((t, i) => {
    const where = `${spec.file}[${i}] (${t.id || "no id"})`;

    if (!t.id || typeof t.id !== "string") err(`${where}: missing id`);
    else {
      if (!t.id.startsWith(spec.prefix)) err(`${where}: id should start with "${spec.prefix}"`);
      if (allIds.has(t.id)) err(`${where}: duplicate id`);
      allIds.add(t.id);
    }

    if (t.domain !== spec.domain) err(`${where}: domain should be "${spec.domain}", got "${t.domain}"`);
    if (!t.title || typeof t.title !== "string" || t.title.trim().length < 8) err(`${where}: title missing or too short`);
    if (!t.blueprint || typeof t.blueprint !== "string" || !/^\d\.\d+/.test(t.blueprint)) {
      err(`${where}: blueprint must reference an exam topic number like "2.1 ..."`);
    }

    if (!Array.isArray(t.overview) || t.overview.length < 1) {
      err(`${where}: overview must have at least 1 paragraph`);
    } else {
      t.overview.forEach((p, j) => {
        if (typeof p !== "string" || p.trim().length < 60) err(`${where}: overview[${j}] too short (<60 chars)`);
      });
    }

    if (!Array.isArray(t.configs) || t.configs.length < 1) {
      err(`${where}: needs at least 1 config block`);
    } else {
      t.configs.forEach((c, j) => {
        const cw = `${where} configs[${j}]`;
        if (!c.title) err(`${cw}: missing title`);
        if (!c.cli || typeof c.cli !== "string" || !c.cli.trim()) err(`${cw}: missing cli text`);
        if (c.notes !== undefined && !Array.isArray(c.notes)) err(`${cw}: notes must be an array`);
      });
      // Topics must show real commands: an IOS (config...)# prompt, or client-OS
      // shell prompts for the client-verification topics.
      const hasPrompt = t.configs.some((c) =>
        typeof c.cli === "string" && /(\(config[^)]*\)#|C:\\>|^\$ |\n\$ |^% |\n% )/.test(c.cli));
      if (!hasPrompt) err(`${where}: no config block shows a config or shell prompt`);
    }

    if (!Array.isArray(t.verify) || t.verify.length < 2) {
      err(`${where}: needs at least 2 verify entries`);
    } else {
      t.verify.forEach((v, j) => {
        const vw = `${where} verify[${j}]`;
        if (!v.cmd || !/^(show|debug|ping|traceroute)/.test(v.cmd)) err(`${vw}: cmd should start with show/debug/ping/traceroute`);
        if (!v.what || v.what.trim().length < 30) err(`${vw}: 'what' too short (<30 chars)`);
      });
    }

    if (!Array.isArray(t.troubleshooting) || t.troubleshooting.length < 2) {
      err(`${where}: needs at least 2 troubleshooting rows`);
    } else {
      t.troubleshooting.forEach((r, j) => {
        const rw = `${where} troubleshooting[${j}]`;
        if (!r.symptom || r.symptom.trim().length < 15) err(`${rw}: symptom missing or too short`);
        if (!Array.isArray(r.causes) || r.causes.length < 1) err(`${rw}: causes must be a non-empty array`);
        if (!r.fix || r.fix.trim().length < 30) err(`${rw}: fix too short (<30 chars)`);
      });
    }

    if (t.tips !== undefined && !Array.isArray(t.tips)) err(`${where}: tips must be an array`);
  });
}

console.log(`Total guide topics: ${grandTotal}`);
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  errors.slice(0, 80).forEach((e) => console.error("  ERR  " + e));
  process.exit(1);
}
console.log("All checks passed.");
