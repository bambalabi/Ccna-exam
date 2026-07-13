// Config & Troubleshooting study guide: topic list + topic detail views.
const Guide = (() => {
  const $ = (id) => document.getElementById(id);

  const DOMAIN_ORDER = [
    "Network Fundamentals",
    "Network Access",
    "IP Connectivity",
    "IP Services",
    "Security Fundamentals",
    "Automation and Programmability",
  ];

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function showView(view) {
    $("guide-list-view").classList.toggle("hidden", view !== "list");
    $("guide-topic-view").classList.toggle("hidden", view !== "topic");
    window.scrollTo({ top: 0 });
  }

  function renderList() {
    const bank = window.GUIDE_BANK || [];
    const read = new Set(Storage.getGuideProgress().read);
    const listEl = $("guide-topic-list");
    listEl.innerHTML = "";

    const byDomain = new Map();
    bank.forEach((t) => {
      if (!byDomain.has(t.domain)) byDomain.set(t.domain, []);
      byDomain.get(t.domain).push(t);
    });

    DOMAIN_ORDER.forEach((domain) => {
      const topics = byDomain.get(domain);
      if (!topics || !topics.length) return;

      listEl.appendChild(el("h3", "guide-domain-heading", domain));
      const grid = el("div", "guide-grid");
      topics.forEach((t) => {
        const card = el("button", "guide-card" + (read.has(t.id) ? " read" : ""));
        card.type = "button";
        card.dataset.topicId = t.id;
        card.appendChild(el("span", "guide-card-title", t.title));
        card.appendChild(el("span", "guide-card-blueprint", t.blueprint));
        if (read.has(t.id)) card.appendChild(el("span", "guide-card-check", "✓ read"));
        grid.appendChild(card);
      });
      listEl.appendChild(grid);
    });

    const done = bank.filter((t) => read.has(t.id)).length;
    $("guide-progress-info").textContent =
      `${bank.length} topics covering every "configure and verify / troubleshoot" objective ` +
      `of the CCNA 200-301 v1.1 blueprint. ${done} of ${bank.length} read on this device.`;

    showView("list");
  }

  function renderConfigBlock(block) {
    const wrap = el("div", "guide-config-block");
    wrap.appendChild(el("h4", null, block.title));
    if (block.intro) wrap.appendChild(el("p", null, block.intro));
    const pre = el("pre", "cli-block");
    pre.textContent = block.cli;
    wrap.appendChild(pre);
    if (block.notes && block.notes.length) {
      const ul = el("ul", "guide-notes");
      block.notes.forEach((n) => ul.appendChild(el("li", null, n)));
      wrap.appendChild(ul);
    }
    return wrap;
  }

  function renderVerifyTable(rows) {
    const wrap = el("div", "table-wrap");
    const table = el("table", "guide-table verify-table");
    const thead = el("thead");
    const hr = el("tr");
    hr.appendChild(el("th", null, "Command"));
    hr.appendChild(el("th", null, "What it shows / proves"));
    thead.appendChild(hr);
    table.appendChild(thead);
    const tbody = el("tbody");
    rows.forEach((r) => {
      const tr = el("tr");
      const cmdTd = el("td");
      cmdTd.appendChild(el("code", "cli-inline", r.cmd));
      tr.appendChild(cmdTd);
      tr.appendChild(el("td", null, r.what));
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function renderTroubleshootTable(rows) {
    const wrap = el("div", "table-wrap");
    const table = el("table", "guide-table tshoot-table");
    const thead = el("thead");
    const hr = el("tr");
    hr.appendChild(el("th", null, "Symptom"));
    hr.appendChild(el("th", null, "Likely causes"));
    hr.appendChild(el("th", null, "Fix"));
    thead.appendChild(hr);
    table.appendChild(thead);
    const tbody = el("tbody");
    rows.forEach((r) => {
      const tr = el("tr");
      tr.appendChild(el("td", null, r.symptom));
      const causesTd = el("td");
      const ul = el("ul", "guide-causes");
      r.causes.forEach((c) => ul.appendChild(el("li", null, c)));
      causesTd.appendChild(ul);
      tr.appendChild(causesTd);
      tr.appendChild(el("td", null, r.fix));
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function openTopic(id) {
    const topic = (window.GUIDE_BANK || []).find((t) => t.id === id);
    if (!topic) return;

    const root = $("guide-topic-content");
    root.innerHTML = "";

    const header = el("div", "guide-topic-header");
    header.appendChild(el("h2", null, topic.title));
    const meta = el("div", "guide-topic-meta");
    meta.appendChild(el("span", "guide-domain-badge", topic.domain));
    meta.appendChild(el("span", "blueprint-ref", "Blueprint " + topic.blueprint));
    header.appendChild(meta);
    root.appendChild(header);

    topic.overview.forEach((p) => root.appendChild(el("p", "guide-overview", p)));

    root.appendChild(el("h3", "guide-section-heading", "Configuration"));
    topic.configs.forEach((c) => root.appendChild(renderConfigBlock(c)));

    root.appendChild(el("h3", "guide-section-heading", "Verification"));
    root.appendChild(renderVerifyTable(topic.verify));

    root.appendChild(el("h3", "guide-section-heading", "Troubleshooting"));
    root.appendChild(renderTroubleshootTable(topic.troubleshooting));

    if (topic.tips && topic.tips.length) {
      const tipBox = el("div", "tip-callout");
      tipBox.appendChild(el("h4", null, "Exam tips"));
      const ul = el("ul");
      topic.tips.forEach((t) => ul.appendChild(el("li", null, t)));
      tipBox.appendChild(ul);
      root.appendChild(tipBox);
    }

    Storage.markGuideRead(id);
    showView("topic");
  }

  function bindControls() {
    $("guide-back-btn").addEventListener("click", () => App.showScreen("setup"));
    $("guide-topic-back-btn").addEventListener("click", () => renderList());
    $("guide-topic-list").addEventListener("click", (e) => {
      const card = e.target.closest(".guide-card");
      if (card) openTopic(card.dataset.topicId);
    });
  }

  return { bindControls, renderList, openTopic };
})();
