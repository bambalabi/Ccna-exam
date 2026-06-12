// localStorage-backed exam history.
const Storage = (() => {
  const KEY = "ccna-sim-history-v1";

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

  return { getHistory, saveAttempt, clearHistory };
})();
