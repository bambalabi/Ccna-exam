// Interactive CLI labs: lab list + simulated IOS terminal engine.
const Labs = (() => {
  const $ = (id) => document.getElementById(id);

  const DOMAIN_ORDER = [
    "Network Fundamentals",
    "Network Access",
    "IP Connectivity",
    "IP Services",
    "Security Fundamentals",
  ];

  const MODE_SUFFIX = {
    user: ">",
    priv: "#",
    config: "(config)#",
    "config-if": "(config-if)#",
    "config-if-range": "(config-if-range)#",
    "config-vlan": "(config-vlan)#",
    "config-line": "(config-line)#",
    "config-router": "(config-router)#",
    "dhcp-config": "(dhcp-config)#",
  };
  const CONFIG_MODES = new Set(
    Object.keys(MODE_SUFFIX).filter((m) => m !== "user" && m !== "priv")
  );
  const IF_TYPES = [
    ["fastethernet", "FastEthernet"],
    ["gigabitethernet", "GigabitEthernet"],
    ["tengigabitethernet", "TenGigabitEthernet"],
    ["port-channel", "Port-channel"],
    ["loopback", "Loopback"],
    ["serial", "Serial"],
    ["vlan", "Vlan"],
    ["ethernet", "Ethernet"],
  ];
  const INVALID = "% Invalid input detected at '^' marker.";

  let state = null;

  // ---------- helpers ----------
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function showView(view) {
    $("labs-list-view").classList.toggle("hidden", view !== "list");
    $("labs-run-view").classList.toggle("hidden", view !== "run");
    window.scrollTo({ top: 0 });
  }

  function prompt() {
    return state.lab.device.hostname + MODE_SUFFIX[state.mode];
  }

  function print(text, cls) {
    const scroll = $("term-scroll");
    const line = el("span", cls ? "term-line " + cls : "term-line", text + "\n");
    scroll.appendChild(line);
    scroll.scrollTop = scroll.scrollHeight;
  }

  function updatePrompt() {
    $("term-prompt").textContent = prompt();
  }

  function canonicalizeInterface(text) {
    const m = String(text).replace(/\s+/g, "").match(/^([a-z-]+)([0-9][0-9/.]*)$/);
    if (!m) return null;
    // First letters in IF_TYPES are unique, so 1-char prefixes resolve unambiguously.
    const type = IF_TYPES.find(([lc]) => lc.startsWith(m[1]));
    return type ? type[1] + m[2] : null;
  }

  // ---------- lab list ----------
  function renderList() {
    const bank = window.LAB_BANK || [];
    const progress = Storage.getLabProgress();
    const listEl = $("labs-list");
    listEl.innerHTML = "";

    const byDomain = new Map();
    bank.forEach((lab) => {
      if (!byDomain.has(lab.domain)) byDomain.set(lab.domain, []);
      byDomain.get(lab.domain).push(lab);
    });

    DOMAIN_ORDER.forEach((domain) => {
      const labs = byDomain.get(domain);
      if (!labs || !labs.length) return;
      listEl.appendChild(el("h3", "guide-domain-heading", domain));
      const grid = el("div", "guide-grid");
      labs.forEach((lab) => {
        const done = !!progress[lab.id];
        const card = el("button", "guide-card lab-card" + (done ? " read" : ""));
        card.type = "button";
        card.dataset.labId = lab.id;
        card.appendChild(el("span", "guide-card-title", lab.title));
        const meta = el("span", "lab-card-meta");
        meta.appendChild(el("span", "lab-type-pill " + lab.type,
          lab.type === "config" ? "Config" : "Troubleshoot"));
        meta.appendChild(el("span", "lab-difficulty",
          "★".repeat(lab.difficulty) + "☆".repeat(3 - lab.difficulty)));
        card.appendChild(meta);
        if (done) card.appendChild(el("span", "guide-card-check", "✓ completed"));
        grid.appendChild(card);
      });
      listEl.appendChild(grid);
    });

    const doneCount = bank.filter((lab) => !!progress[lab.id]).length;
    $("labs-progress-info").textContent =
      `${bank.length} hands-on labs in a simulated IOS terminal: guided configuration ` +
      `and troubleshooting scenarios. ${doneCount} of ${bank.length} completed on this device.`;

    showView("list");
  }

  // ---------- lab session ----------
  function start(labId) {
    const lab = (window.LAB_BANK || []).find((l) => l.id === labId);
    if (!lab) return;

    state = {
      lab,
      mode: lab.device.startMode,
      currentInterface: null,
      stepsDone: (lab.steps || []).map(() => false),
      goalsDone: (lab.fix || []).map(() => false),
      diagDone: (lab.diagnosis || []).map(() => false),
      failCount: 0,
      totalAttempts: 0,
      hintIdx: 0,
      history: [],
      histPos: 0,
      completed: false,
    };

    $("lab-title").textContent = lab.title;
    $("lab-scenario").textContent = lab.scenario;
    $("lab-hint-box").classList.add("hidden");
    $("lab-hint-box").textContent = "";
    $("term-scroll").innerHTML = "";
    $("term-input").value = "";

    print(`*** Connected to ${lab.device.hostname} (console) ***`, "term-line-ok");
    print("");
    renderChecklist();
    updatePrompt();
    showView("run");
    $("term-input").focus();
  }

  function renderChecklist() {
    const list = $("lab-checklist");
    list.innerHTML = "";
    const lab = state.lab;

    if (lab.type === "config") {
      const currentIdx = state.stepsDone.indexOf(false);
      lab.steps.forEach((step, i) => {
        const li = el("li", null, step.label);
        if (state.stepsDone[i]) li.classList.add("done");
        else if (i === currentIdx) li.classList.add("current");
        list.appendChild(li);
      });
    } else {
      (lab.diagnosis || []).forEach((d, i) => {
        const li = el("li", null, "Investigate: " + d.label);
        if (state.diagDone[i]) li.classList.add("done");
        list.appendChild(li);
      });
      lab.fix.forEach((goal, i) => {
        const li = el("li", null, "Fix: " + goal.label);
        if (state.goalsDone[i]) li.classList.add("done");
        else if (!state.goalsDone.slice(0, i).includes(false)) li.classList.add("current");
        list.appendChild(li);
      });
    }
  }

  // Current learning target: the step/goal hints and answers refer to.
  function currentTarget() {
    const lab = state.lab;
    if (lab.type === "config") {
      const idx = state.stepsDone.indexOf(false);
      return idx === -1 ? null : lab.steps[idx];
    }
    const idx = state.goalsDone.indexOf(false);
    return idx === -1 ? null : lab.fix[idx];
  }

  function isDoneAll() {
    return state.lab.type === "config"
      ? state.stepsDone.every(Boolean)
      : state.goalsDone.every(Boolean);
  }

  function modeAllowed(stepMode) {
    const modes = Array.isArray(stepMode) ? stepMode : [stepMode];
    return modes.includes(state.mode);
  }

  function acceptsInput(entry, input) {
    return entry.accept.some((spec) => CliMatcher.matches(input, spec));
  }

  // Candidate config steps: the current one, plus contiguous not-done
  // steps sharing its orderFree group.
  function candidateSteps() {
    const steps = state.lab.steps || [];
    const idx = state.stepsDone.indexOf(false);
    if (idx === -1) return [];
    const out = [{ step: steps[idx], i: idx }];
    const group = steps[idx].group;
    if (group) {
      for (let j = idx + 1; j < steps.length && steps[j].group === group; j++) {
        if (!state.stepsDone[j]) out.push({ step: steps[j], i: j });
      }
    }
    return out;
  }

  function applyStepEffects(step, input) {
    if (step.setsMode) state.mode = step.setsMode;
    // Track the interface for interface-entering steps.
    const tokens = CliMatcher.normalize(input).split(" ");
    if (tokens.length >= 2 && "interface".startsWith(tokens[0]) && tokens[0].length >= 3) {
      if ("range".startsWith(tokens[1])) state.currentInterface = null;
      else state.currentInterface = canonicalizeInterface(tokens.slice(1).join(""));
    }
  }

  function onProgress() {
    state.failCount = 0;
    state.hintIdx = 0;
    $("lab-hint-box").classList.add("hidden");
    renderChecklist();
    if (!state.completed && isDoneAll()) {
      state.completed = true;
      print("");
      print("*** Lab complete ***", "term-line-ok");
      print(state.lab.completion, "term-line-ok");
      Storage.markLabComplete(state.lab.id, state.totalAttempts);
    }
  }

  // ---------- built-in navigation ----------
  function tryNavigation(input) {
    const tokens = CliMatcher.normalize(input).split(" ");

    if (CliMatcher.matches(input, "en(able)")) {
      if (state.mode === "user") { state.mode = "priv"; return true; }
      if (state.mode === "priv") return true;
      return false;
    }
    if (CliMatcher.matches(input, "disable")) {
      if (state.mode === "priv") { state.mode = "user"; return true; }
      return false;
    }
    if (CliMatcher.matches(input, "conf(igure) t(erminal)")) {
      if (state.mode === "priv") {
        state.mode = "config";
        print("Enter configuration commands, one per line.  End with CNTL/Z.");
        return true;
      }
      return false;
    }
    if (CliMatcher.matches(input, "exit")) {
      if (state.mode === "config") state.mode = "priv";
      else if (CONFIG_MODES.has(state.mode)) {
        state.mode = "config";
        state.currentInterface = null;
      } else if (state.mode === "priv") state.mode = "user";
      return true;
    }
    if (CliMatcher.matches(input, "end")) {
      if (CONFIG_MODES.has(state.mode)) {
        state.mode = "priv";
        state.currentInterface = null;
        return true;
      }
      return false;
    }
    // generic "interface <if>" / "interface range ..." navigation
    if (tokens.length >= 2 && tokens[0].length >= 3 && "interface".startsWith(tokens[0]) &&
        CONFIG_MODES.has(state.mode)) {
      if ("range".startsWith(tokens[1]) && tokens.length >= 3) {
        state.mode = "config-if-range";
        state.currentInterface = null;
        return true;
      }
      const canon = canonicalizeInterface(tokens.slice(1).join(""));
      if (canon) {
        state.mode = "config-if";
        state.currentInterface = canon;
        return true;
      }
    }
    // other generic mode-entering commands (from global config)
    if (CONFIG_MODES.has(state.mode)) {
      if (tokens.length === 3 && tokens[0] === "router" && "ospf".startsWith(tokens[1]) &&
          /^\d+$/.test(tokens[2])) {
        state.mode = "config-router";
        state.currentInterface = null;
        return true;
      }
      if (tokens.length >= 2 && tokens[0] === "line") {
        state.mode = "config-line";
        state.currentInterface = null;
        return true;
      }
      if (tokens.length === 2 && tokens[0] === "vlan" && /^\d+$/.test(tokens[1])) {
        state.mode = "config-vlan";
        state.currentInterface = null;
        return true;
      }
    }
    return false;
  }

  // ---------- canned outputs ----------
  function findOutput(input) {
    return (state.lab.outputs || []).find((o) => CliMatcher.matches(input, o.cmd));
  }

  function printOutput(entry) {
    const text = isDoneAll() && entry.post !== undefined && entry.post !== null
      ? entry.post
      : entry.pre;
    print(text);
  }

  function tickDiagnosis(input) {
    (state.lab.diagnosis || []).forEach((d, i) => {
      if (!state.diagDone[i] && CliMatcher.matches(input, d.cmd)) {
        state.diagDone[i] = true;
      }
    });
    renderChecklist();
  }

  // ---------- main dispatch ----------
  function handleLine(raw) {
    const input = raw.trim();
    print(prompt() + " " + raw, "term-line-cmd");
    if (!input) { updatePrompt(); return; }

    state.history.push(raw);
    state.histPos = state.history.length;

    // "do <exec command>" inside config modes
    let execInput = input;
    let isDo = false;
    if (CONFIG_MODES.has(state.mode) && /^do\s+/i.test(input)) {
      execInput = input.replace(/^do\s+/i, "");
      isDo = true;
    }

    const lab = state.lab;

    // 1. config-lab steps (current + orderFree group mates)
    if (lab.type === "config" && !state.completed) {
      const wrongMode = [];
      for (const { step, i } of candidateSteps()) {
        if (acceptsInput(step, input)) {
          if (modeAllowed(step.mode)) {
            state.totalAttempts++;
            if (step.requiresInterface && state.currentInterface !== step.requiresInterface) {
              // Accepted by IOS, but issued on the wrong interface: no tick.
              registerFailure();
              updatePrompt();
              return;
            }
            state.stepsDone[i] = true;
            applyStepEffects(step, input);
            if (step.response) print(step.response);
            onProgress();
            updatePrompt();
            return;
          }
          wrongMode.push(step);
        }
      }
      if (wrongMode.length) {
        state.totalAttempts++;
        print(INVALID, "term-line-err");
        print(`% "${input}" is correct, but not from ${MODE_SUFFIX[state.mode]} mode.`, "term-line-err");
        registerFailure();
        updatePrompt();
        return;
      }
    }

    // 2. troubleshoot-lab fix goals (any order)
    if (lab.type === "troubleshoot" && !state.completed) {
      for (let i = 0; i < (lab.fix || []).length; i++) {
        const goal = lab.fix[i];
        if (!state.goalsDone[i] && acceptsInput(goal, input) && modeAllowed(goal.mode)) {
          state.totalAttempts++;
          if (goal.requiresInterface && state.currentInterface !== goal.requiresInterface) {
            // Accepted by IOS, but applied to the wrong interface: no tick.
            registerFailure();
            updatePrompt();
            return;
          }
          state.goalsDone[i] = true;
          if (goal.setsMode) state.mode = goal.setsMode;
          if (goal.response) print(goal.response);
          onProgress();
          updatePrompt();
          return;
        }
      }
    }

    // 3. built-in navigation
    if (tryNavigation(input)) {
      updatePrompt();
      return;
    }

    // 4. canned exec outputs (user/priv directly, or via "do" in config modes)
    if (!CONFIG_MODES.has(state.mode) || isDo) {
      const out = findOutput(execInput);
      if (out) {
        printOutput(out);
        tickDiagnosis(execInput);
        updatePrompt();
        return;
      }
    }

    // 5. unknown command
    state.totalAttempts++;
    print(INVALID, "term-line-err");
    registerFailure();
    updatePrompt();
  }

  function registerFailure() {
    state.failCount++;
    if (state.failCount === 2) {
      print("% Stuck? The Hint button on the left walks you through this task.", "term-line-err");
    }
  }

  function showHint() {
    const target = currentTarget();
    const box = $("lab-hint-box");
    if (!target) {
      box.textContent = state.completed
        ? "Lab already complete — try the show commands to see the healthy state."
        : "No task pending a hint right now.";
      box.classList.remove("hidden");
      return;
    }
    const hints = target.hints || [];
    if (state.hintIdx < hints.length) {
      box.textContent = `Hint ${state.hintIdx + 1}/${hints.length}: ${hints[state.hintIdx]}`;
      state.hintIdx++;
    } else {
      box.textContent = "Answer: " + CliMatcher.canonical(target.accept[0]) +
        (target.explanation ? " — " + target.explanation : "");
    }
    box.classList.remove("hidden");
  }

  // ---------- bindings ----------
  function bindControls() {
    $("labs-back-btn").addEventListener("click", () => App.showScreen("setup"));
    $("lab-exit-btn").addEventListener("click", () => renderList());
    $("lab-reset-btn").addEventListener("click", () => start(state.lab.id));
    $("lab-hint-btn").addEventListener("click", showHint);

    $("labs-list").addEventListener("click", (e) => {
      const card = e.target.closest(".lab-card");
      if (card) start(card.dataset.labId);
    });

    $("terminal").addEventListener("click", () => $("term-input").focus());

    $("term-input").addEventListener("keydown", (e) => {
      const inputEl = $("term-input");
      if (e.key === "Enter") {
        handleLine(inputEl.value);
        inputEl.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (state.histPos > 0) {
          state.histPos--;
          inputEl.value = state.history[state.histPos];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (state.histPos < state.history.length - 1) {
          state.histPos++;
          inputEl.value = state.history[state.histPos];
        } else {
          state.histPos = state.history.length;
          inputEl.value = "";
        }
      }
    });
  }

  return { bindControls, renderList, start };
})();
