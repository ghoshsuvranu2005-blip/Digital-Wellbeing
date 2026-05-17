/**
 * js/config.js
 * Central configuration for the Digital Wellbeing Hub.
 * Edit this file to customise limits, defaults and app list.
 */

const DW_CONFIG = {

  /* ── App list ─────────────────────────────────────────────────── */
  apps: [
    { id: 'whatsapp',  name: 'WhatsApp',    icon: 'ti-brand-whatsapp',  limitMin: 60,  usedMin: 45  },
    { id: 'instagram', name: 'Instagram',   icon: 'ti-brand-instagram', limitMin: 60,  usedMin: 87  },
    { id: 'youtube',   name: 'YouTube',     icon: 'ti-brand-youtube',   limitMin: 90,  usedMin: 30  },
    { id: 'twitter',   name: 'Twitter / X', icon: 'ti-brand-x',         limitMin: 60,  usedMin: 52  },
    { id: 'tiktok',    name: 'TikTok',      icon: 'ti-brand-tiktok',    limitMin: 50,  usedMin: 18  },
    { id: 'facebook',  name: 'Facebook',    icon: 'ti-brand-facebook',  limitMin: 50,  usedMin: 10  },
    { id: 'snapchat',  name: 'Snapchat',    icon: 'ti-brand-snapchat',  limitMin: 50,  usedMin: 8   },
    { id: 'reddit',    name: 'Reddit',      icon: 'ti-brand-reddit',    limitMin: 50,  usedMin: 35  },
  ],

  /* ── Auto-lock defaults ───────────────────────────────────────── */
  autoLock: {
    cooldownMinutes:   15,   // how long app stays locked after breach
    overrideDelaySec:  60,   // friction wait before override is granted
    dailyOverrideLimit: 2,   // max overrides per day before hard-lock
    hardLockTime:    '22:00' // HH:MM — no overrides after this hour
  },

  /* ── Alarm thresholds ─────────────────────────────────────────── */
  alarms: {
    totalScreenMinutes:  240,  // total daily screen time alarm
    socialCombinedMin:    90,  // WhatsApp + IG + TikTok + Twitter combined
    lateNightHour:        22,  // 24-hr format
    sessionMaxMinutes:    30,  // single unbroken session guard
    weeklyStreakDays:       3   // consecutive over-limit days trigger
  },

  /* ── Pomodoro defaults ────────────────────────────────────────── */
  pomodoro: {
    focusSeconds:      1500,  // 25 min
    shortBreakSeconds:  300,  //  5 min
    longBreakSeconds:   900   // 15 min
  },

  /* ── Self-check questions ─────────────────────────────────────── */
  selfCheckQuestions: [
    { id: 'q1', text: 'I check my phone within 5 minutes of waking up',    hint: 'Reactive start sets a distracted tone all day'            },
    { id: 'q2', text: "I feel anxious when I can't find my phone",          hint: 'Sign of nomophobia — dependency on device access'         },
    { id: 'q3', text: 'I use my phone in bed before sleeping',              hint: 'Disrupts melatonin and delays sleep onset'                },
    { id: 'q4', text: 'I find it hard to focus for more than 15 minutes',   hint: 'Shortened attention span from fragmented digital habits'  },
    { id: 'q5', text: 'I compare my life to others on social media',        hint: 'Curated feeds can damage self-esteem'                     },
    { id: 'q6', text: 'I check notifications during meals or conversations', hint: 'Reduces quality of real-world relationships'             },
    { id: 'q7', text: 'I feel overwhelmed by the volume of digital content', hint: 'Information overload leads to cognitive burnout'         },
    { id: 'q8', text: 'I spend more screen time than intended most days',    hint: 'Loss of intentional control over device use'             },
  ],

  /* ── Daily habits list ────────────────────────────────────────── */
  habits: [
    'No phone first 30 min after waking',
    '20-20-20 eye rule done',
    'Phone-free meal today',
    'Screen off 90 min before bed',
    '10 min offline activity',
    'Notifications batched (3×)',
    'Moved every 45 min',
    'No social media after 9 pm',
  ],

  /* ── Theme ────────────────────────────────────────────────────── */
  theme: 'blue',  // 'blue' | 'dark' | 'system'

  /* ── App metadata ─────────────────────────────────────────────── */
  version: '2.0.0',
  name:    'Digital Wellbeing Hub',
};

// Freeze to prevent accidental mutation
Object.freeze(DW_CONFIG);
Object.freeze(DW_CONFIG.autoLock);
Object.freeze(DW_CONFIG.alarms);
Object.freeze(DW_CONFIG.pomodoro);
