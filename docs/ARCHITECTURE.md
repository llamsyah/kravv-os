# ALLVERRA ROOM — Architecture

**Document:** `docs/ARCHITECTURE.md`  
**Status:** Active baseline  
**Version:** V0.1  
**Purpose:** Define how ALLVERRA ROOM is structured technically, how data moves through the system, and which responsibilities belong to n8n, the backend, the database, AI, and the frontend.

---

## 1. Architecture Goal

ALLVERRA ROOM is a **local-first personal system**.

The architecture should optimize for:

- one primary user,
- low operating cost,
- easy local development,
- understandable data flow,
- modular growth,
- replaceable providers,
- simple maintenance,
- clear separation of responsibilities.

The system should remain useful even when:

- AI is unavailable,
- a provider API is unavailable,
- n8n is temporarily stopped,
- a source is disconnected,
- the laptop was offline for hours or days.

---

# 2. High-Level System

```text
External Sources
  ├─ Study source
  ├─ Huawei / Health source
  ├─ Calendar / Context source
  ├─ GitHub / Projects source (future)
  └─ other sources (future)
        ↓
      n8n
  fetch / schedule / filter / dedupe / prepare
        ↓
ALLVERRA Ingestion API
        ↓
Backend domain layer
  validate
  normalize
  map source data
  derive safe deterministic values
        ↓
Local Database
        ↓
Domain APIs
  /api/home
  /api/study
  /api/health
  /api/context
  /api/insights
        ↓
Frontend
```

AI is a separate reasoning layer attached after normalization.

---

# 3. Responsibility Boundaries

## 3.1 n8n

n8n is the **acquisition and orchestration layer**.

n8n is responsible for:

- scheduled sync,
- startup / catch-up sync,
- provider HTTP requests,
- OAuth / token workflow where practical,
- basic filtering,
- deduplication at transport level,
- preparing payloads,
- triggering downstream ALLVERRA ingestion,
- optional external notifications.

n8n should be visually understandable.

The owner should be able to inspect a workflow and understand:

```text
Trigger
→ Fetch
→ Filter
→ Prepare
→ Send to ALLVERRA
```

n8n should **not** own ALLVERRA domain semantics.

Example:

n8n may know:

```text
source = "huawei"
fetched_at = "..."
payload = {...}
```

n8n should not permanently own the rule:

```text
Huawei field X means ALLVERRA metric Y
```

That belongs in the ALLVERRA backend.

---

## 3.2 ALLVERRA Backend

The backend is the **meaning layer**.

It is responsible for:

- validation,
- source mapping,
- normalization,
- canonical field names,
- deduplication at domain level,
- persistence,
- derived metrics,
- Home view models,
- domain endpoints,
- AI context preparation,
- error handling.

The backend decides:

> What does this data mean inside ALLVERRA?

---

## 3.3 Database

The database is the **source of truth for normalized ALLVERRA data**.

The frontend should read ALLVERRA data from the backend, not directly from:

- n8n,
- Huawei,
- Study providers,
- Calendar providers,
- AI providers.

V0.1 may use SQLite.

The database can later migrate to PostgreSQL if needed.

---

## 3.4 Frontend

The frontend is the **experience layer**.

It should:

- consume normalized ALLVERRA APIs,
- render real data,
- keep domain visual language separate,
- handle loading / empty / error states,
- never depend on provider-specific schemas,
- never depend directly on n8n output.

The frontend should not know whether Study came from:

- fixture data,
- Moodle,
- Open edX,
- a custom provider,
- another future source.

---

## 3.5 AI

AI is the **reasoning layer**.

AI is not responsible for:

- fetching raw provider data,
- cleaning thousands of raw samples,
- storing source data,
- replacing deterministic calculations.

AI receives prepared context.

Example:

```text
Raw Health samples
→ backend aggregation
→ daily values + baseline
→ context builder
→ AI
→ structured insight
→ save insight
```

---

# 4. Local-First Runtime

V0.1 is designed to run on the owner's laptop.

Expected environment:

```text
Windows
└─ WSL2
   └─ Docker
      ├─ web
      ├─ api
      ├─ database
      └─ n8n
```

The exact service packaging may evolve.

The important rule is:

> Local-first is the default deployment model.

Cloud hosting is optional future infrastructure.

---

# 5. Suggested Repository Structure

A simple structure is preferred.

```text
allverra-room/
├─ apps/
│  ├─ web/
│  └─ api/
│
├─ packages/
│  └─ domain/          # optional shared types / schemas
│
├─ automation/
│  └─ n8n/
│
├─ data/
│  └─ fixtures/
│
├─ docs/
│  ├─ PRODUCT.md
│  ├─ DESIGN.md
│  ├─ ARCHITECTURE.md
│  └─ decisions/
│
├─ docker-compose.yml
├─ README.md
└─ AGENTS.md
```

Do not create extra packages until they are useful.

---

# 6. Provider Independence

Every provider should enter through an adapter / connector boundary.

Example:

```text
Provider payload
      ↓
Provider adapter
      ↓
Normalized ALLVERRA model
```

The UI should depend only on normalized models.

Bad:

```text
Home component
→ Huawei-specific JSON
```

Good:

```text
Home component
→ ALLVERRA health model
```

---

# 7. Ingestion Contract

n8n should send a predictable envelope.

Example:

```json
{
  "source": "huawei",
  "fetched_at": "2026-10-04T10:00:00+07:00",
  "payload": {}
}
```

The backend then:

1. validates the source,
2. validates the payload,
3. maps it,
4. normalizes it,
5. deduplicates it,
6. persists it.

Provider-specific payloads should stay behind ingestion boundaries.

---

# 8. Sync Strategy

The system should support three sync modes.

## 8.1 Startup / Catch-Up Sync

When the local environment starts:

```text
start
↓
check last successful sync
↓
determine missing period
↓
fetch historical range if provider supports it
↓
ingest
↓
update sync state
```

This avoids requiring the laptop to run 24/7.

---

## 8.2 Scheduled Sync

While the laptop is running, n8n may trigger periodic sync.

Examples:

- Health every few hours,
- Context at startup and periodically,
- Study after likely learning windows,
- final evening sync before recap.

The exact cadence should remain configurable.

---

## 8.3 Manual Sync

Manual sync is useful during:

- development,
- debugging,
- provider testing,
- temporary V0.1 workflows.

It should remain secondary in the UI.

---

# 9. Sync State

Track synchronization explicitly.

Suggested fields:

```text
source
last_attempt_at
last_success_at
status
records_received
records_written
error_message
```

A failed sync should not destroy previously stored data.

---

# 10. Study Domain

Study is the first functional proof.

Suggested normalized concepts:

```text
study_source
course
subject
topic
progress
session
daily_activity
last_activity
synced_at
```

Do not define fields before they are useful.

V0.1 may begin with:

- subject,
- topic,
- progress,
- last_activity,
- source,
- external_id,
- synced_at.

Later, daily history can support the weekly contribution visualization properly.

---

# 11. Health Domain

Health should normalize provider-specific data into stable internal metrics.

Possible normalized concepts:

```text
health_daily
movement_daily
sleep_daily
heart_rate_summary
hrv_summary
spo2_summary
exercise_session
```

Raw high-frequency samples may be stored separately only when useful.

Home should not query thousands of raw samples.

Prefer derived daily summaries.

---

# 12. Context Domain

Context may contain:

```text
event
calendar_item
deadline
note
daily_annotation
```

Event and Note should remain separate entities even if they are shown together.

Context may later be used by AI to explain patterns.

---

# 13. Home API

Home should receive a compact view model.

Example:

```json
{
  "date": "2026-10-04",
  "highlight": {
    "domain": "study",
    "title": "Mathematics",
    "subtitle": "Conditional Probability",
    "progress": 50
  },
  "week": {
    "study": {},
    "health": {},
    "context": {}
  }
}
```

Home should not assemble data from many provider endpoints in the browser.

The backend prepares Home data.

---

# 14. Domain APIs

Suggested early routes:

```text
GET  /api/home

GET  /api/study
POST /api/study/sync

GET  /api/health
POST /api/health/sync

GET  /api/context
POST /api/context/sync
```

These are conceptual.

Use the framework's existing route conventions.

Do not create endpoints that are not yet needed.

---

# 15. AI Pipeline

V0.1 should use a deterministic pipeline.

Example:

```text
load normalized data
↓
filter relevant records
↓
calculate deterministic metrics
↓
build compact context
↓
call model
↓
validate structured output
↓
save insight
```

AI is one step in the pipeline.

It is not the pipeline.

---

# 16. AI Context Rules

Do not send:

- complete raw wearable dumps,
- full database history,
- every event,
- every note,
- unnecessary provider metadata.

Prefer compact context.

Example:

```json
{
  "sleep_today_minutes": 402,
  "sleep_baseline_7d_minutes": 438,
  "resting_hr_today": 64,
  "study_minutes_today": 74,
  "study_topic": "Conditional Probability",
  "upcoming_events": 1
}
```

---

# 17. AI Output

Prefer structured output.

Example:

```json
{
  "summary": "...",
  "signals": [],
  "confidence": 0.82
}
```

Validate before saving.

The frontend should read saved insights from ALLVERRA.

Opening Home should not automatically trigger a model call.

---

# 18. Cost Control

Track model usage.

Suggested table:

```text
ai_usage
model
pipeline
input_tokens
output_tokens
estimated_cost
created_at
```

Routine AI work should use an economical model.

More expensive reasoning models should be reserved for genuinely complex analysis.

---

# 19. Startup Experience

The owner should not need a development ritual every day.

Target experience:

```text
Windows starts
↓
Docker starts
↓
ALLVERRA services start
↓
n8n workflows become available
↓
catch-up sync runs
↓
Home opens with stored data
↓
fresh data updates when available
```

A one-click launcher may be added later.

---

# 20. Persistence

All important ALLVERRA state must survive restarts.

Use persistent Docker volumes or host-mounted storage for:

- database,
- n8n state,
- other required local application data.

Do not store important state only inside ephemeral containers.

---

# 21. Backups

V0.1 should eventually support a simple backup strategy.

At minimum:

- database file backup,
- n8n workflow export,
- environment configuration documented,
- assets stored in the repo where appropriate.

Do not over-engineer backup infrastructure.

---

# 22. Secrets

Secrets should stay outside Git.

Use environment variables / local secret files.

Examples:

- provider tokens,
- API keys,
- AI keys.

Do not expose secrets to the frontend.

---

# 23. Logging

Logging should make data flow understandable.

Useful logs:

```text
sync started
records fetched
records accepted
records normalized
records persisted
sync finished
AI analysis started
AI output validated
```

Avoid logging sensitive raw personal data unnecessarily.

---

# 24. Error Handling

Errors should be local and recoverable.

Examples:

- provider unavailable,
- invalid payload,
- token expired,
- network unavailable,
- AI unavailable.

The app should retain previously stored data.

Provider failure should not break the Home page entirely.

---

# 25. Data History

Where useful, keep history.

Do not overwrite everything with only the current value if future trends require history.

Examples where history matters:

- Study daily activity,
- movement,
- sleep,
- events,
- AI insight history.

V0.1 can begin small and add migrations later.

---

# 26. Database Evolution

Use migrations once the schema becomes meaningful.

Do not rely on deleting the database whenever a field changes.

The system is intended to live for years.

Schema changes should preserve accumulated personal history.

---

# 27. Observability

The owner should be able to understand:

- when data last synced,
- whether a source failed,
- what the AI pipeline ran,
- how much AI usage occurred.

This information belongs in Settings / Debug surfaces.

Do not clutter Home with infrastructure status.

---

# 28. Security Boundary

V0.1 is local-first.

Services should not be exposed publicly by default.

Prefer binding internal services to localhost / the local environment.

If remote access is added later, security must be revisited explicitly.

---

# 29. What Not to Build Yet

Do not add prematurely:

- Kubernetes,
- microservices,
- message queues,
- event streaming platforms,
- distributed caching,
- enterprise auth,
- multi-tenancy,
- public APIs,
- complex agent frameworks,
- autonomous background agents.

V0.1 is one person's system.

Keep it understandable.

---

# 30. Future Expansion

Potential future domains:

- Projects,
- GitHub,
- Knowledge,
- Finance,
- Career,
- Campus,
- Music,
- Archive.

A new domain should plug into the same architecture:

```text
source
→ n8n / connector
→ ingestion
→ normalize
→ persist
→ API
→ domain UI
```

---

# 31. Architecture Acceptance Criteria

The V0.1 architecture is healthy if:

1. the frontend can run without knowing provider schemas,
2. n8n can be removed temporarily without destroying stored data,
3. AI can be disabled without breaking core functionality,
4. source data can change without requiring a Home redesign,
5. data persists across restarts,
6. missed syncs can catch up later,
7. one provider failure does not break unrelated domains,
8. the system remains understandable to one developer,
9. adding a future domain does not require rewriting the whole application,
10. local operation remains inexpensive.

---

## Architecture rule in one sentence

> **n8n moves data, ALLVERRA gives it meaning, the database remembers it, and the UI makes it useful.**
