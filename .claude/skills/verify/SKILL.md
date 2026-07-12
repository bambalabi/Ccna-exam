---
name: verify
description: How to build, launch, and drive this app to verify changes end-to-end.
---

# Verifying the CCNA Exam Simulator

Static site — no build step, no dependencies.

## Launch

```bash
python3 -m http.server 8123 --bind 127.0.0.1   # serve repo root
```

Open http://127.0.0.1:8123/ (headless: Playwright with
`executablePath: "/opt/pw-browsers/chromium"` — the symlink itself is the
chrome binary).

## Fast checks (not a substitute for driving the UI)

```bash
node scripts/validate-questions.mjs   # question bank integrity
node scripts/test-exam-logic.mjs      # DOM-free engine smoke test
```

## Flows worth driving

- Setup screen: question-count presets, topic checkboxes (`#topic-list`),
  mode radios; summary (`#summary-count`/`#summary-duration`) must track them.
- Exam: `#start-exam-btn` → answer via `.option` clicks; drag-and-drop
  questions are answered by clicking a `.dd-item` then a `.dd-slot-empty`
  (clicking an already-filled target just swaps — the pool never empties,
  so loop on empty slots, not pool size).
- Practice mode shows the palette (`#palette-grid`) for free navigation;
  `#submit-exam-btn` fires a `confirm()` dialog — auto-accept dialogs.
- Results: `#domain-breakdown` should only list the domains that were in
  the exam. Then Review Answers, History.

## Gotchas

- `confirm()`/`alert()` dialogs appear on submit, end-early, unanswered
  next (exam mode), and clear-history — handle `page.on("dialog")`.
- A favicon 404 in the console is pre-existing noise.
