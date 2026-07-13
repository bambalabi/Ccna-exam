#!/usr/bin/env node
// Table-driven tests for the CLI lab command matcher.
// Run: node scripts/test-cli-matcher.mjs
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CliMatcher = require(path.join(root, "js", "cli-matcher.js"));

let failures = 0;
function check(name, actual, expected) {
  if (actual !== expected) {
    failures++;
    console.error(`FAIL ${name}: expected ${expected}, got ${actual}`);
  }
}

// --- keyword abbreviations ---
const CONF_T = "conf(igure) t(erminal)";
check("full form", CliMatcher.matches("configure terminal", CONF_T), true);
check("classic abbrev", CliMatcher.matches("conf t", CONF_T), true);
check("partial abbrev", CliMatcher.matches("config term", CONF_T), true);
check("too short first", CliMatcher.matches("con t", CONF_T), false);
check("overshoot", CliMatcher.matches("configureX terminal", CONF_T), false);
check("extra trailing token", CliMatcher.matches("conf t now", CONF_T), false);
check("missing token", CliMatcher.matches("conf", CONF_T), false);

check("enable full", CliMatcher.matches("enable", "en(able)"), true);
check("enable short", CliMatcher.matches("en", "en(able)"), true);
check("enable too short", CliMatcher.matches("e", "en(able)"), false);

// --- case + whitespace normalization ---
check("case insensitive", CliMatcher.matches("CONF T", CONF_T), true);
check("extra spaces", CliMatcher.matches("  conf    t  ", CONF_T), true);
check("empty input", CliMatcher.matches("", CONF_T), false);
check("blank input", CliMatcher.matches("   ", CONF_T), false);

// --- literal tokens ---
const VLAN10 = "vlan 10";
check("literal match", CliMatcher.matches("vlan 10", VLAN10), true);
check("wrong vlan id", CliMatcher.matches("vlan 20", VLAN10), false);
check("literal no abbrev", CliMatcher.matches("vla 10", VLAN10), false);

const SW_ACC = "sw(itchport) acc(ess) vlan 10";
check("switchport abbrev", CliMatcher.matches("sw acc vlan 10", SW_ACC), true);
check("switchport full", CliMatcher.matches("switchport access vlan 10", SW_ACC), true);
check("switchport mixed", CliMatcher.matches("swi access vlan 10", SW_ACC), true);
check("wrong keyword", CliMatcher.matches("sw mode vlan 10", SW_ACC), false);

// --- ip address style literals ---
const IP_ADDR = "ip add(ress) 192.168.10.1 255.255.255.0";
check("ip address full", CliMatcher.matches("ip address 192.168.10.1 255.255.255.0", IP_ADDR), true);
check("ip add abbrev", CliMatcher.matches("ip add 192.168.10.1 255.255.255.0", IP_ADDR), true);
check("wrong mask", CliMatcher.matches("ip add 192.168.10.1 255.255.0.0", IP_ADDR), false);

// --- interface slot ---
const INT_FA = "int(erface) {if=FastEthernet0/1}";
check("if full", CliMatcher.matches("interface fastethernet0/1", INT_FA), true);
check("if fa0/1", CliMatcher.matches("int fa0/1", INT_FA), true);
check("if fas0/1", CliMatcher.matches("int fas0/1", INT_FA), true);
check("if two-token", CliMatcher.matches("int fa 0/1", INT_FA), true);
check("if two-token full", CliMatcher.matches("interface fastethernet 0/1", INT_FA), true);
check("if 1-char type", CliMatcher.matches("int f0/1", INT_FA), false);
check("if wrong number", CliMatcher.matches("int fa0/2", INT_FA), false);
check("if wrong type", CliMatcher.matches("int gi0/1", INT_FA), false);
check("if missing number", CliMatcher.matches("int fa", INT_FA), false);

const INT_GI = "int(erface) {if=GigabitEthernet0/1}";
check("gi abbrev", CliMatcher.matches("int gi0/1", INT_GI), true);
check("gig two-token", CliMatcher.matches("int gig 0/1", INT_GI), true);

const INT_PO = "int(erface) {if=Port-channel1}";
check("po abbrev", CliMatcher.matches("int po1", INT_PO), true);
check("port-channel full", CliMatcher.matches("interface port-channel 1", INT_PO), true);

// --- interface slot mid-command ---
const NO_SHUT_ON = "sh(ow) int(erfaces) {if=GigabitEthernet0/1} switchport";
check("if mid-command", CliMatcher.matches("show interfaces gi0/1 switchport", NO_SHUT_ON), true);
check("if mid two-token", CliMatcher.matches("sh int gi 0/1 switchport", NO_SHUT_ON), true);
check("if mid trailing missing", CliMatcher.matches("sh int gi0/1", NO_SHUT_ON), false);

// --- interface range style (literal dash) ---
const RANGE = "int(erface) r(ange) {if=FastEthernet0/1} - 2";
check("range full", CliMatcher.matches("interface range fastethernet 0/1 - 2", RANGE), true);
check("range abbrev", CliMatcher.matches("int r fa0/1 - 2", RANGE), true);
check("range missing dash", CliMatcher.matches("int r fa0/1 2", RANGE), false);

// --- canonical expansion ---
check("canonical conf t", CliMatcher.canonical(CONF_T), "configure terminal");
check("canonical if", CliMatcher.canonical(INT_FA), "interface FastEthernet0/1");
check("canonical mixed", CliMatcher.canonical(SW_ACC), "switchport access vlan 10");

// --- compile errors on malformed DSL ---
function throws(name, fn) {
  try {
    fn();
    failures++;
    console.error(`FAIL ${name}: expected compile to throw`);
  } catch (e) { /* expected */ }
}
throws("empty spec", () => CliMatcher.compile(""));
throws("unbalanced paren", () => CliMatcher.compile("conf(igure t"));
throws("bad brace token", () => CliMatcher.compile("int {iface=Fa0/1}"));
throws("stray brace", () => CliMatcher.compile("vlan {10}"));

if (failures) {
  console.error(`\n${failures} matcher test(s) failed.`);
  process.exit(1);
}
console.log("cli-matcher tests passed: abbreviations, normalization, literals, interface slots, canonical, compile errors");
