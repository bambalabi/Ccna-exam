#!/usr/bin/env node
// Validates the CLI lab data files, compiling every command spec with the
// real matcher so DSL typos fail CI instead of users.
// Run: node scripts/validate-labs.mjs
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CliMatcher = require(path.join(root, "js", "cli-matcher.js"));

const EXPECTED = [
  { file: "labs-fundamentals.js", domain: "Network Fundamentals", prefix: "lf-", count: 1 },
  { file: "labs-access.js", domain: "Network Access", prefix: "la-", count: 6 },
  { file: "labs-connectivity.js", domain: "IP Connectivity", prefix: "lc-", count: 5 },
  { file: "labs-services.js", domain: "IP Services", prefix: "li-", count: 4 },
  { file: "labs-security.js", domain: "Security Fundamentals", prefix: "ls-", count: 3 },
];

const MODES = [
  "user", "priv", "config", "config-if", "config-if-range",
  "config-vlan", "config-line", "config-router", "dhcp-config",
];

const errors = [];
const err = (m) => errors.push(m);

function loadFile(file) {
  const full = path.join(root, "data", file);
  if (!fs.existsSync(full)) {
    err(`${file}: file missing`);
    return [];
  }
  const window = { LAB_BANK: [] };
  try {
    const src = fs.readFileSync(full, "utf8");
    new Function("window", src)(window);
  } catch (e) {
    err(`${file}: failed to evaluate — ${e.message}`);
    return [];
  }
  return window.LAB_BANK;
}

function checkSpec(where, spec) {
  try {
    CliMatcher.compile(spec);
  } catch (e) {
    err(`${where}: bad command spec "${spec}" — ${e.message}`);
  }
}

function checkModes(where, mode) {
  const modes = Array.isArray(mode) ? mode : [mode];
  if (!modes.length) err(`${where}: empty mode`);
  modes.forEach((m) => {
    if (!MODES.includes(m)) err(`${where}: unknown mode "${m}"`);
  });
}

function checkTask(where, task) {
  if (!task.label || task.label.trim().length < 5) err(`${where}: label missing or too short`);
  if (!Array.isArray(task.accept) || !task.accept.length) {
    err(`${where}: accept must be a non-empty array`);
  } else {
    task.accept.forEach((spec) => checkSpec(where, spec));
  }
  if (task.mode === undefined) err(`${where}: missing mode`);
  else checkModes(where, task.mode);
  if (task.setsMode !== undefined && !MODES.includes(task.setsMode)) {
    err(`${where}: unknown setsMode "${task.setsMode}"`);
  }
  if (!Array.isArray(task.hints) || !task.hints.length) err(`${where}: needs at least 1 hint`);
  if (!task.explanation || task.explanation.trim().length < 40) {
    err(`${where}: explanation missing or too short (<40 chars)`);
  }
}

const allIds = new Set();
let grandTotal = 0;
const typeTotals = { config: 0, troubleshoot: 0 };

for (const spec of EXPECTED) {
  const labs = loadFile(spec.file);
  grandTotal += labs.length;
  if (labs.length !== spec.count) {
    err(`${spec.file}: expected ${spec.count} labs, found ${labs.length}`);
  }

  labs.forEach((lab, i) => {
    const where = `${spec.file}[${i}] (${lab.id || "no id"})`;

    if (!lab.id || typeof lab.id !== "string") err(`${where}: missing id`);
    else {
      if (!lab.id.startsWith(spec.prefix)) err(`${where}: id should start with "${spec.prefix}"`);
      if (allIds.has(lab.id)) err(`${where}: duplicate id`);
      allIds.add(lab.id);
    }

    if (lab.domain !== spec.domain) err(`${where}: domain should be "${spec.domain}", got "${lab.domain}"`);
    if (!["config", "troubleshoot"].includes(lab.type)) {
      err(`${where}: invalid type "${lab.type}"`);
      return;
    }
    typeTotals[lab.type]++;

    if (!lab.title || lab.title.trim().length < 8) err(`${where}: title missing or too short`);
    if (!lab.scenario || lab.scenario.trim().length < 80) err(`${where}: scenario too short (<80 chars)`);
    if (![1, 2, 3].includes(lab.difficulty)) err(`${where}: difficulty must be 1-3`);
    if (!lab.device || !lab.device.hostname) err(`${where}: device.hostname missing`);
    if (!lab.device || !MODES.includes(lab.device.startMode)) err(`${where}: invalid device.startMode`);
    if (!lab.completion || lab.completion.trim().length < 30) err(`${where}: completion text too short`);

    (lab.outputs || []).forEach((o, j) => {
      const ow = `${where} outputs[${j}]`;
      if (!o.cmd) err(`${ow}: missing cmd`);
      else checkSpec(ow, o.cmd);
      if (typeof o.pre !== "string" || !o.pre.trim()) err(`${ow}: pre output missing`);
      if (o.post !== undefined && o.post !== null && typeof o.post !== "string") {
        err(`${ow}: post must be a string or null`);
      }
    });

    if (lab.type === "config") {
      if (!Array.isArray(lab.steps) || lab.steps.length < 3) {
        err(`${where}: config lab needs at least 3 steps`);
        return;
      }
      lab.steps.forEach((s, j) => checkTask(`${where} steps[${j}]`, s));
    } else {
      if (!Array.isArray(lab.fix) || !lab.fix.length) err(`${where}: troubleshoot lab needs at least 1 fix goal`);
      else lab.fix.forEach((g, j) => checkTask(`${where} fix[${j}]`, g));
      if (!Array.isArray(lab.outputs) || lab.outputs.length < 2) {
        err(`${where}: troubleshoot lab needs at least 2 outputs`);
      }
      (lab.diagnosis || []).forEach((d, j) => {
        const dw = `${where} diagnosis[${j}]`;
        if (!d.label || d.label.trim().length < 5) err(`${dw}: label missing or too short`);
        if (!d.cmd) err(`${dw}: missing cmd`);
        else checkSpec(dw, d.cmd);
      });
    }
  });
}

console.log(`Total labs: ${grandTotal} (config=${typeTotals.config} troubleshoot=${typeTotals.troubleshoot})`);
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  errors.slice(0, 80).forEach((e) => console.error("  ERR  " + e));
  process.exit(1);
}
console.log("All checks passed.");
