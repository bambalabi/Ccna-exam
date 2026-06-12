// App bootstrap: screen routing, setup form, history screen.
(() => {
  const $ = (id) => document.getElementById(id);
  const SCREENS = ["setup", "exam", "results", "review", "history"];
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

  function updateSummary() {
    const count = selectedCount();
    const minutes = Math.round((count * Exam.SECONDS_PER_QUESTION) / 60);
    $("summary-count").textContent = count;
    $("summary-duration").textContent = `${minutes} min`;
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.classList.toggle("active", parseInt(btn.dataset.count, 10) === count);
    });
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
      showScreen("exam");
      Exam.start({ count: selectedCount(), mode: selectedMode() }, onExamFinished);
    });

    $("view-history-btn").addEventListener("click", () => {
      renderHistory();
      showScreen("history");
    });

    const bank = window.QUESTION_BANK || [];
    const counts = {};
    bank.forEach((q) => { counts[q.domain] = (counts[q.domain] || 0) + 1; });
    $("bank-info").textContent =
      `Question bank: ${bank.length} unique questions across ${Object.keys(counts).length} exam domains. ` +
      `Each exam draws a fresh random, domain-weighted selection.`;
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

  document.addEventListener("DOMContentLoaded", () => {
    bindSetup();
    bindResults();
    bindHistory();
    Exam.bindControls();
    Review.bindControls();
    updateSummary();
    showScreen("setup");
  });
})();
