/**
 * js/selfcheck.js
 * Digital wellbeing self-assessment — 8 questions, colour-coded score.
 */

const DWSelfCheck = (() => {
  const thresholds = [
    { max: 1, label: 'Great digital health. Habits are intentional and balanced.',              colour: '#378ADD' },
    { max: 2, label: 'Good shape. One or two habits worth reviewing this week.',                colour: '#378ADD' },
    { max: 4, label: 'Mild concerns. A few habits may be affecting your wellbeing.',            colour: '#BA7517' },
    { max: 6, label: 'Moderate impact. Consider a structured digital detox plan.',             colour: '#D85A30' },
    { max: 8, label: 'High impact. Several areas need attention — a full reset is recommended.', colour: '#A32D2D' },
  ];

  function evaluate() {
    const checked = [...document.querySelectorAll('.score-check:checked')].length;
    const total   = DW_CONFIG.selfCheckQuestions.length;
    const pct     = Math.round(checked / total * 100);
    const result  = thresholds.find(t => checked <= t.max) || thresholds[thresholds.length - 1];

    const textEl   = document.getElementById('score-text');
    const fillEl   = document.getElementById('score-fill');
    const adviceEl = document.getElementById('score-advice');

    if (textEl)   textEl.textContent        = `${checked} / ${total} concerns`;
    if (fillEl)   { fillEl.style.width      = pct + '%'; fillEl.style.background = result.colour; }
    if (adviceEl) { adviceEl.textContent    = result.label; adviceEl.style.color  = result.colour; }

    return { checked, total, pct, result };
  }

  return { evaluate };
})();
