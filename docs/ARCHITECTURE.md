# KRAVV OS — Architecture

> Status: Living document  
> Stage: V0.1 / Early Prototype  
> Purpose: Define the system boundaries, data flow, integration rules, and technical direction of KRAVV OS without over-engineering the first version.

---

## 1. Architecture Goal

KRAVV OS should act as a personal operating layer that connects multiple external systems into one stable internal model.

The core rule is:

> **External services are data sources. KRAVV owns the internal model.**

KRAVV should be able to change providers later without forcing the entire application to be rewritten.

Examples:

- Huawei Health can later be replaced or complemented by another health provider.
- Moodle or Open edX can later be replaced by another learning source.
- Calendar, GitHub, Archive Tone, notes, finance, and other systems can be added gradually.
- The frontend should not depend directly on raw provider responses.
- AI should reason from KRAVV-normalized data, not directly from arbitrary third-party payloads.

---

## 2. High-Level Architecture

```text
┌──────────────────────────────────────────────────────────┐
│                    EXTERNAL SOURCES                      │
│                                                          │
│ Study       Health       Events       Music      Future  │
│ LMS/API     Huawei       Calendar     Archive    Sources │
│                                      Tone                │
└────────┬──────────┬────────────┬───────────┬──────────────┘
         │          │            │           │
         ▼          ▼            ▼           ▼
┌──────────────────────────────────────────────────────────┐
│                       CONNECTORS                         │
│                                                          │
│ Provider-specific auth, fetching, parsing, mapping       │
└──────────────────────────┬───────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│                      NORMALIZATION                       │
│                                                          │
│ Provider payloads -> KRAVV internal models               │
└──────────────────────────┬───────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│                        KRAVV CORE                        │
│                                                          │
│ Application logic                                        │
│ Sync orchestration                                       │
│ Personal history                                         │
│ Derived metrics                                          │
│ Cross-domain context                                     │
└───────────────┬───────────────────────────────┬──────────┘
                │                               │
                ▼                               ▼
       ┌────────────────┐              ┌────────────────┐
       │    DATABASE    │              │    AI LAYER    │
       │                │              │                │
       │ normalized     │              │ insights       │
       │ personal data  │              │ summaries      │
       │ history        │              │ reasoning      │
       └───────┬────────┘              └───────┬────────┘
               │                               │
               └──────────────┬────────────────┘
                              ▼
                    ┌──────────────────┐
                    │     KRAVV API    │
                    └────────┬─────────┘
                             ▼
                    ┌──────────────────┐
                    │     FRONTEND     │
                    │ Dashboard / UI   │
                    └──────────────────┘
```

---

## 3. V0.1 Development Strategy

Do not build the complete architecture at once.

The first technical goal is to prove one complete path:

```text
Mock Study Data
      ↓
KRAVV Backend
      ↓
Normalization
      ↓
Database
      ↓
KRAVV API
      ↓
Frontend
```

Then replace the mock source with one real external Study connector.

The order should be:

1. Frontend shell
2. Backend shell
3. Mock Study data
4. Internal Study model
5. Frontend reads backend data
6. Database persistence
7. First real Study connector
8. Health connector
9. Events connector
10. AI reasoning layer
11. Additional modules

The first milestone is not "many features."

The first milestone is:

> **Data enters KRAVV, becomes normalized, is stored, and appears correctly in the interface.**

---

## 4. Recommended Repository Shape

The exact stack may evolve, but the logical boundaries should remain clear.

### Implemented V0.1 boundaries

- `apps/web`: Next.js App Router with TypeScript. The browser calls same-origin
  `/api/*` routes forwarded by Next.js to the local FastAPI service.
- `apps/api/kravv`: FastAPI routes, the Pydantic Study model, SQLite storage,
  and a small mock connector. No separate connector framework or shared package.
- `apps/api/fixtures`: initial seed and mock source JSON. Only the connector
  understands this source shape; the frontend receives normalized Study fields.
- `apps/api/data/kravv.sqlite3`: ignored local database, stored independently of
  either server process. The seed runs only when no Study record exists.

V0.1 stores the latest snapshot of one course, keyed by `(source, external_id)`.
The normalized record is stored as validated JSON in SQLite; historical snapshots
and multi-course queries are deferred. Progress is completed topics / total topics,
rounded to the nearest whole percentage (half up). Timestamps retain a timezone.

`GET /api/status`, `GET /api/study`, and `POST /api/study/sync` are implemented.
Sync reads and validates the complete mock source before writing in a transaction.
Repeated identical input does not duplicate the course or increase completion;
it refreshes `synced_at`. Source errors retain the last successful record.
Changing course identity is rejected in this single-course prototype.

The default seed is 5/12 (42%). The mock source is 6/12 (50%). Editing that source
file and syncing demonstrates data movement without an artificial increment API.
Backend tests isolate their database and source in temporary directories.

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
│   ├── web/                 # frontend
│   └── api/                 # backend
│
├── packages/
│   ├── domain/              # internal models / shared types
│   ├── connectors/          # provider integrations
│   └── shared/              # shared utilities
│
├── infra/                   # Docker / deployment files later
│
├── .env.example
├── docker-compose.yml
└── package.json / workspace config
```

This structure is a direction, not a hard requirement for V0.1.

If a simpler single-app structure is faster for the prototype, prefer simplicity.

---

## 5. Frontend

The frontend is responsible for presentation and interaction.

It should:

- render normalized KRAVV data,
- call KRAVV APIs,
- display sync states,
- handle navigation,
- manage local UI state,
- provide the KRAVV OS visual language,
- avoid provider-specific business logic.

The frontend should not directly understand raw Huawei, Moodle, Open edX, or Archive Tone payloads.

Bad:

```text
Frontend -> Huawei API
Frontend -> Moodle API
Frontend -> Archive Tone API
```

Preferred:

```text
Frontend -> KRAVV API -> Connector -> Provider
```

This keeps the UI stable even if providers change.

---

## 6. Backend

The backend is the main application boundary.

Responsibilities may include:

- API endpoints
- connector orchestration
- normalization
- persistence
- sync state
- derived metrics
- personal history
- AI context preparation
- future authentication
- future background jobs

The backend should stay modular.

Provider-specific code should live behind connector boundaries.

---

## 7. Connector Architecture

Each external service should behave like an adapter.

Conceptually:

```text
StudyConnector
HealthConnector
EventsConnector
MusicConnector
```

A connector may contain:

```text
authenticate()
fetch()
map()
sync()
status()
```

Exact interfaces can be defined when the first real connector is implemented.

Example:

```text
Moodle API
   ↓
MoodleConnector
   ↓
KRAVV Study Model
```

Later:

```text
Open edX API
   ↓
OpenEdXConnector
   ↓
KRAVV Study Model
```

The Study UI should not care which provider supplied the data.

---

## 8. Normalized Data Model

KRAVV should define its own domain models.

Initial conceptual models:

```text
Study
Health
Event
Music
```

### Study

Possible fields:

```text
course
subject
module
topic
completion
score
time_spent
last_activity
source
external_id
```

### Health

Possible fields:

```text
metric_type
value
unit
recorded_at
source
external_id
```

### Event

Possible fields:

```text
title
start_time
end_time
category
status
source
external_id
```

### Music

Future example:

```text
track
artist
album
playlist
playback_state
played_at
source
external_id
```

These schemas are intentionally conceptual for now.

Create a dedicated data model document only after actual implementation makes the structure concrete.

---

## 9. Database

V0.1 does not require a complex database.

The first database should optimize for:

- local development
- easy migration
- fast iteration
- inspectable data
- reliable persistence

SQLite is acceptable for the earliest prototype.

PostgreSQL becomes useful when:

- concurrency matters,
- remote hosting begins,
- data volume increases,
- richer querying becomes necessary,
- background sync grows more complex.

Do not migrate only because PostgreSQL sounds more "production."

---

## 10. Sync Model

External sources should not be assumed to update KRAVV continuously.

V0.1 may use manual sync.

Example:

```text
[ Sync Study Data ]
```

Flow:

```text
User requests sync
      ↓
Backend calls connector
      ↓
Connector fetches provider data
      ↓
Data is normalized
      ↓
Database is updated
      ↓
Frontend receives new state
```

Later sync strategies may include:

- scheduled sync
- provider webhooks
- background jobs
- event-based refresh

Do not add background infrastructure until needed.

---

## 11. Source Tracking

Normalized data should retain source metadata.

Example:

```text
source: "moodle"
external_id: "course_123"
synced_at: "..."
```

This helps with:

- debugging
- preventing duplicates
- updating records
- provider migration
- sync history
- auditing unexpected values

KRAVV owns the normalized record while still remembering where it came from.

---

## 12. AI Architecture

AI is not the first dependency.

The system should work without AI.

Later:

```text
KRAVV Data
    ↓
Context Builder
    ↓
AI Model
    ↓
Structured Insight
    ↓
Frontend
```

The AI layer should primarily consume:

- normalized data
- derived metrics
- selected history
- user context
- relevant current events inside KRAVV

It should not receive every raw record by default.

The context builder should decide what information is relevant.

---

## 13. AI Output Types

Potential outputs:

```text
Daily Brief
Weekly Review
Study Insight
Schedule Summary
Cross-Domain Pattern
Question Answering
```

Examples:

```text
Sleep duration was lower than your recent baseline,
while study activity also decreased.
```

or:

```text
You completed two Mathematics topics this week.
Conditional Probability is currently the active topic.
```

AI should distinguish observed data from interpretation.

---

## 14. Local-First Development

KRAVV OS should be easy to run locally.

Current milestone runs directly on the local machine using Node.js and a Python
virtual environment. Both services bind to `127.0.0.1`. Docker and WSL2 are not
required for the mock loop; no production deployment is configured.

Possible later environment:

```text
Windows
   ↓
WSL2 Ubuntu
   ↓
Docker
   ↓
KRAVV services
```

Local development allows:

- zero-cost experimentation,
- fast connector testing,
- local AI experimentation,
- direct database inspection,
- safer prototyping before internet exposure.

Remote hosting can be considered later.

---

## 15. Docker

Docker may be used for:

- KRAVV backend
- database
- Moodle
- Open edX
- supporting services

Do not containerize something only for ceremony.

For V0.1, use Docker where it genuinely simplifies setup or isolates dependencies.

---

## 16. Study Integration Strategy

Study is the first external integration target.

Candidate sources:

```text
Moodle
Open edX
KRAVV-native mock/manual data
```

The integration test should prove:

```text
Complete / update something in Study source
                ↓
Sync KRAVV
                ↓
KRAVV reads changed state
                ↓
Normalized data changes
                ↓
Dashboard changes
```

Example:

```text
TKA Mathematics

Progress
42% -> 50%

Completed
5/12 -> 6/12
```

That is the first meaningful integration proof.

---

## 17. Health Integration Strategy

Initial candidate:

```text
Huawei Health / Health Kit
```

Possible flow:

```text
Huawei data
    ↓
Huawei connector
    ↓
KRAVV Health model
    ↓
Database
    ↓
Health dashboard
    ↓
AI context later
```

Access will depend on supported APIs, permissions, region, account setup, and available device metrics.

KRAVV should not assume every metric is always available.

---

## 18. Events Integration Strategy

Events may initially support:

- manual KRAVV events
- calendar import
- external calendar connectors later

Normalized events should allow the rest of KRAVV to reason about time.

Example:

```text
Tomorrow:
09:00 Mathematics
13:00 Project Discussion
19:00 Gym
```

This context may later influence Study or AI suggestions.

---

## 19. Music Integration Strategy

Archive Tone is a future candidate source.

Potential architecture:

```text
Archive Tone
     ↓
Music Connector
     ↓
KRAVV Music Model
     ↓
Now Playing / Library Context / Focus Music
```

Do not integrate it until the core Study data path is proven.

Music should remain a modular connector rather than becoming a dependency of KRAVV Core.

---

## 20. System Status

Each connector should eventually expose health/status information.

Example:

```text
Study Engine      synced 2 min ago
Huawei Health     synced 5 min ago
Calendar          synced 1 min ago
Archive Tone      connected
```

A provider outage should not crash unrelated KRAVV modules.

---

## 21. Failure Isolation

External integrations will fail sometimes.

Possible causes:

- expired token
- provider downtime
- network failure
- changed API response
- permission revoked
- missing metric
- rate limit

KRAVV should fail gracefully.

Example:

```text
Health data unavailable
Last successful sync: 08:42
```

Study and Events should continue working.

---

## 22. Provider Independence

Avoid this:

```text
study_progress_huawei
moodle_percentage
edx_unit_id
```

Prefer this:

```text
progress
source
external_id
```

Provider-specific fields should stay inside connector-specific layers unless they represent a genuinely useful domain concept.

---

## 23. Configuration and Secrets

Secrets must not be committed to Git.

Use environment variables or local secret storage for:

```text
API keys
OAuth secrets
access tokens
database credentials
AI provider keys
```

Repository should contain:

```text
.env.example
```

but not real credentials.

---

## 24. Authentication

V0.1 is personal and local-first.

Complex multi-user authentication is not required immediately.

Authentication should be revisited when:

- KRAVV becomes remotely accessible,
- data leaves the local machine,
- multiple users are supported,
- external provider OAuth requires hosted callbacks.

Do not build enterprise identity infrastructure during the prototype stage.

---

## 25. API Design

The frontend should communicate with KRAVV through stable domain endpoints.

Conceptual examples:

```text
GET /api/dashboard
GET /api/study
POST /api/study/sync

GET /api/health
POST /api/health/sync

GET /api/events
POST /api/events/sync
```

Exact routes can evolve.

Prefer APIs shaped around KRAVV concepts rather than provider concepts.

---

## 26. Observability

V0.1 needs basic visibility, not a monitoring platform.

Useful development information:

```text
connector called
sync started
sync succeeded
sync failed
records updated
provider response error
```

Simple structured logs are enough initially.

---

## 27. Testing Priorities

The most important tests are around boundaries.

Test:

- normalization
- connector mapping
- API contracts
- sync behavior
- database persistence
- failure handling

For the frontend, prioritize:

- key dashboard rendering
- loading states
- sync states
- error states

Avoid spending excessive time snapshot-testing purely decorative UI.

---

## 28. What Not to Build Yet

Avoid introducing these without a real requirement:

- microservices
- Kubernetes
- event streaming infrastructure
- distributed queues
- elaborate plugin marketplaces
- multiple databases
- complex caching layers
- vector databases by default
- autonomous agents
- real-time websockets everywhere
- enterprise multi-tenancy

KRAVV OS should earn complexity.

---

## 29. Architectural Decision Rule

When choosing between two implementations, prefer the simpler one if both:

- satisfy the current requirement,
- preserve provider independence,
- can be changed later without major damage.

Architecture should make future change possible without making the present unnecessarily complicated.

---

## 30. V0.1 Success Criteria

Architecture V0.1 is proven when all of this works:

```text
1. KRAVV frontend runs.
2. KRAVV backend runs.
3. Frontend can call backend.
4. Study mock data is normalized.
5. Data persists.
6. Dashboard displays it.
7. A sync action changes visible state.
8. One real Study provider can later replace the mock source
   without redesigning the frontend.
```

That is enough.

Everything else can grow from there.

---

## 31. North Star

KRAVV OS architecture should feel boring in the right places.

Connectors may change.

Providers may disappear.

The interface may evolve.

AI models will change.

The internal KRAVV concepts should remain understandable.

> **Stable core, replaceable edges.**
