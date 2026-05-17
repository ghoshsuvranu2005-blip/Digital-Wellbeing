/**
 * js/clock.js
 * Live clock rendered in the app header.
 * Displays HH:MM with a sweeping seconds ring (SVG).
 */

const DWClock = (() => {
  const CIRC = 2 * Math.PI * 18; // circumference for r=18 ring

  function render(containerId) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;

    wrap.innerHTML = `
      <div class="clock-widget">
        <div class="clock-ring-wrap">
          <div class="clock-ring">
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
              <circle cx="22" cy="22" r="18" fill="none" stroke="var(--b100)" stroke-width="3"/>
              <circle id="dw-sec-ring" cx="22" cy="22" r="18" fill="none"
                stroke="var(--b400)" stroke-width="3" stroke-linecap="round"
                stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC}"/>
            </svg>
            <div class="clock-ring-inner" id="dw-sec-num" aria-label="seconds">00</div>
          </div>
          <div>
            <div class="clock-time" id="dw-clock-time" aria-live="polite">--:--</div>
            <div class="clock-date" id="dw-clock-date">---</div>
          </div>
        </div>
      </div>`;

    tick();
    setInterval(tick, 1000);
  }

  function tick() {
    const now = new Date();
    const h   = String(now.getHours()).padStart(2, '0');
    const m   = String(now.getMinutes()).padStart(2, '0');
    const s   = now.getSeconds();

    const timeEl = document.getElementById('dw-clock-time');
    const dateEl = document.getElementById('dw-clock-date');
    const secNum = document.getElementById('dw-sec-num');
    const secRing= document.getElementById('dw-sec-ring');

    if (timeEl) timeEl.textContent = `${h}:${m}`;
    if (dateEl) dateEl.textContent = DWUtils.dateStr(now);
    if (secNum) secNum.textContent = String(s).padStart(2, '0');
    if (secRing) {
      const offset = CIRC * (1 - s / 60);
      secRing.style.strokeDashoffset = offset;
    }
  }

  return { render };
})();
