# CCNA 200-301 Exam Simulator

A realistic, browser-based simulator for the Cisco CCNA 200-301 certification exam. No build step, no server, no account — just open the page and take an exam.

## Features

- **600-question bank** covering all six official exam domains at the official weightings:
  | Domain | Weight | Questions |
  |---|---|---|
  | Network Fundamentals | 20% | 120 |
  | Network Access | 20% | 120 |
  | IP Connectivity | 25% | 150 |
  | IP Services | 10% | 60 |
  | Security Fundamentals | 15% | 90 |
  | Automation and Programmability | 10% | 60 |
- **Real exam question formats**: single-answer multiple choice, multi-answer ("Choose two/three", all-or-nothing grading), and drag-and-drop matching.
- **Realistic timing**: 1.2 minutes per question, exactly the real exam's ratio (100 questions = 120 minutes). The timer auto-submits when it expires.
- **Choose your exam length**: 10–120 questions; each exam draws a fresh random, domain-weighted selection with shuffled answer order.
- **Two modes**:
  - *Exam mode* — forward-only navigation, answers are final, just like at the testing center.
  - *Practice mode* — free navigation, flag questions for review, change answers before submitting.
- **Cisco-style score report**: scaled score out of 1000 with the 825 passing cutoff, raw percentage, and a per-domain performance breakdown.
- **Mistake review**: every question shows your answer vs. the correct answer plus a detailed explanation of why each option is right or wrong.
- **Progress tracking**: exam history, score trend, and weakest-domain stats stored locally in your browser.

## Running locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server
# then visit http://localhost:8000
```

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via `.github/workflows/deploy-pages.yml`.
One-time setup: in the repository settings, set **Settings → Pages → Source** to **GitHub Actions**.

## Development

The question bank lives in `data/questions-*.js` (one file per exam domain). After editing questions, validate the bank:

```sh
node scripts/validate-questions.mjs
```

The validator enforces per-domain counts, unique IDs, valid answer indices, consistent drag-and-drop mappings, and minimum explanation quality.

## Disclaimer

This is an independent study tool. All questions are original and written for practice purposes; it is not affiliated with or endorsed by Cisco. CCNA is a trademark of Cisco Systems, Inc.
