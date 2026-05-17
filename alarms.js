/**
 * js/alarms.js
 * Usage alarm engine.
 * Checks usage data against thresholds and fires alert banners.
 */

const DWAlarms = (() => {
  const cfg = DW_CONFIG.alarms;

  // Active alarm rules (can be toggled in UI)
  const rules = [
    {
      id: 'total-screen',
      label: 'Total daily screen time',
      desc:  'Alert when combined device usage exceeds threshold',
      badge: 'danger',
      defaultVal: cfg.totalScreenMinutes,
      unit: 'min/day',
      enabled: true,
    },
    {
      id: 'social-combined',
      label: 'Social media combined',
      desc:  'WhatsApp + Instagram + TikTok + Twitter aggregate',
      badge: 'warn',
      defaultVal: cfg.socialCombinedMin,
      unit: 'min/day',
      enabled: true,
    },
    {
      id: 'late-night',
      label: 'Late-night usage',
      desc:  'Alerts when any app is used after bedtime cutoff',
      badge: 'warn',
      defaultVal: cfg.lateNightHour,
      unit: 'hr cutoff',
      enabled: true,
    },
    {
      id: 'session-length',
      label: 'Single session length',
      desc:  'Fires when an unbroken session exceeds limit',
      badge: 'ok',
      defaultVal: cfg.sessionMaxMinutes,
      unit: 'min/session',
      enabled: false,
    },
    {
      id: 'weekly-streak',
      label: 'Weekly overuse streak',
      desc:  'Triggers when limits are breached N days in a row',
      badge: 'danger',
      defaultVal: cfg.weeklyStreakDays,
      unit: 'day streak',
      enabled: true,
    },
  ];

  /** Evaluate current usage and push alerts */
  function evaluate(apps) {
    const alerts = [];
    apps.forEach(app => {
      const pct = app.usedMin / app.limitMin;
      if (pct >= 1) {
        alerts.push({
          type:  'danger',
          title: `${app.name} — limit exceeded`,
          sub:   `${app.usedMin} min used · ${app.limitMin} min limit · App locked automatically`,
        });
      } else if (pct >= 0.8) {
        alerts.push({
          type:  'warn',
          title: `${app.name} — approaching limit`,
          sub:   `${app.usedMin} min used of ${app.limitMin} min · ${app.limitMin - app.usedMin} minutes remaining`,
        });
      }
    });
    return alerts;
  }

  /** Build an alert banner DOM node */
  function buildBanner(alert) {
    const div = document.createElement('div');
    const icons = { danger: 'ti-alert-triangle', warn: 'ti-clock-exclamation', ok: 'ti-circle-check' };
    const cls   = { danger: 'alert-r', warn: 'alert-y', ok: 'alert-g' };
    div.className = `alert-banner ${cls[alert.type] || 'alert-g'}`;
    div.innerHTML = `
      <i class="ti ${icons[alert.type] || 'ti-bell'}" aria-hidden="true"></i>
      <div>
        <div class="ab-title">${alert.title}</div>
        <div class="ab-sub">${alert.sub}</div>
      </div>`;
    return div;
  }

  function getRules() { return rules; }

  function setEnabled(id, val) {
    const rule = rules.find(r => r.id === id);
    if (rule) rule.enabled = val;
  }

  return { evaluate, buildBanner, getRules, setEnabled };
})();
