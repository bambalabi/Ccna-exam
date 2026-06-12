// Exam engine: question sampling, rendering, answer capture, navigation.
const Exam = (() => {
  const SECONDS_PER_QUESTION = 72; // real exam ratio: 100 questions / 120 minutes

  // Official CCNA 200-301 domain weights.
  const DOMAIN_WEIGHTS = {
    "Network Fundamentals": 20,
    "Network Access": 20,
    "IP Connectivity": 25,
    "IP Services": 10,
    "Security Fundamentals": 15,
    "Automation and Programmability": 10,
  };

  let state = null;
  let onFinishCb = null;

  const $ = (id) => document.getElementById(id);

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Pick `count` questions from the bank, preserving the official domain
  // proportions via largest-remainder allocation, then shuffle the order.
  function sampleQuestions(bank, count) {
    const byDomain = {};
    bank.forEach((q) => {
      (byDomain[q.domain] = byDomain[q.domain] || []).push(q);
    });
    const domains = Object.keys(byDomain);
    const totalWeight = domains.reduce((s, d) => s + (DOMAIN_WEIGHTS[d] || 1), 0);

    const exact = domains.map((d) => {
      const share = (count * (DOMAIN_WEIGHTS[d] || 1)) / totalWeight;
      return { domain: d, base: Math.floor(share), frac: share - Math.floor(share) };
    });
    let allocated = exact.reduce((s, e) => s + e.base, 0);
    exact.sort((a, b) => b.frac - a.frac);
    for (let i = 0; allocated < count; i = (i + 1) % exact.length) {
      exact[i].base++;
      allocated++;
    }

    const picked = [];
    exact.forEach((e) => {
      const pool = shuffle(byDomain[e.domain]);
      picked.push(...pool.slice(0, Math.min(e.base, pool.length)));
    });
    // Top up from the whole bank if any domain pool was too small.
    if (picked.length < count) {
      const have = new Set(picked.map((q) => q.id));
      const rest = shuffle(bank.filter((q) => !have.has(q.id)));
      picked.push(...rest.slice(0, count - picked.length));
    }
    return shuffle(picked);
  }

  // Return a copy of the question with options (or drag items) shuffled and
  // the answer indices remapped accordingly.
  function prepareQuestion(q) {
    const copy = JSON.parse(JSON.stringify(q));
    if (q.type === "dragdrop") {
      const perm = shuffle(q.items.map((_, i) => i)); // newItems[i] = items[perm[i]]
      copy.items = perm.map((p) => q.items[p]);
      copy.answer = q.answer.map((oldIdx) => perm.indexOf(oldIdx));
    } else {
      const perm = shuffle(q.options.map((_, i) => i));
      copy.options = perm.map((p) => q.options[p]);
      copy.answer = q.answer
        .map((oldIdx) => perm.indexOf(oldIdx))
        .sort((a, b) => a - b);
    }
    return copy;
  }

  function start(config, onFinish) {
    const bank = window.QUESTION_BANK || [];
    const questions = sampleQuestions(bank, config.count).map(prepareQuestion);
    const durationSec = config.count * SECONDS_PER_QUESTION;

    state = {
      mode: config.mode, // "exam" | "practice"
      questions,
      answers: questions.map(() => null),
      flags: questions.map(() => false),
      current: 0,
      durationSec,
      finished: false,
    };
    onFinishCb = onFinish;

    const layout = document.querySelector(".exam-layout");
    layout.classList.toggle("with-palette", state.mode === "practice");
    $("palette").classList.toggle("hidden", state.mode !== "practice");
    $("prev-btn").classList.toggle("hidden", state.mode !== "practice");
    $("flag-btn").classList.toggle("hidden", state.mode !== "practice");
    $("exam-progress").classList.remove("hidden");

    Timer.start(durationSec, () => finish(true));
    renderQuestion();
  }

  function currentQuestion() {
    return state.questions[state.current];
  }

  function renderQuestion() {
    const q = currentQuestion();
    const idx = state.current;
    const total = state.questions.length;

    $("exam-progress").textContent = `Question ${idx + 1} of ${total}`;
    $("question-number").textContent = `Question ${idx + 1} of ${total}`;
    $("question-instruction").textContent =
      q.type === "multi" ? `Select ${q.answer.length} answers.` :
      q.type === "dragdrop" ? "Drag and drop (or click) items onto the matching targets." :
      "Select one answer.";

    $("question-text").textContent = q.question;
    const exhibitEl = $("question-exhibit");
    if (q.exhibit) {
      exhibitEl.textContent = q.exhibit;
      exhibitEl.classList.remove("hidden");
    } else {
      exhibitEl.classList.add("hidden");
    }

    if (state.mode === "practice") {
      $("flag-btn").classList.toggle("flagged", state.flags[idx]);
      $("prev-btn").disabled = idx === 0;
      renderPalette();
    }
    const isLast = idx === total - 1;
    $("next-btn").innerHTML = isLast && state.mode === "exam" ? "Finish Exam" : "Next &rarr;";
    if (state.mode === "practice") $("next-btn").disabled = isLast;

    renderAnswerArea();
  }

  function renderAnswerArea() {
    const q = currentQuestion();
    const area = $("answer-area");
    area.innerHTML = "";
    if (q.type === "dragdrop") {
      renderDragDrop(q, area);
    } else {
      renderOptions(q, area);
    }
  }

  // ----- single / multi choice -----
  function renderOptions(q, area) {
    const selected = state.answers[state.current] || [];
    q.options.forEach((opt, i) => {
      const div = document.createElement("div");
      div.className = "option" + (selected.includes(i) ? " selected" : "");
      const letter = document.createElement("span");
      letter.className = "option-letter";
      letter.textContent = String.fromCharCode(65 + i);
      const text = document.createElement("span");
      text.className = "option-text";
      text.textContent = opt;
      div.append(letter, text);
      div.addEventListener("click", () => toggleOption(q, i));
      area.appendChild(div);
    });
  }

  function toggleOption(q, i) {
    let sel = state.answers[state.current] || [];
    if (q.type === "single") {
      sel = [i];
    } else {
      if (sel.includes(i)) {
        sel = sel.filter((x) => x !== i);
      } else if (sel.length < q.answer.length) {
        sel = sel.concat(i);
      } else {
        return; // real exam blocks selecting more than the required count
      }
    }
    state.answers[state.current] = sel.length ? sel : null;
    renderAnswerArea();
    if (state.mode === "practice") renderPalette();
  }

  // ----- drag and drop -----
  function renderDragDrop(q, area) {
    let slots = state.answers[state.current];
    if (!slots) {
      slots = q.targets.map(() => null);
      state.answers[state.current] = slots;
    }
    const placed = new Set(slots.filter((v) => v !== null));

    const hint = document.createElement("div");
    hint.className = "dd-hint";
    hint.textContent = "Tip: drag an item onto a target, or click an item and then click a target. Click a placed item to return it to the pool.";
    area.appendChild(hint);

    const wrap = document.createElement("div");
    wrap.className = "dd-wrap";

    const pool = document.createElement("div");
    pool.className = "dd-pool";
    const poolTitle = document.createElement("div");
    poolTitle.className = "dd-col-title";
    poolTitle.textContent = "Items";
    pool.appendChild(poolTitle);
    q.items.forEach((item, i) => {
      if (placed.has(i)) return;
      pool.appendChild(makeDDItem(q, i, false));
    });

    const targets = document.createElement("div");
    targets.className = "dd-targets";
    const tTitle = document.createElement("div");
    tTitle.className = "dd-col-title";
    tTitle.textContent = "Targets";
    targets.appendChild(tTitle);
    q.targets.forEach((label, t) => {
      const target = document.createElement("div");
      target.className = "dd-target";
      const lab = document.createElement("div");
      lab.className = "dd-target-label";
      lab.textContent = label;
      const slot = document.createElement("div");
      slot.className = "dd-slot";
      if (slots[t] !== null) {
        slot.appendChild(makeDDItem(q, slots[t], true));
      } else {
        const empty = document.createElement("span");
        empty.className = "dd-slot-empty";
        empty.textContent = "Drop here";
        slot.appendChild(empty);
      }
      target.append(lab, slot);
      target.addEventListener("dragover", (e) => {
        e.preventDefault();
        target.classList.add("dragover");
      });
      target.addEventListener("dragleave", () => target.classList.remove("dragover"));
      target.addEventListener("drop", (e) => {
        e.preventDefault();
        const itemIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if (!Number.isNaN(itemIdx)) placeItem(itemIdx, t);
      });
      target.addEventListener("click", () => {
        if (state.ddSelected !== null && state.ddSelected !== undefined) {
          placeItem(state.ddSelected, t);
        }
      });
      targets.appendChild(target);
    });

    wrap.append(pool, targets);
    area.appendChild(wrap);
  }

  function makeDDItem(q, itemIdx, inSlot) {
    const el = document.createElement("div");
    el.className = "dd-item" + (state.ddSelected === itemIdx ? " selected" : "");
    el.textContent = q.items[itemIdx];
    el.draggable = true;
    el.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", String(itemIdx));
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", () => el.classList.remove("dragging"));
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      if (inSlot) {
        removeItem(itemIdx);
      } else {
        state.ddSelected = state.ddSelected === itemIdx ? null : itemIdx;
        renderAnswerArea();
      }
    });
    return el;
  }

  function placeItem(itemIdx, targetIdx) {
    const slots = state.answers[state.current];
    // If the item is already in another slot, vacate it first.
    const from = slots.indexOf(itemIdx);
    if (from !== -1) slots[from] = null;
    slots[targetIdx] = itemIdx;
    state.ddSelected = null;
    renderAnswerArea();
    if (state.mode === "practice") renderPalette();
  }

  function removeItem(itemIdx) {
    const slots = state.answers[state.current];
    const at = slots.indexOf(itemIdx);
    if (at !== -1) slots[at] = null;
    state.ddSelected = null;
    renderAnswerArea();
    if (state.mode === "practice") renderPalette();
  }

  // ----- palette (practice mode) -----
  function renderPalette() {
    const grid = $("palette-grid");
    grid.innerHTML = "";
    state.questions.forEach((q, i) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "palette-cell";
      cell.textContent = i + 1;
      if (Scoring.isAnswered(q, state.answers[i])) cell.classList.add("answered");
      if (state.flags[i]) cell.classList.add("flagged");
      if (i === state.current) cell.classList.add("current");
      cell.addEventListener("click", () => goTo(i));
      grid.appendChild(cell);
    });
  }

  // ----- navigation -----
  function goTo(i) {
    state.ddSelected = null;
    state.current = i;
    renderQuestion();
    window.scrollTo({ top: 0 });
  }

  function next() {
    const q = currentQuestion();
    const answered = Scoring.isAnswered(q, state.answers[state.current]);
    const isLast = state.current === state.questions.length - 1;

    if (state.mode === "exam") {
      if (!answered) {
        const msg = isLast
          ? "You have not answered this question and the exam will end. Finish anyway?"
          : "You have not answered this question. In exam mode you cannot come back to it. Continue anyway?";
        if (!confirm(msg)) return;
      }
      if (isLast) {
        finish(false);
      } else {
        goTo(state.current + 1);
      }
    } else if (!isLast) {
      goTo(state.current + 1);
    }
  }

  function prev() {
    if (state.mode === "practice" && state.current > 0) goTo(state.current - 1);
  }

  function toggleFlag() {
    state.flags[state.current] = !state.flags[state.current];
    $("flag-btn").classList.toggle("flagged", state.flags[state.current]);
    renderPalette();
  }

  function submitFromPalette() {
    const unanswered = state.questions.filter(
      (q, i) => !Scoring.isAnswered(q, state.answers[i])
    ).length;
    const msg = unanswered > 0
      ? `You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Submit the exam anyway?`
      : "Submit the exam and see your score?";
    if (confirm(msg)) finish(false);
  }

  function endEarly() {
    if (confirm("End the exam now? Unanswered questions will be marked as skipped.")) {
      finish(false);
    }
  }

  function finish(timedOut) {
    if (!state || state.finished) return;
    state.finished = true;
    const timeUsedSec = state.durationSec - Timer.remainingSeconds();
    Timer.stop();
    $("exam-progress").classList.add("hidden");

    const result = Scoring.grade(state.questions, state.answers);
    const bundle = {
      date: new Date().toISOString(),
      mode: state.mode,
      count: state.questions.length,
      durationSec: state.durationSec,
      timeUsedSec: Math.min(timeUsedSec, state.durationSec),
      timedOut: !!timedOut,
      ...result,
    };

    Storage.saveAttempt({
      date: bundle.date,
      mode: bundle.mode,
      count: bundle.count,
      score: bundle.score,
      passed: bundle.passed,
      correct: bundle.correct,
      percentage: bundle.percentage,
      timeUsedSec: bundle.timeUsedSec,
      domains: bundle.domains,
    });

    const questions = state.questions;
    const answers = state.answers;
    state = null;
    if (onFinishCb) onFinishCb(bundle, questions, answers);
  }

  function bindControls() {
    $("next-btn").addEventListener("click", next);
    $("prev-btn").addEventListener("click", prev);
    $("flag-btn").addEventListener("click", toggleFlag);
    $("submit-exam-btn").addEventListener("click", submitFromPalette);
    $("end-exam-btn").addEventListener("click", endEarly);
  }

  function inProgress() {
    return !!state && !state.finished;
  }

  return { start, bindControls, inProgress, SECONDS_PER_QUESTION, DOMAIN_WEIGHTS };
})();
