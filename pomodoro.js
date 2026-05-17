/**
 * js/pomodoro.js
 * Pomodoro focus timer with three modes, circular SVG ring,
 * and a daily session / goal tracker.
 */

const DWPomodoro = (() => {
  const cfg = DW_CONFIG.pomodoro;
  const CIRC = 2 * Math.PI * 48; // ring circumference for r=48

  let dur     = cfg.focusSeconds;
  let left    = cfg.focusSeconds;
  let running = false;
  let timer   = null;

  const modes = [
    { label: 'Focus 25 min',  dur: cfg.focusSeconds,      key: 'focus'  },
    { label: 'Break 5 min',   dur: cfg.shortBreakSeconds, key: 'short'  },
    { label: 'Long 15 min',   dur: cfg.longBreakSeconds,  key: 'long'   },
  ];

  function display(s) {
    const timeEl = document.getElementById('pomo-time');
    const progEl = document.getElementById('pomo-prog');
    if (timeEl) timeEl.textContent = DWUtils.fmtSec(s);
    if (progEl) progEl.style.strokeDashoffset = CIRC * (1 - s / dur);
  }

  function start() {
    if (running) { pause(); return; }
    running = true;
    setLabel('Session in progress — stay focused');
    setStartBtnText('Pause');
    timer = setInterval(() => {
      if (left <= 0) { complete(); return; }
      left--;
      display(left);
    }, 1000);
  }

  function pause() {
    running = false;
    clearInterval(timer);
    setLabel('Paused — resume when ready');
    setStartBtnText('Resume');
  }

  function reset() {
    running = false;
    clearInterval(timer);
    left = dur;
    display(left);
    setLabel(modes.find(m => m.dur === dur)?.label + ' — ready to start');
    setStartBtnText('Start');
  }

  function complete() {
    running = false;
    clearInterval(timer);
    setLabel('Session complete — take a break!');
    setStartBtnText('Start');
  }

  function setMode(newDur) {
    clearInterval(timer);
    running = false;
    dur  = newDur;
    left = newDur;
    display(left);
    setLabel(modes.find(m => m.dur === newDur)?.label + ' — ready to start');
    setStartBtnText('Start');
  }

  function setLabel(text) {
    const el = document.getElementById('pomo-label');
    if (el) el.textContent = text;
  }

  function setStartBtnText(text) {
    const el = document.getElementById('pomo-start');
    if (el) el.textContent = text;
  }

  function updateGoal() {
    const sessions = parseInt(document.getElementById('pomo-sess')?.value || '0');
    const goal     = parseInt(document.getElementById('pomo-goal')?.value || '120');
    const done     = sessions * 25;
    const pct      = Math.min(100, Math.round(done / goal * 100));
    const pctEl    = document.getElementById('pomo-gp');
    const fillEl   = document.getElementById('pomo-gf');
    const sessValEl= document.getElementById('pomo-sess-v');
    const goalValEl= document.getElementById('pomo-goal-v');
    if (pctEl)     pctEl.textContent     = pct + '%';
    if (fillEl)    fillEl.style.width    = pct + '%';
    if (sessValEl) sessValEl.textContent = sessions;
    if (goalValEl) goalValEl.textContent = goal;
  }

  function getModes() { return modes; }

  return { start, pause, reset, setMode, updateGoal, display, getModes };
})();
