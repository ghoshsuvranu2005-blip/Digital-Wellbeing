/**
 * js/mood.js
 * Mood logging — select a state, optionally add a note, log with timestamp.
 */

const DWMood = (() => {
  const states = [
    { key: 'thriving', label: 'Thriving', icon: 'ti-mood-happy'    },
    { key: 'good',     label: 'Good',     icon: 'ti-mood-smile'    },
    { key: 'neutral',  label: 'Neutral',  icon: 'ti-mood-neutral'  },
    { key: 'stressed', label: 'Stressed', icon: 'ti-mood-confuzed' },
    { key: 'drained',  label: 'Drained',  icon: 'ti-mood-sad'      },
  ];

  let selected = null;
  const log = [];

  function select(key) {
    selected = states.find(s => s.key === key) || null;
    document.querySelectorAll('.mood-btn').forEach(btn => {
      btn.classList.toggle('sel', btn.dataset.mood === key);
    });
  }

  function logEntry() {
    if (!selected) return;
    const noteEl = document.getElementById('mood-note');
    const note   = noteEl ? noteEl.value.trim() : '';
    const entry  = {
      mood: selected.label,
      icon: selected.icon,
      note,
      time: DWUtils.timeNow(),
    };
    log.unshift(entry);
    if (noteEl) noteEl.value = '';
    selected = null;
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('sel'));
    renderLog();
  }

  function renderLog() {
    const listEl = document.getElementById('mood-log-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    log.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'mood-entry';
      div.innerHTML = `
        <i class="ti ${entry.icon} mood-ei" aria-hidden="true"></i>
        <span style="font-size:11px;">${entry.mood}${entry.note ? ' — ' + entry.note : ''}</span>
        <span class="mood-et">${entry.time}</span>`;
      listEl.appendChild(div);
    });
  }

  function getStates() { return states; }
  function getLog()    { return log;    }

  return { select, logEntry, renderLog, getStates, getLog };
})();
