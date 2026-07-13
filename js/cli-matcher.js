// IOS-style command matcher for CLI labs.
//
// Lab steps declare expected commands as a spec string of space-separated tokens:
//   - "conf(igure)"            keyword with allowed abbreviation: input must be a
//                              prefix of "configure" at least as long as "conf".
//   - "vlan", "10", "192.168.1.1"  bare tokens: exact match, case-insensitive.
//   - "{if=FastEthernet0/1}"   interface slot: matches "fastethernet0/1", "fa0/1",
//                              and the two-token form "fa 0/1" (type by >=2-char
//                              prefix of the canonical type, number part exact).
//
// The same file runs in the browser (window.CliMatcher) and under Node for the
// CI validator/tests (module.exports).
const CliMatcher = (() => {
  const KW_RE = /^([a-z0-9./:-]+)\(([a-z0-9-]+)\)$/i;
  const IF_RE = /^\{if=([A-Za-z-]+)([0-9][0-9/.]*)\}$/;
  const IF_ONE_TOKEN_RE = /^([a-z-]+)([0-9][0-9/.]*)$/;
  const IF_TYPE_RE = /^[a-z-]+$/;
  const MIN_IF_PREFIX = 2;

  const cache = new Map();

  function normalize(input) {
    return String(input).trim().replace(/\s+/g, " ").toLowerCase();
  }

  function tokenizeInput(input) {
    const norm = normalize(input);
    return norm ? norm.split(" ") : [];
  }

  function compile(spec) {
    if (typeof spec !== "string" || !spec.trim()) {
      throw new Error("empty command spec");
    }
    const tokens = spec.trim().split(/\s+/).map((raw) => {
      const kw = raw.match(KW_RE);
      if (kw) {
        const min = kw[1].toLowerCase();
        const full = (kw[1] + kw[2]).toLowerCase();
        return { kind: "kw", min, full };
      }
      const ifm = raw.match(IF_RE);
      if (ifm) {
        return {
          kind: "if",
          type: ifm[1].toLowerCase(),
          num: ifm[2],
          canonical: ifm[1] + ifm[2],
        };
      }
      if (raw.includes("(") || raw.includes(")") || raw.includes("{") || raw.includes("}")) {
        throw new Error(`malformed spec token "${raw}" in "${spec}"`);
      }
      return { kind: "lit", text: raw.toLowerCase() };
    });
    return { tokens };
  }

  function compiled(spec) {
    let c = cache.get(spec);
    if (!c) {
      c = compile(spec);
      cache.set(spec, c);
    }
    return c;
  }

  function ifTypeMatches(part, type) {
    return part.length >= MIN_IF_PREFIX && type.startsWith(part);
  }

  function matchFrom(inTokens, specTokens, i, s) {
    if (s === specTokens.length) return i === inTokens.length;
    if (i >= inTokens.length) return false;
    const tok = specTokens[s];

    if (tok.kind === "kw") {
      const w = inTokens[i];
      return w.length >= tok.min.length && tok.full.startsWith(w) &&
        matchFrom(inTokens, specTokens, i + 1, s + 1);
    }

    if (tok.kind === "lit") {
      return inTokens[i] === tok.text && matchFrom(inTokens, specTokens, i + 1, s + 1);
    }

    // interface slot: one-token ("fa0/1") or two-token ("fa 0/1") form
    const one = inTokens[i].match(IF_ONE_TOKEN_RE);
    if (one && ifTypeMatches(one[1], tok.type) && one[2] === tok.num &&
        matchFrom(inTokens, specTokens, i + 1, s + 1)) {
      return true;
    }
    if (IF_TYPE_RE.test(inTokens[i]) && ifTypeMatches(inTokens[i], tok.type) &&
        i + 1 < inTokens.length && inTokens[i + 1] === tok.num &&
        matchFrom(inTokens, specTokens, i + 2, s + 1)) {
      return true;
    }
    return false;
  }

  function matches(input, spec) {
    const inTokens = tokenizeInput(input);
    if (!inTokens.length) return false;
    return matchFrom(inTokens, compiled(spec).tokens, 0, 0);
  }

  function canonical(spec) {
    return compiled(spec).tokens.map((tok) => {
      if (tok.kind === "kw") return tok.full;
      if (tok.kind === "if") return tok.canonical;
      return tok.text;
    }).join(" ");
  }

  return { normalize, compile, matches, canonical };
})();

if (typeof window !== "undefined") window.CliMatcher = CliMatcher;
if (typeof module !== "undefined" && module.exports) module.exports = CliMatcher;
