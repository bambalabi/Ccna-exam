// localStorage-backed exam history and study progress.
const Storage = (() => {
  const KEY = "ccna-sim-history-v1";
  const GUIDE_KEY = "ccna-sim-guide-v1";
  const LABS_KEY = "ccna-sim-labs-v1";

  function getHistory() {
    try {
      const raw = localStorage.getItem(KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveAttempt(attempt) {
    const list = getHistory();
    list.push(attempt);
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {
      // localStorage unavailable (private mode / quota) - history is best-effort
    }
  }

  function clearHistory() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) { /* ignore */ }
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      const val = raw ? JSON.parse(raw) : fallback;
      return val && typeof val === "object" ? val : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // localStorage unavailable (private mode / quota) - progress is best-effort
    }
  }

  function getGuideProgress() {
    const data = readJson(GUIDE_KEY, { read: [] });
    if (!Array.isArray(data.read)) data.read = [];
    return data;
  }

  function markGuideRead(id) {
    const data = getGuideProgress();
    if (!data.read.includes(id)) {
      data.read.push(id);
      writeJson(GUIDE_KEY, data);
    }
  }

  function getLabProgress() {
    return readJson(LABS_KEY, {});
  }

  function markLabComplete(id, attempts) {
    const data = getLabProgress();
    if (!data[id]) {
      data[id] = { completedAt: new Date().toISOString(), attempts: attempts || 0 };
      writeJson(LABS_KEY, data);
    }
  }

  return {
    getHistory, saveAttempt, clearHistory,
    getGuideProgress, markGuideRead,
    getLabProgress, markLabComplete,
  };
})();
