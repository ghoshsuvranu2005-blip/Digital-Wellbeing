# Digital-Wellbeing
Digital Wellbeing is a prototype that will add on some restrictions on the overuseage of social media apps which causes addictions to the media users. By this it set an automatic alarm and lock timer system after some time for during its overuse.
HTML, CSS, JS, Canvas, Tabler Icons, Google Fonts
open directly or via local server (Python/Node)
all 7 features with details (Alarms, App Timers, Knowledge Tabs, Habit Tracker, Pomodoro Timer, Mood Log, Self-Check)
# Digital Wellbeing Hub

> A dynamic, hacker-terminal-themed web app for tracking and improving digital habits — built entirely as a single-file interactive widget.

---

## Overview

**Digital Wellbeing Hub** is a fully self-contained, interactive dashboard that helps users monitor and control their digital screen time. It features a cyberpunk / hacker aesthetic with animated matrix rain, neon green terminal typography, and live system readouts — while delivering genuine, evidence-based wellbeing tools underneath.

The app runs entirely in the browser with no backend, no database, and no external dependencies beyond a Google Font and the Tabler icon library.

---

## Features

### 1. Alarm System — Excessive Use Detection
Configure smart usage alarms that fire when thresholds are crossed:

| Alarm | Type | Default |
|---|---|---|
| Total daily screen time | Critical | 240 min/day |
| Social media combined | Warning | 90 min/day |
| Late-night usage | Sleep guard | 22:00 cutoff |
| Single session length | Focus guard | 30 min/session |
| Weekly overuse streak | Trend alert | 3 consecutive days |

- Toggle each alarm on/off individually
- Adjust thresholds inline
- Simulate live alerts to test the system
- Alerts display as `[CRITICAL]`, `[WARNING]`, and `[OK]` terminal-style banners

---

### 2. App Timers — Per-App Daily Limits
Set and track individual daily time limits for 8 major social apps:

- **WhatsApp**
- **Instagram**
- **YouTube**
- **Twitter / X**
- **TikTok**
- **Facebook**
- **Snapchat**
- **Reddit**

Each row shows:
- Minutes used today vs. daily limit
- Colour-coded progress bar (green → yellow → red)
- Toggle to enable/disable the timer
- Inline number input to adjust the limit

A daily usage summary panel shows total social time, breach count, apps near threshold, and apps within limits.

---

### 3. Knowledge Tabs — Problems & Solutions
Five educational sections, each with:
- **Stat cards** — key research figures
- **Threat Vectors column** — common digital problems
- **Countermeasures column** — evidence-based solutions
- **Quick tips** — pill-style action reminders

| Tab | Focus area |
|---|---|
| Screen time | Scrolling, eye strain, sedentary habits |
| Sleep | Blue light, bedtime scrolling, DND strategies |
| Social media | Comparison, doom scrolling, echo chambers |
| Focus | Notification overload, tab hoarding, Pomodoro |
| Mental health | Anxiety, nomophobia, digital loneliness |

---

### 4. Habit Tracker
An 8-item daily checklist of evidence-backed digital wellness habits:

- No phone first 30 min after waking
- 20-20-20 eye protocol
- Phone-free meal
- Screen off 90 min before bed
- 10 min offline activity
- Notifications batched (3×)
- Movement every 45 min
- No social media after 21:00

Live progress bar updates as you tick off habits.

---

### 5. Pomodoro Focus Timer
A fully functional countdown timer with:
- **Three modes:** Focus 25 min · Short break 5 min · Long break 15 min
- Circular SVG progress ring with neon glow
- Start / Pause / Resume / Reset controls
- Daily session counter slider
- Focus goal tracker (minutes completed vs. target)
- Progress bar showing goal completion percentage

---

### 6. Mood Log
Track emotional state across the day:
- Five mood states: Thriving · Good · Neutral · Stressed · Drained
- Optional free-text note per entry
- Timestamped log of all entries for the session
- Visual icons for quick recognition

---

### 7. Self-Check — Vulnerability Scan
An 8-question self-assessment covering:
- Morning phone checking habits
- Nomophobia signs
- Bedtime device use
- Attention span issues
- Social comparison
- Notification checking during meals
- Information overload
- Unintended screen time overruns

Results display as colour-coded **threat levels:**

| Score | Threat level | Colour |
|---|---|---|
| 0–1 | Minimal | Green |
| 2 | Low | Green |
| 3–4 | Moderate | Yellow |
| 5–6 | High | Orange |
| 7–8 | Critical | Red |

---

## Design & Theme

### Hacker / Terminal Aesthetic
- **Background:** Deep black (`#020d02`) with animated matrix rain canvas
- **Font:** Share Tech Mono (monospace terminal font via Google Fonts)
- **Primary colour:** Neon green `#00ff41` with text-shadow glow effects
- **Accent colours:** Red `#ff003c` for threats, yellow `#ffcc00` for warnings, cyan `#00cfff` for info
- **Live clock:** HH:MM:SS system clock in the header
- **Language:** Terminal-style — `[CRITICAL]`, `[ EXECUTE ]`, `// comments`, `THREAT VECTORS`, `COUNTERMEASURES`

### Matrix Rain
A `<canvas>` element sits behind all content with continuously falling Japanese katakana and alphanumeric characters rendered at low opacity (`0.07`), animating at 50ms intervals.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | Plain HTML5 |
| Styling | Vanilla CSS with CSS custom properties |
| Logic | Vanilla JavaScript (no frameworks) |
| Icons | Tabler Icons outline webfont |
| Font | Share Tech Mono via Google Fonts |
| Animation | Canvas API (matrix rain) |

**No build step. No npm. No framework. No backend.**
The entire app is a single HTML fragment that runs in any modern browser.

---

## File Structure

```
digital-wellbeing-hub/
│
├── index.html          ← The entire app (single file)
├── README.md           ← This file
```

---

## How to Run

### Option A — Open directly
Save the HTML as `index.html` and open it in any modern browser. No server required.

### Option B — Local server (recommended)
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .
```
Then visit `http://localhost:8080`.

---

## Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | Fully supported |
| Firefox 88+ | Fully supported |
| Safari 14+ | Fully supported |
| Edge 90+ | Fully supported |

---

## Tab Reference

| Tab key | Label | Description |
|---|---|---|
| `alarms` | ALARMS | Live alerts + configurable alarm rules |
| `timers` | APP TIMERS | Per-app daily limits for 8 social apps |
| `screen` | SCREEN | Screen time problems and countermeasures |
| `sleep` | SLEEP | Sleep hygiene education |
| `social` | SOCIAL | Social media impact and strategies |
| `focus` | FOCUS | Attention and deep work guidance |
| `mental` | MENTAL | Mental health and digital anxiety |
| `habits` | HABITS | Daily habit checklist with progress bar |
| `pomo` | TIMER | Pomodoro focus timer with goal tracker |
| `mood` | MOOD | Mood logging with timestamped entries |
| `checker` | SCAN | Self-assessment vulnerability scanner |

---

## Customisation

### Adding a new app to timers
Add a new `<div class="app-timer-row">` block inside `#tab-timers` with the app name, icon class, usage, and limit values.

### Adjusting alarm defaults
Edit the `value` attributes on the `<input class="ath">` elements inside each `.alarm-row` in the Alarms tab.

### Changing matrix rain density
Adjust the column character width (currently `14px`) in the `drawMatrix` script:
```javascript
const cols = Math.floor(canvas.width / 14); // lower = denser
```

### Changing matrix speed
Adjust the interval in milliseconds (currently `50`):
```javascript
setInterval(drawMatrix, 50); // lower = faster
```

---

## Accessibility

- Screen reader `<h2 class="sr-only">` summary at the top of the widget
- All toggle inputs have `aria-label` attributes
- Decorative icons carry `aria-hidden="true"`
- Colour is never the sole indicator of status — labels and text accompany every colour state

---

## Roadmap / Possible Extensions

- [ ] Persistent storage using `localStorage` to save habits and mood across sessions
- [ ] Weekly usage chart (bar chart of daily totals)
- [ ] Export mood log as CSV
- [ ] Custom app addition (user-defined app name + icon)
- [ ] Push notifications via the Web Notifications API
- [ ] Dark/light theme toggle (currently dark-only)
- [ ] Onboarding flow for first-time users

---

## License

This project is open for personal and educational use. No warranty is provided.

---

*Built with care for digital wellbeing — one focused session at a time.*
