// App bootstrap: screen routing, setup form, history screen.
(() => {
  const $ = (id) => document.getElementById(id);
  const SCREENS = ["setup", "exam", "results", "review", "history", "guide", "labs"];
  const MIN_COUNT = 10;
  const MAX_COUNT = 120;

  function showScreen(name) {
    SCREENS.forEach((s) => $(`screen-${s}`).classList.toggle("hidden", s !== name));
    window.scrollTo({ top: 0 });
  }

  // ----- setup -----
  function selectedCount() {
    const raw = parseInt($("question-count").value, 10);
    if (Number.isNaN(raw)) return 100;
    return Math.min(MAX_COUNT, Math.max(MIN_COUNT, raw));
  }

  function selectedMode() {
    return document.querySelector('input[name="exam-mode"]:checked').value;
  }

  function selectedDomains() {
    return Array.from(
      document.querySelectorAll('#topic-list input[type="checkbox"]:checked')
    ).map((cb) => cb.value);
  }

  function availableQuestions() {
    const bank = window.QUESTION_BANK || [];
    const wanted = new Set(selectedDomains());
    return bank.filter((q) => wanted.has(q.domain)).length;
  }

  // Actual exam size: the requested count, capped by what the selected topics can supply.
  function effectiveCount() {
    return Math.min(selectedCount(), availableQuestions());
  }

  function updateSummary() {
    const count = selectedCount();
    const effective = effectiveCount();
    const minutes = Math.round((effective * Exam.SECONDS_PER_QUESTION) / 60);
    $("summary-count").textContent = effective;
    $("summary-duration").textContent = `${minutes} min`;
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.classList.toggle("active", parseInt(btn.dataset.count, 10) === count);
    });

    const noTopics = selectedDomains().length === 0;
    $("topic-warning").classList.toggle("hidden", !noTopics);
    $("start-exam-btn").disabled = noTopics;
  }

  function buildTopicList() {
    const bank = window.QUESTION_BANK || [];
    const counts = {};
    bank.forEach((q) => { counts[q.domain] = (counts[q.domain] || 0) + 1; });

    const list = $("topic-list");
    Object.entries(Exam.DOMAIN_WEIGHTS).forEach(([domain, weight]) => {
      const label = document.createElement("label");
      label.className = "topic-option";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = domain;
      cb.checked = true;
      cb.addEventListener("change", updateSummary);
      const info = document.createElement("span");
      info.innerHTML =
        `<span class="topic-name">${domain}</span>` +
        `<small class="topic-meta">${weight}% of real exam &middot; ${counts[domain] || 0} questions</small>`;
      label.append(cb, info);
      list.appendChild(label);
    });

    const setAll = (checked) => {
      list.querySelectorAll('input[type="checkbox"]').forEach((cb) => { cb.checked = checked; });
      updateSummary();
    };
    $("topics-all-btn").addEventListener("click", () => setAll(true));
    $("topics-none-btn").addEventListener("click", () => setAll(false));
  }

  function bindSetup() {
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        $("question-count").value = btn.dataset.count;
        updateSummary();
      });
    });
    $("question-count").addEventListener("input", updateSummary);
    $("question-count").addEventListener("change", () => {
      $("question-count").value = selectedCount();
      updateSummary();
    });

    $("start-exam-btn").addEventListener("click", () => {
      const bank = window.QUESTION_BANK || [];
      if (!bank.length) {
        alert("Question bank failed to load. Please reload the page.");
        return;
      }
      const domains = selectedDomains();
      if (!domains.length) {
        updateSummary();
        return;
      }
      showScreen("exam");
      Exam.start(
        { count: effectiveCount(), mode: selectedMode(), domains },
        onExamFinished
      );
    });

    $("view-history-btn").addEventListener("click", () => {
      renderHistory();
      showScreen("history");
    });

    $("open-guide-btn").addEventListener("click", () => {
      Guide.renderList();
      showScreen("guide");
    });

    if (typeof Labs !== "undefined") {
      $("open-labs-btn").addEventListener("click", () => {
        Labs.renderList();
        showScreen("labs");
      });
    } else {
      $("open-labs-btn").classList.add("hidden");
    }

    const bank = window.QUESTION_BANK || [];
    const counts = {};
    bank.forEach((q) => { counts[q.domain] = (counts[q.domain] || 0) + 1; });
    const guideCount = (window.GUIDE_BANK || []).length;
    const labCount = (window.LAB_BANK || []).length;
    $("bank-info").textContent =
      `Question bank: ${bank.length} unique questions across ${Object.keys(counts).length} exam domains. ` +
      `Each exam draws a fresh random, domain-weighted selection. ` +
      `Plus ${guideCount} config & troubleshooting guide topics and ${labCount} hands-on CLI labs.`;
  }

  // ----- exam finished -----
  function onExamFinished(bundle, questions, answers) {
    Review.setData(bundle, questions, answers);
    Review.renderResults();
    showScreen("results");
  }

  function bindResults() {
    $("review-btn").addEventListener("click", () => {
      Review.openReview();
      showScreen("review");
    });
    $("results-new-exam-btn").addEventListener("click", () => showScreen("setup"));
    $("results-history-btn").addEventListener("click", () => {
      renderHistory();
      showScreen("history");
    });
    $("review-back-btn").addEventListener("click", () => showScreen("results"));
  }

  // ----- history -----
  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
      " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }

  function formatTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function renderHistory() {
    const history = Storage.getHistory();
    const empty = $("history-empty");
    const statsEl = $("history-stats");
    const trendEl = $("history-trend");
    const tbody = $("history-table").querySelector("tbody");

    statsEl.innerHTML = "";
    trendEl.innerHTML = "";
    tbody.innerHTML = "";
    empty.classList.toggle("hidden", history.length > 0);
    $("history-table").classList.toggle("hidden", history.length === 0);
    $("clear-history-btn").classList.toggle("hidden", history.length === 0);
    if (!history.length) return;

    // summary stats
    const best = Math.max(...history.map((h) => h.score));
    const avg = Math.round(history.reduce((s, h) => s + h.score, 0) / history.length);
    const passRate = Math.round((history.filter((h) => h.passed).length / history.length) * 100);

    // weakest domain across all attempts
    const domainAgg = {};
    history.forEach((h) => {
      Object.entries(h.domains || {}).forEach(([d, v]) => {
        if (!domainAgg[d]) domainAgg[d] = { correct: 0, total: 0 };
        domainAgg[d].correct += v.correct;
        domainAgg[d].total += v.total;
      });
    });
    let weakest = null;
    Object.entries(domainAgg).forEach(([d, v]) => {
      const pct = v.correct / v.total;
      if (!weakest || pct < weakest.pct) weakest = { domain: d, pct };
    });

    const stats = [
      { value: history.length, label: "exams taken" },
      { value: best, label: "best score" },
      { value: avg, label: "average score" },
      { value: passRate + "%", label: "pass rate" },
    ];
    if (weakest) {
      stats.push({ value: Math.round(weakest.pct * 100) + "%", label: `weakest: ${weakest.domain}` });
    }
    stats.forEach((s) => {
      const box = document.createElement("div");
      box.className = "stat-box";
      box.innerHTML = `<span class="stat-value">${s.value}</span><span class="stat-label">${s.label}</span>`;
      statsEl.appendChild(box);
    });

    // trend bars (last 20 attempts)
    history.slice(-20).forEach((h) => {
      const bar = document.createElement("div");
      bar.className = "trend-bar " + (h.passed ? "pass" : "fail");
      const pct = Math.max(4, ((h.score - Scoring.MIN_SCORE) / (Scoring.MAX_SCORE - Scoring.MIN_SCORE)) * 100);
      bar.style.height = pct + "%";
      bar.title = `${h.score} — ${formatDate(h.date)}`;
      bar.innerHTML = `<span class="trend-score">${h.score}</span>`;
      trendEl.appendChild(bar);
    });

    // table, newest first
    history.slice().reverse().forEach((h) => {
      const tr = document.createElement("tr");
      tr.innerHTML =
        `<td>${formatDate(h.date)}</td>` +
        `<td>${h.count}</td>` +
        `<td>${h.mode === "exam" ? "Exam" : "Practice"}</td>` +
        `<td><strong>${h.score}</strong> (${h.percentage}%)</td>` +
        `<td><span class="result-pill ${h.passed ? "pass" : "fail"}">${h.passed ? "PASS" : "FAIL"}</span></td>` +
        `<td>${h.correct}/${h.count}</td>` +
        `<td>${formatTime(h.timeUsedSec)}</td>`;
      tbody.appendChild(tr);
    });
  }

  function bindHistory() {
    $("history-back-btn").addEventListener("click", () => showScreen("setup"));
    $("clear-history-btn").addEventListener("click", () => {
      if (confirm("Delete all saved exam history on this device?")) {
        Storage.clearHistory();
        renderHistory();
      }
    });
  }

  // warn before leaving mid-exam
  window.addEventListener("beforeunload", (e) => {
    if (Exam.inProgress()) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  window.App = { showScreen };

  document.addEventListener("DOMContentLoaded", () => {
    buildTopicList();
    bindSetup();
    bindResults();
    bindHistory();
    Exam.bindControls();
    Review.bindControls();
    Guide.bindControls();
    if (typeof Labs !== "undefined") Labs.bindControls();
    updateSummary();
    showScreen("setup");
  });
})();
