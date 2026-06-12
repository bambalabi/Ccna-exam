// Results score report and post-exam answer review.
const Review = (() => {
  let lastBundle = null;
  let lastQuestions = null;
  let lastAnswers = null;
  let filter = "incorrect";

  const $ = (id) => document.getElementById(id);

  function formatTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m} min ${String(s).padStart(2, "0")} s`;
  }

  function setData(bundle, questions, answers) {
    lastBundle = bundle;
    lastQuestions = questions;
    lastAnswers = answers;
    filter = bundle.incorrect > 0 || bundle.skipped > 0 ? "incorrect" : "all";
  }

  // ----- results screen -----
  function renderResults() {
    const b = lastBundle;
    const banner = $("result-banner");
    banner.textContent = b.passed ? "PASS" : "FAIL";
    banner.className = "result-banner " + (b.passed ? "pass" : "fail");

    $("scaled-score").textContent = b.score;
    $("raw-score").innerHTML =
      `<strong>${b.correct} of ${b.total}</strong> correct (${b.percentage}%)` +
      (b.skipped ? ` &middot; ${b.skipped} skipped` : "");
    $("time-used").textContent =
      `Time used: ${formatTime(b.timeUsedSec)} of ${formatTime(b.durationSec)}` +
      (b.timedOut ? " — time expired, exam auto-submitted" : "");

    const fill = $("score-bar-fill");
    const pct = ((b.score - Scoring.MIN_SCORE) / (Scoring.MAX_SCORE - Scoring.MIN_SCORE)) * 100;
    fill.style.width = pct + "%";
    fill.className = "score-bar-fill " + (b.passed ? "pass" : "fail");

    const wrap = $("domain-breakdown");
    wrap.innerHTML = "";
    Object.keys(Exam.DOMAIN_WEIGHTS)
      .filter((d) => b.domains[d])
      .forEach((d) => {
        const stats = b.domains[d];
        const pctD = Math.round((stats.correct / stats.total) * 100);
        const row = document.createElement("div");
        row.className = "domain-row";
        const cls = pctD >= 80 ? "strong" : pctD < 60 ? "weak" : "";
        row.innerHTML =
          `<span class="domain-name">${d}</span>` +
          `<div class="domain-bar"><div class="domain-bar-fill ${cls}" style="width:${pctD}%"></div></div>` +
          `<span class="domain-pct">${pctD}% (${stats.correct}/${stats.total})</span>`;
        wrap.appendChild(row);
      });
  }

  // ----- review screen -----
  function statusOf(i) {
    const q = lastQuestions[i];
    const a = lastAnswers[i];
    if (!Scoring.isAnswered(q, a)) return "skipped";
    return Scoring.isCorrect(q, a) ? "correct" : "incorrect";
  }

  function setFilter(f) {
    filter = f;
    document.querySelectorAll(".review-tabs .tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === f);
    });
    renderReviewList();
  }

  function renderReviewList() {
    const list = $("review-list");
    list.innerHTML = "";
    let shown = 0;

    lastQuestions.forEach((q, i) => {
      const status = statusOf(i);
      if (filter === "incorrect" && status !== "incorrect") return;
      if (filter === "skipped" && status !== "skipped") return;
      shown++;
      list.appendChild(buildReviewCard(q, i, status));
    });

    if (!shown) {
      const empty = document.createElement("div");
      empty.className = "card muted";
      empty.textContent =
        filter === "incorrect" ? "No incorrect answers — well done!" :
        filter === "skipped" ? "No skipped questions." : "Nothing to show.";
      list.appendChild(empty);
    }
  }

  function buildReviewCard(q, i, status) {
    const card = document.createElement("div");
    card.className = `card review-card ${status}`;

    const meta = document.createElement("div");
    meta.className = "review-meta";
    const badgeCls = { correct: "badge-correct", incorrect: "badge-incorrect", skipped: "badge-skipped" }[status];
    const badgeTxt = { correct: "Correct", incorrect: "Incorrect", skipped: "Skipped" }[status];
    meta.innerHTML =
      `<span class="review-qnum">Question ${i + 1}</span>` +
      `<span class="badge badge-domain">${q.domain}</span>` +
      `<span class="badge ${badgeCls}">${badgeTxt}</span>`;
    card.appendChild(meta);

    const text = document.createElement("div");
    text.className = "question-text";
    text.textContent = q.question;
    card.appendChild(text);

    if (q.exhibit) {
      const ex = document.createElement("pre");
      ex.className = "exhibit";
      ex.textContent = q.exhibit;
      card.appendChild(ex);
    }

    if (q.type === "dragdrop") {
      card.appendChild(buildDDReview(q, lastAnswers[i]));
    } else {
      card.appendChild(buildOptionsReview(q, lastAnswers[i]));
    }

    const expl = document.createElement("div");
    expl.className = "explanation";
    expl.innerHTML = `<strong>Explanation:</strong> `;
    expl.appendChild(document.createTextNode(q.explanation));
    card.appendChild(expl);

    return card;
  }

  function buildOptionsReview(q, userAnswer) {
    const wrap = document.createElement("div");
    wrap.className = "review-options";
    const picked = userAnswer || [];
    q.options.forEach((opt, idx) => {
      const isCorrect = q.answer.includes(idx);
      const isPicked = picked.includes(idx);
      const row = document.createElement("div");
      row.className = "review-option" +
        (isCorrect ? " is-correct" : isPicked ? " is-wrong-pick" : "");

      const letter = document.createElement("strong");
      letter.textContent = String.fromCharCode(65 + idx) + ".";
      const text = document.createElement("span");
      text.textContent = opt;
      row.append(letter, text);

      if (isCorrect) {
        const tag = document.createElement("span");
        tag.className = "review-tag t-correct";
        tag.textContent = isPicked ? "✓ Correct answer (your choice)" : "✓ Correct answer";
        row.appendChild(tag);
      } else if (isPicked) {
        const tag = document.createElement("span");
        tag.className = "review-tag t-yours";
        tag.textContent = "✗ Your answer";
        row.appendChild(tag);
      }
      wrap.appendChild(row);
    });
    return wrap;
  }

  function buildDDReview(q, userAnswer) {
    const table = document.createElement("table");
    table.className = "review-dd-table";
    const head = document.createElement("tr");
    head.innerHTML = "<th>Target</th><th>Your answer</th><th>Correct answer</th>";
    table.appendChild(head);

    q.targets.forEach((label, t) => {
      const userIdx = userAnswer ? userAnswer[t] : null;
      const correctIdx = q.answer[t];
      const ok = userIdx === correctIdx;
      const tr = document.createElement("tr");

      const tdTarget = document.createElement("td");
      tdTarget.textContent = label;
      const tdUser = document.createElement("td");
      tdUser.className = ok ? "ok" : "bad";
      tdUser.textContent = userIdx === null || userIdx === undefined ? "—" : q.items[userIdx];
      const tdCorrect = document.createElement("td");
      tdCorrect.textContent = q.items[correctIdx];

      tr.append(tdTarget, tdUser, tdCorrect);
      table.appendChild(tr);
    });
    return table;
  }

  function bindControls() {
    document.querySelectorAll(".review-tabs .tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => setFilter(btn.dataset.filter));
    });
  }

  function openReview() {
    setFilter(filter);
  }

  return { setData, renderResults, openReview, bindControls };
})();
