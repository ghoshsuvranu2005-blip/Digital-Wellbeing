/**
 * js/timers.js
 * Per-app daily timer display — renders usage rows with
 * colour-coded progress bars and inline limit inputs.
 */

const DWTimers = (() => {

  function getBarColour(pct) {
    if (pct >= 100) return 'var(--red)';
    if (pct >= 80)  return 'var(--yel)';
    return 'var(--b400)';
  }

  function getStatusText(pct) {
    if (pct >= 100) return { text: 'Exceeded', colour: 'var(--red)' };
    if (pct >= 80)  return { text: pct + '%', colour: 'var(--yel)' };
    return               { text: pct + '%', colour: 'var(--txt2, #6b7a90)' };
  }

  /** Update all progress bars live when a limit input changes */
  function onLimitChange(appId, newLimit) {
    const row    = document.querySelector(`[data-timer-id="${appId}"]`);
    if (!row) return;
    const used   = parseInt(row.dataset.used || '0');
    const pct    = Math.min(100, Math.round(used / newLimit * 100));
    const fill   = row.querySelector('.app-bar-fill');
    const pctEl  = row.querySelector('.app-pct');
    if (fill)  fill.style.width      = pct + '%';
    if (fill)  fill.style.background = getBarColour(pct);
    const status = getStatusText(pct);
    if (pctEl) { pctEl.textContent = status.text; pctEl.style.color = status.colour; }
  }

  function init() {
    document.querySelectorAll('.app-limit-input').forEach(input => {
      const row = input.closest('[data-timer-id]');
      if (!row) return;
      input.addEventListener('change', () => {
        onLimitChange(row.dataset.timerId, parseInt(input.value));
      });
    });
  }

  return { init, onLimitChange };
})();
