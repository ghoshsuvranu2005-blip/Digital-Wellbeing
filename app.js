/**
 * js/app.js
 * Bootstrap — initialises all modules and wires up the UI.
 * This is the single entry point that runs on DOMContentLoaded.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Clock ───────────────────────────────────────────────── */
  DWClock.render('clock-slot');

  /* ── 2. Tab navigation ──────────────────────────────────────── */
  DWTabs.render('nav-tabs');

  /* ── 3. Auto-lock ───────────────────────────────────────────── */
  DWAutoLock.init(DW_CONFIG.apps);

  /* ── 4. Habits ──────────────────────────────────────────────── */
  DW_CONFIG.habits.forEach((habit, i) => {
    const item = document.getElementById(`habit-item-${i}`);
    if (item) item.addEventListener('click', () => DWHabits.toggle(i));
  });

  /* ── 5. Pomodoro ────────────────────────────────────────────── */
  const pomoStart = document.getElementById('pomo-start');
  const pomoReset = document.getElementById('pomo-reset');
  if (pomoStart) pomoStart.addEventListener('click', DWPomodoro.start);
  if (pomoReset) pomoReset.addEventListener('click', DWPomodoro.reset);

  document.querySelectorAll('.pm').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pm').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      DWPomodoro.setMode(parseInt(btn.dataset.dur));
    });
  });

  ['pomo-sess', 'pomo-goal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', DWPomodoro.updateGoal);
  });

  /* ── 6. Mood log ────────────────────────────────────────────── */
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => DWMood.select(btn.dataset.mood));
  });
  const moodBtn = document.getElementById('mood-log-btn');
  if (moodBtn) moodBtn.addEventListener('click', DWMood.logEntry);

  /* ── 7. Self-check ──────────────────────────────────────────── */
  document.querySelectorAll('.score-check').forEach(cb => {
    cb.addEventListener('change', DWSelfCheck.evaluate);
  });

  /* ── 8. Alarm toggles ───────────────────────────────────────── */
  document.querySelectorAll('[data-alarm-id]').forEach(tog => {
    tog.addEventListener('change', () => {
      DWAlarms.setEnabled(tog.dataset.alarmId, tog.checked);
      const statusEl = tog.closest('.alarm-row')?.querySelector('.ast');
      if (statusEl) {
        statusEl.textContent = tog.checked ? 'Active' : 'Off';
        statusEl.className   = 'ast ' + (tog.checked ? 'ast-on' : 'ast-off');
      }
    });
  });

  /* ── 9. Alert simulate / clear ──────────────────────────────── */
  const simAlerts = [
    { type:'r', icon:'ti-alert-triangle',    title:'TikTok — limit exceeded',       sub:'62 min used · 50 min limit · App locked' },
    { type:'y', icon:'ti-clock-exclamation', title:'Twitter / X — approaching limit', sub:'51 min used of 60 min · 9 min remaining' },
    { type:'g', icon:'ti-circle-check',      title:'Snapchat — within limit',        sub:'8 min used of 50 min · Operating normally' },
  ];
  let simIdx = 0;

  const simBtn   = document.getElementById('sim-btn');
  const clearBtn = document.getElementById('clear-btn');
  if (simBtn) simBtn.addEventListener('click', () => {
    const a   = simAlerts[simIdx++ % simAlerts.length];
    const div = document.createElement('div');
    div.className = `alert-banner alert-${a.type}`;
    div.innerHTML = `<i class="ti ${a.icon}" aria-hidden="true"></i><div><div class="ab-title">${a.title}</div><div class="ab-sub">${a.sub}</div></div>`;
    document.getElementById('alert-banners')?.prepend(div);
  });
  if (clearBtn) clearBtn.addEventListener('click', () => {
    const container = document.getElementById('alert-banners');
    if (container) container.innerHTML = `
      <div class="alert-banner alert-g">
        <i class="ti ti-circle-check" aria-hidden="true"></i>
        <div><div class="ab-title">All clear — no active alerts</div><div class="ab-sub">All apps within their daily limits.</div></div>
      </div>`;
  });

  console.log(`[${DW_CONFIG.name}] v${DW_CONFIG.version} initialised.`);
});
