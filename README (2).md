# Digital Wellbeing Hub

> A blue-themed digital wellbeing dashboard with app timers, auto-lock, alarms, habit tracking, a Pomodoro timer, mood logging and a self-assessment scanner.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [File structure](#file-structure)
- [Setup & run](#setup--run)
- [Configuration](#configuration)
- [JavaScript modules](#javascript-modules)
- [CSS files](#css-files)
- [External dependencies](#external-dependencies)
- [Browser support](#browser-support)
- [Accessibility](#accessibility)
- [Customisation guide](#customisation-guide)
- [Roadmap](#roadmap)

---

## Overview

Digital Wellbeing Hub is a fully self-contained, single-page web application that helps users monitor, limit, and reflect on their digital screen time habits. It is built with plain HTML, CSS, and JavaScript — no build tool, no framework, no backend required.

Open `index.html` in any modern browser and it works immediately.

---

## Features

### 🔒 Auto-lock system
The centrepiece of the app. When a configured app reaches its daily usage limit it is automatically locked. A configurable cooldown timer counts down before the app unlocks. Users can request an override, but are made to wait through a "friction delay" first. A hard-lock window (e.g. after 22:00) prevents all overrides.

Settings:
| Setting | Default | Description |
|---|---|---|
| Cooldown duration | 15 min | How long an app stays locked after a breach |
| Override delay | 60 sec | Friction wait before override is granted |
| Daily override limit | 2 | Max overrides per day |
| Hard-lock time | 22:00 | No overrides allowed after this hour |

---

### 🔔 Alarm system
Five configurable alarm rules that fire alert banners in the Alarms tab:

| Rule | Default | Type |
|---|---|---|
| Total daily screen time | 240 min | Critical |
| Social media combined | 90 min | Warning |
| Late-night usage | 22:00 cutoff | Sleep |
| Single session length | 30 min | Focus |
| Weekly overuse streak | 3 days | Trend |

Each rule has an adjustable threshold and an on/off toggle.

---

### ⏱️ App timers
Per-app daily time limits for eight social and content apps:

| App | Default limit |
|---|---|
| WhatsApp | 60 min |
| Instagram | 60 min |
| YouTube | 90 min |
| Twitter / X | 60 min |
| TikTok | 50 min |
| Facebook | 50 min |
| Snapchat | 50 min |
| Reddit | 50 min |

Each row shows a progress bar colour-coded green → yellow → red as usage approaches and exceeds the limit.

---

### 🕐 Live clock
The header shows a real-time HH:MM display with a sweeping animated SVG ring that indicates the current second — visually analogous to a clock's seconds hand.

---

### 📚 Knowledge tabs (five sections)
Each section has:
- Stat cards with research figures
- Two-column layout: problems | solutions
- Quick-tip pills

Sections: Screen time · Sleep · Social media · Focus · Mental health.

---

### ✅ Habit tracker
An eight-item daily checklist with a live progress bar.

Default habits:
1. No phone first 30 min after waking
2. 20-20-20 eye rule done
3. Phone-free meal today
4. Screen off 90 min before bed
5. 10 min offline activity
6. Notifications batched (3×)
7. Moved every 45 min
8. No social media after 9 pm

---

### 🍅 Pomodoro focus timer
Three modes with an animated SVG ring:

| Mode | Duration |
|---|---|
| Focus | 25 min |
| Short break | 5 min |
| Long break | 15 min |

Includes a daily session counter and a focus goal progress bar.

---

### 😊 Mood log
Select one of five emotional states (Thriving → Drained), add an optional note, and build a timestamped log across the day. Useful for correlating mood patterns with screen time.

---

### 📋 Self-check (vulnerability scan)
Eight yes/no questions covering phone dependency, sleep disruption, social comparison, focus loss and information overload. Results map to five colour-coded threat levels.

| Score | Threat level |
|---|---|
| 0–1 | Minimal |
| 2 | Low |
| 3–4 | Moderate |
| 5–6 | High |
| 7–8 | Critical |

---

## File structure

```
digital-wellbeing-hub/
├── index.html            ← App entry point
├── dashboard.html        ← This project dashboard
├── package.json          ← Dev scripts & metadata
├── .gitignore
├── README.md
│
├── js/
│   ├── config.js         ← All limits, apps, thresholds (edit here to customise)
│   ├── utils.js          ← Shared helper functions
│   ├── clock.js          ← Live HH:MM clock + SVG seconds ring
│   ├── tabs.js           ← Tab navigation
│   ├── alarms.js         ← Alarm rule engine
│   ├── autolock.js       ← Auto-lock + cooldown + override flow
│   ├── timers.js         ← Per-app timer rows
│   ├── habits.js         ← Daily habit checklist
│   ├── pomodoro.js       ← Countdown timer + ring + modes
│   ├── mood.js           ← Mood state selection + log
│   ├── selfcheck.js      ← 8-question self-assessment
│   └── app.js            ← Bootstrap & event wiring (entry point)
│
└── styles/
    ├── main.css          ← CSS variables, layout, stat cards, alerts
    ├── tabs.css          ← Tab navigation buttons
    ├── alarms.css        ← Alarm banners and rule rows
    ├── autolock.css      ← Lock rows, override panel, settings
    ├── timers.css        ← Per-app timer rows
    └── components.css    ← Pomodoro, mood, habits, self-check
```

---

## Setup & run

### Requirements
- A modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Node.js 16+ (only needed for the dev server — not for running the app)

### Option A — open directly (simplest)
No installation needed. Open `index.html` in any browser.

### Option B — local dev server with live reload
```bash
cd digital-wellbeing-hub
npm install
npm run dev
# opens at http://localhost:3000
```

### Option C — Python server
```bash
cd digital-wellbeing-hub
python -m http.server 3000
# then open http://localhost:3000
```

### Option D — serve via Node
```bash
npm run start
# opens at http://localhost:3000
```

---

## Configuration

All settings live in **`js/config.js`**. Edit this file to customise the app without touching any other code.

### Changing app limits
```js
apps: [
  { id: 'whatsapp', name: 'WhatsApp', icon: 'ti-brand-whatsapp', limitMin: 60, usedMin: 45 },
  // add more apps here
],
```

### Changing alarm thresholds
```js
alarms: {
  totalScreenMinutes:  240,
  socialCombinedMin:    90,
  lateNightHour:        22,
  sessionMaxMinutes:    30,
  weeklyStreakDays:       3,
},
```

### Changing auto-lock behaviour
```js
autoLock: {
  cooldownMinutes:    15,
  overrideDelaySec:   60,
  dailyOverrideLimit:  2,
  hardLockTime:    '22:00',
},
```

### Adding a new habit
Add a string to the `habits` array:
```js
habits: [
  'No phone first 30 min after waking',
  'Your new habit here',
  // ...
],
```

### Changing Pomodoro durations
```js
pomodoro: {
  focusSeconds:      1500,   // 25 min
  shortBreakSeconds:  300,   //  5 min
  longBreakSeconds:   900,   // 15 min
},
```

---

## JavaScript modules

| Module | Namespace | Responsibility |
|---|---|---|
| `config.js` | `DW_CONFIG` | All app data, limits and question bank |
| `utils.js` | `DWUtils` | Time formatting, DOM helpers, status logic |
| `clock.js` | `DWClock` | Renders live clock + seconds ring |
| `tabs.js` | `DWTabs` | Tab nav render and panel switching |
| `alarms.js` | `DWAlarms` | Alarm rule evaluation and banner building |
| `autolock.js` | `DWAutoLock` | Lock state, countdowns, overrides |
| `timers.js` | `DWTimers` | Per-app usage rows |
| `habits.js` | `DWHabits` | Checklist state and progress bar |
| `pomodoro.js` | `DWPomodoro` | Countdown timer with SVG ring |
| `mood.js` | `DWMood` | Mood selection and log |
| `selfcheck.js` | `DWSelfCheck` | Self-assessment scoring |
| `app.js` | — | DOMContentLoaded bootstrap |

**Load order matters.** The `<script>` tags in `index.html` load modules in dependency order: `config.js` → `utils.js` → all feature modules → `app.js` last.

---

## CSS files

| File | Contents |
|---|---|
| `main.css` | CSS variables (blue palette, status colours), base resets, header, section cards, stat cards, progress bars, two-column layout, tip pills, send button, alert banners |
| `tabs.css` | Navigation tab bar and active/hover states |
| `alarms.css` | Alert banner variants, alarm rule rows, toggle switches |
| `autolock.css` | Lock app rows, lock status chips, override panel, settings rows |
| `timers.css` | Per-app timer rows with progress bars |
| `components.css` | Pomodoro ring, mood buttons, habit grid, self-check rows, mood log entries |

### CSS variable reference

```css
/* Blue palette */
--b50  → #E6F1FB  (lightest blue fill)
--b100 → #B5D4F4
--b200 → #85B7EB
--b400 → #378ADD  (primary blue)
--b600 → #185FA5
--b800 → #0C447C
--b900 → #042C53  (darkest)

/* Status */
--red, --red-bg, --red-t
--yel, --yel-bg, --yel-t
--grn, --grn-bg, --grn-t
```

All colours are defined in `:root` and adapt automatically in `@media (prefers-color-scheme: dark)`.

---

## External dependencies

| Name | Purpose | Loaded from |
|---|---|---|
| Tabler Icons | All UI icons (5800+ outline icons, webfont) | `cdn.jsdelivr.net` |
| Inter | Primary UI body font | `fonts.googleapis.com` |
| Share Tech Mono | Clock and monospace data readouts | `fonts.googleapis.com` |
| Canvas API | Matrix rain background (hacker theme) | Browser built-in |
| SVG | Clock seconds ring, Pomodoro ring | Browser built-in |

**No JavaScript framework. No npm runtime package. No build step.**

---

## Browser support

| Browser | Status |
|---|---|
| Chrome 90+ | Fully supported |
| Firefox 88+ | Fully supported |
| Safari 14+ | Fully supported |
| Edge 90+ | Fully supported |
| Mobile Chrome / Safari | Fully supported |

---

## Accessibility

- All decorative icons carry `aria-hidden="true"`
- Icon-only controls have `aria-label` attributes
- Toggle inputs have associated `<label>` elements
- Live clock time element has `aria-live="polite"`
- Colour is never the sole indicator of status — labels and text accompany every colour state
- Passes WCAG AA contrast ratios on the blue palette

---

## Customisation guide

### Add a new app to timers and auto-lock
Add an entry to the `apps` array in `config.js`:
```js
{ id: 'linkedin', name: 'LinkedIn', icon: 'ti-brand-linkedin', limitMin: 30, usedMin: 12 }
```
The app will appear automatically in the App Timers and Auto-lock tabs.

### Add a new alarm rule
Add to the `alarms` object in `config.js` and add a corresponding entry in `DWAlarms.rules` inside `alarms.js`.

### Change the colour theme
Edit the `--b*` CSS variables at the top of `main.css`. Swap the blue palette for any other hue family and the entire app re-themes automatically.

### Change the matrix rain speed or density
In the matrix rain canvas script (if using the hacker theme):
```js
const cols = Math.floor(canvas.width / 14); // lower value = denser columns
setInterval(drawMatrix, 50);                 // lower value = faster rain
```

---

## Roadmap

- [ ] `localStorage` persistence — save habits, mood log and lock state across sessions
- [ ] Weekly usage chart — bar chart of daily totals per app
- [ ] Export mood log as CSV
- [ ] Custom app addition via UI (user-typed name and icon)
- [ ] Push notifications via the Web Notifications API
- [ ] Onboarding flow for first-time users
- [ ] Dark / light theme toggle (currently follows `prefers-color-scheme`)
- [ ] PWA manifest and service worker for offline use and home screen install

---

## License

MIT — free for personal and educational use. No warranty is provided.

---

*Built with care for digital wellbeing — one focused session at a time.*
