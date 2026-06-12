// Countdown timer shown in the top bar; auto-submits the exam on expiry.
const Timer = (() => {
  let intervalId = null;
  let endTime = 0;
  let expireCb = null;
  const display = () => document.getElementById("timer-display");

  function format(totalSec) {
    const s = Math.max(0, totalSec);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(sec).padStart(2, "0");
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  function tick() {
    const remain = remainingSeconds();
    const el = display();
    if (el) {
      el.textContent = format(remain);
      el.classList.toggle("timer-low", remain <= 300);
    }
    if (remain <= 0) {
      const cb = expireCb;
      stop();
      if (cb) cb();
    }
  }

  function start(durationSec, onExpire) {
    stop();
    endTime = Date.now() + durationSec * 1000;
    expireCb = onExpire;
    const el = display();
    if (el) el.classList.remove("hidden");
    tick();
    intervalId = setInterval(tick, 250);
  }

  function stop() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    expireCb = null;
    const el = display();
    if (el) {
      el.classList.add("hidden");
      el.classList.remove("timer-low");
    }
  }

  function remainingSeconds() {
    return Math.max(0, Math.round((endTime - Date.now()) / 1000));
  }

  return { start, stop, remainingSeconds };
})();
