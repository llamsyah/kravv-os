# KRAVV OS

**KRAVV OS** is a personal operating system in the fictional **KRAVVIENT** product family.

It is designed to connect fragmented personal data such as learning progress, health signals, events, and future personal tools into one coherent interface and reasoning layer.

> **KRAVV-IENT is the boardroom terminal. KRAVV OS is the living cockpit.**

---

## Status

**Stage:** Early prototype / V0.1

KRAVV OS is currently being built as a local-first personal system.

The first goal is intentionally small:

```text
Study data
    ↓
KRAVV backend
    ↓
normalized model
    ↓
local persistence
    ↓
KRAVV API
    ↓
frontend
```

The project is not trying to become a complete platform immediately.

---

## Why KRAVV OS Exists

Personal data is usually split across separate applications:

- learning progress in an LMS,
- health data in wearable ecosystems,
- deadlines and schedules in calendars,
- code activity in GitHub,
- music in another application,
- notes and research elsewhere.

Each application understands only its own domain.

KRAVV OS aims to become a **personal command center** that can:

- collect relevant data,
- normalize it,
- preserve personal history,
- connect signals across domains,
- present useful context,
- support an AI reasoning layer later.

KRAVV does **not** need to replace every external app.

External tools remain good at their own jobs.

KRAVV connects them.

---

## Initial Domains

### Study

The first integration target.

KRAVV should eventually understand:

- course / subject,
- module / topic,
- completion,
- current learning position,
- study activity,
- quiz or exercise results,
- learning history.

Possible sources include Moodle, Open edX, or other usable learning APIs.

---

### Health

Initial candidate source:

- Huawei Health / Health Kit

Potential signals include:

- sleep,
- steps,
- exercise,
- heart rate,
- resting heart rate,
- other supported wearable metrics.

KRAVV should display trends and context, not act as a medical diagnostic system.

---

### Events

KRAVV should understand time-based context such as:

- calendar events,
- school activities,
- deadlines,
- study plans,
- project milestones,
- daily priorities.

---

## Future Modules

Possible future integrations include:

```text
GitHub
Projects
Notes / Knowledge
Archive Tone / Music
Finance
Personal research
Other personal data sources
```

These are future directions, not current V0.1 commitments.

---

## Product Philosophy

KRAVV OS follows a few core ideas:

- **personal-first**
- **integration over duplication**
- **provider-independent internal models**
- **useful before impressive**
- **AI after meaningful data exists**
- **progressive complexity**
- **local-first experimentation**
- **living documentation**

The architecture follows one important rule:

> **External services are data sources. KRAVV owns the internal model.**

---

## Visual Direction

KRAVV OS shares visual DNA with KRAVVIENT but intentionally has a different personality from KRAVV-IENT.

### KRAVV-IENT

- corporate
- analytical
- restrained
- dense
- terminal-like

### KRAVV OS

- personal
- adaptive
- interactive
- ambient
- animated
- expressive but controlled

The interface is dark-first, blue-led, and may use controlled glassmorphism, subtle motion, contextual surfaces, and lightweight ambient effects.

Detailed visual rules live in [`docs/DESIGN.md`](docs/DESIGN.md).

---

## Architecture

High-level direction:

```text
External Sources
      ↓
Connectors
      ↓
Normalization
      ↓
KRAVV Core
   ↙       ↘
Database   AI Layer
   ↘       ↙
    KRAVV API
        ↓
     Frontend
```

Provider-specific data should stay behind connectors.

The frontend should consume KRAVV domain data rather than raw third-party API responses.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## V0.1 Target

The first usable prototype should include:

- KRAVV frontend shell,
- KRAVV backend,
- Study card,
- Health card,
- Events card,
- AI insight placeholder,
- mock Study data,
- local persistence,
- one visible sync flow.

Example proof:

```text
TKA Mathematics

Progress
42% -> 50%

Completed
5 / 12 -> 6 / 12
```

If this change can travel from a source through KRAVV and appear correctly in the UI, the first architecture loop is proven.

---

## Repository Direction

Current structure:

```text
kravv-os/
│
├── AGENTS.md
├── README.md
│
├── docs/
│   ├── PRODUCT.md
│   ├── DESIGN.md
│   └── ARCHITECTURE.md
│
├── apps/
│   ├── web/                 # Next.js UI and local API forwarding
│   │   ├── app/             # Page, layout, styles, design tokens
│   │   ├── components/      # Dashboard
│   │   └── lib/             # Normalized API contract and client
│   └── api/
│       ├── kravv/           # FastAPI, model, persistence, mock connector
│       ├── fixtures/        # Seed and current mock source
│       ├── tests/           # Boundary and persistence tests
│       └── data/            # Local SQLite file (ignored)
│
├── package.json
└── package-lock.json
```

Shared packages and infrastructure folders are deferred until they have a real use.

---

## Documentation

The core project documents are:

- [`docs/PRODUCT.md`](docs/PRODUCT.md)  
  Product identity, scope, priorities, and feature direction.

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)  
  Data flow, connectors, backend boundaries, sync strategy, and technical principles.

- [`docs/DESIGN.md`](docs/DESIGN.md)  
  Visual language, layout, interaction, motion, responsiveness, and design anti-patterns.

- [`AGENTS.md`](AGENTS.md)  
  Working instructions for Codex and other coding agents.

These documents are living references and should evolve when meaningful decisions change.

---

## Development

Milestone 01 uses Next.js + TypeScript, FastAPI, and SQLite. No external accounts,
AI service, Docker, or production deployment is needed. Both services stay on
the local loopback interface.

### Setup (Windows PowerShell, from the repository root)

Tested with Node.js 24 and Python 3.14. Next.js requires Node.js 20.9 or newer.

```powershell
npm.cmd ci
python -m venv apps/api/.venv
apps/api/.venv/Scripts/python.exe -m pip install -r apps/api/requirements-dev.txt
```

### Run

In one terminal, from the repository root:

```powershell
apps/api/.venv/Scripts/python.exe -m uvicorn kravv.main:app --app-dir apps/api --host 127.0.0.1 --port 8000
```

In another terminal:

```powershell
npm.cmd run dev
```

Open [KRAVV OS](http://127.0.0.1:3000). The frontend forwards `/api/*` to
`http://127.0.0.1:8000`, so browser requests remain same-origin. Backend API
documentation is available at [local API docs](http://127.0.0.1:8000/docs).
Stop either server with Ctrl+C in its terminal.

On macOS/Linux or WSL, use `npm` and `apps/api/.venv/bin/python` instead.

### Verify the Study loop

1. A fresh database starts with **5/12 topics (42%)** from `initial-study.json`.
2. Click **Sync Study data**. The mock connector reads `apps/api/fixtures/study.json`;
   the dashboard changes to **6/12 topics (50%)** and Conditional probability.
3. Sync again: the status reports no new changes and no duplicate is created.
4. Restart both services and reload: **6/12 (50%)** remains stored.
5. To demonstrate another update, edit `done`, `topic`, and `updated` in
   `apps/api/fixtures/study.json`, keeping `id` unchanged and `0 <= done <= lessons`.
   The UI changes only after sync. This fixture is mock source data, not real progress.

Persistence lives in the ignored `apps/api/data/kravv.sqlite3` file, resolved
relative to the backend code rather than the terminal's current directory.
Restarting does not reseed or overwrite it. For a fresh demo without deleting data,
stop the backend and set `KRAVV_DB_PATH` to a new absolute SQLite file path before
starting it again. `KRAVV_STUDY_SOURCE` can similarly select another fixture.
Backend overrides are process environment variables; `.env` is not auto-loaded.
The frontend optionally reads `KRAVV_API_URL` from `apps/web/.env.local`; restart
Next.js after changing it. Defaults require no environment file.

### Checks

```powershell
npm.cmd run typecheck
npm.cmd run build
apps/api/.venv/Scripts/python.exe -m pytest -c apps/api/pytest.ini apps/api/tests -q
```

Tests cover normalization, invalid input, sync updates, repeat sync, course identity,
failure preservation, API responses, and database persistence across app restarts.
The build is a local validation step; it does not deploy anything.

### Current limitations

- One mock course and its latest snapshot; no course catalog or activity history.
- Health, Events, and AI are visible placeholders with no integration or generated content.
- No background sync, authentication, external connectors, or public hosting.

Framework references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
and [FastAPI database guidance](https://fastapi.tiangolo.com/tutorial/sql-databases/).

---

## Development Rule

When choosing between a complicated solution and a simpler solution that satisfies the same current requirement:

> choose the simpler one.

KRAVV should earn complexity through real needs.

---

## Current Milestone

**Milestone 01: Make KRAVV visible and make data move.**

Success means:

```text
frontend runs
backend runs
frontend talks to backend
Study data exists
Study data persists
dashboard displays it
sync changes visible state
```

After that, replace the mock Study source with the first real connector.

---

## Project Family

```text
KRAVVIENT
│
├── KRAVV-IENT
│   └── VC-oriented intelligence product
│
└── KRAVV OS
    └── personal operating system
```

Same family.

Different purpose.

Different personality.
"# kravv-os" 
