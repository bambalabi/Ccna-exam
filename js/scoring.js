// Grading and Cisco-style scaled scoring.
const Scoring = (() => {
  const PASS_SCORE = 825;
  const MIN_SCORE = 100;
  const MAX_SCORE = 1000;

  // Multi-answer and drag-and-drop are graded all-or-nothing, like the real exam.
  function isCorrect(question, userAnswer) {
    if (userAnswer == null) return false;
    if (question.type === "dragdrop") {
      if (!Array.isArray(userAnswer) || userAnswer.length !== question.answer.length) return false;
      return question.answer.every((v, i) => userAnswer[i] === v);
    }
    if (!Array.isArray(userAnswer) || userAnswer.length !== question.answer.length) return false;
    const correctSet = new Set(question.answer);
    return userAnswer.every((idx) => correctSet.has(idx));
  }

  function isAnswered(question, userAnswer) {
    if (userAnswer == null) return false;
    if (question.type === "dragdrop") {
      return Array.isArray(userAnswer) && userAnswer.some((v) => v !== null && v !== undefined);
    }
    return Array.isArray(userAnswer) && userAnswer.length > 0;
  }

  function scaledScore(correct, total) {
    if (!total) return MIN_SCORE;
    return Math.round(MIN_SCORE + (correct / total) * (MAX_SCORE - MIN_SCORE));
  }

  // questions: prepared (shuffled) questions; answers: parallel array of user answers.
  function grade(questions, answers) {
    let correct = 0;
    let skipped = 0;
    const domains = {};
    const detail = [];

    questions.forEach((q, i) => {
      const answered = isAnswered(q, answers[i]);
      const ok = answered && isCorrect(q, answers[i]);
      if (ok) correct++;
      if (!answered) skipped++;
      if (!domains[q.domain]) domains[q.domain] = { correct: 0, total: 0 };
      domains[q.domain].total++;
      if (ok) domains[q.domain].correct++;
      detail.push({ index: i, correct: ok, answered });
    });

    const total = questions.length;
    const score = scaledScore(correct, total);
    return {
      total,
      correct,
      incorrect: total - correct - skipped,
      skipped,
      percentage: total ? Math.round((correct / total) * 100) : 0,
      score,
      passed: score >= PASS_SCORE,
      domains,
      detail,
    };
  }

  return { grade, isCorrect, isAnswered, PASS_SCORE, MIN_SCORE, MAX_SCORE };
})();
