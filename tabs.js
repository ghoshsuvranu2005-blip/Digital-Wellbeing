/**
 * js/tabs.js
 * Tab switching logic.
 */

const DWTabs = (() => {
  const TAB_DEFS = [
    { key: 'autolock', icon: 'ti-lock',           label: 'Auto-lock'  },
    { key: 'alarms',   icon: 'ti-bell-ringing',   label: 'Alarms'     },
    { key: 'timers',   icon: 'ti-hourglass',      label: 'App timers' },
    { key: 'screen',   icon: 'ti-device-mobile',  label: 'Screen'     },
    { key: 'sleep',    icon: 'ti-moon',            label: 'Sleep'      },
    { key: 'social',   icon: 'ti-social',          label: 'Social'     },
    { key: 'focus',    icon: 'ti-brain',           label: 'Focus'      },
    { key: 'mental',   icon: 'ti-heart',           label: 'Mental'     },
    { key: 'habits',   icon: 'ti-checklist',       label: 'Habits'     },
    { key: 'pomo',     icon: 'ti-clock',           label: 'Timer'      },
    { key: 'mood',     icon: 'ti-mood-smile',      label: 'Mood'       },
    { key: 'checker',  icon: 'ti-clipboard-check', label: 'Self-check' },
  ];

  let active = 'autolock';

  function render(navId) {
    const nav = document.getElementById(navId);
    if (!nav) return;
    nav.className = 'ntabs';
    TAB_DEFS.forEach(tab => {
      const btn = document.createElement('button');
      btn.className   = 'tb' + (tab.key === active ? ' active' : '');
      btn.dataset.tab = tab.key;
      btn.innerHTML   = `<i class="ti ${tab.icon}" aria-hidden="true"></i> ${tab.label}`;
      btn.addEventListener('click', () => switchTo(tab.key));
      nav.appendChild(btn);
    });
  }

  function switchTo(key) {
    active = key;
    document.querySelectorAll('.tb').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === key);
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('hidden', panel.id !== `tab-${key}`);
    });
  }

  return { render, switchTo };
})();
