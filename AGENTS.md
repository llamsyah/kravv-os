# AGENTS.md — KRAVV OS

## Project Identity

KRAVV OS is a personal operating system in the fictional KRAVVIENT product family.

Its purpose is to connect personal data from multiple sources into one stable internal model and interface.

KRAVV OS is not a clone of KRAVV-IENT.

KRAVV-IENT is more corporate, analytical, restrained, and terminal-like.

KRAVV OS should feel personal, adaptive, interactive, ambient, and visually alive.

---

## Read These First

Before making product, architecture, or design decisions, read the relevant source-of-truth document:

- `docs/PRODUCT.md` for product scope, priorities, and feature intent.
- `docs/ARCHITECTURE.md` for system boundaries, data flow, connectors, backend, and integration rules.
- `docs/DESIGN.md` for visual identity, layout, motion, interaction, responsive behavior, and UI anti-patterns.

Do not duplicate large sections of these documents into code comments or new documentation.

Use them as references.

---

## Current Project Stage

KRAVV OS is in early prototype / V0.1.

The goal is not to build the complete product.

The current priority is to establish one small but real working loop:

```text
Mock or external Study data
        ↓
KRAVV backend
        ↓
normalization
        ↓
persistence
        ↓
KRAVV API
        ↓
frontend
```

The first meaningful proof is that changing Study data can be synchronized and visibly reflected in the KRAVV interface.

---

## Current Product Priorities

Build in this order unless the user explicitly changes the plan:

1. frontend shell
2. backend shell
3. mock Study data
4. normalized Study model
5. frontend-backend integration
6. local persistence
7. first real Study connector
8. Health connector
9. Events connector
10. AI reasoning layer
11. optional future integrations

Possible future modules such as Music, GitHub, Notes, Finance, Projects, and Knowledge should not distract from the current milestone.

---

## Development Principles

### Prefer Simple Implementations

Choose the simplest implementation that:

- satisfies the current requirement,
- keeps provider boundaries clean,
- can be replaced later without major damage.

Do not introduce infrastructure only because it looks production-ready.

KRAVV should earn complexity.

---

### Stable Core, Replaceable Edges

External providers must sit behind connector boundaries.

The frontend should consume KRAVV domain data, not raw provider payloads.

Preferred:

```text
Frontend
   ↓
KRAVV API
   ↓
KRAVV Core
   ↓
Connector
   ↓
External Provider
```

Avoid:

```text
Frontend -> Moodle API
Frontend -> Huawei API
Frontend -> Archive Tone API
```

---

### Provider Independence

Do not design internal models around one provider.

Prefer:

```text
progress
source
external_id
```

Avoid provider-shaped fields such as:

```text
moodle_percentage
edx_unit_id
huawei_metric_blob
```

Provider-specific structures belong inside connector implementations unless the data represents a useful domain concept shared by KRAVV.

---

### Normalize Before Reasoning

AI, UI, and cross-domain logic should work from normalized KRAVV data.

Do not make the AI layer depend directly on arbitrary external API payloads.

---

## Frontend Rules

Follow `docs/DESIGN.md`.

The UI should feel like a personal living cockpit.

Important rules:

- dark-first
- blue-led visual identity
- controlled glassmorphism
- subtle ambient effects
- meaningful motion
- clear hierarchy
- reusable components
- responsive behavior
- accessible contrast

Do not generate a generic AI SaaS dashboard.

Avoid:

- excessive purple-blue gradients
- glass on every element
- neon cyberpunk styling
- dozens of charts
- unnecessary cards
- oversized marketing-style hero sections
- animation without functional meaning

The dashboard should answer:

> What matters to me right now?

---

## KRAVVIENT Visual Relationship

KRAVV OS shares family DNA with KRAVV-IENT but should not duplicate its corporate terminal aesthetic.

Shared:

- dark foundation
- blue identity
- technical clarity
- precise spacing
- clean typography

KRAVV OS adds:

- softer atmosphere
- fluid motion
- contextual surfaces
- personal elements
- optional glass
- richer interaction

Useful mental model:

> KRAVV-IENT is the boardroom terminal.  
> KRAVV OS is the living cockpit.

---

## Backend Rules

Keep provider-specific code behind connectors.

Backend responsibilities may include:

- KRAVV APIs
- normalization
- persistence
- connector orchestration
- synchronization
- derived metrics
- AI context preparation later

Do not put external provider mapping logic directly into frontend components.

---

## Connector Rules

A connector represents one external integration.

Possible examples:

```text
MoodleConnector
OpenEdXConnector
HuaweiHealthConnector
CalendarConnector
ArchiveToneConnector
```

Exact interfaces should be derived from real implementation needs.

Possible responsibilities:

```text
authenticate()
fetch()
map()
sync()
status()
```

Do not create an elaborate connector framework before the first connector exists.

---

## Data Rules

Normalized records should retain source metadata when useful.

Example:

```text
source
external_id
synced_at
```

This helps with:

- updates
- deduplication
- debugging
- provider migration
- sync history

Do not prematurely create a large universal schema.

Model only data that KRAVV currently needs.

---

## Database Rules

For early local development, a simple database is acceptable.

SQLite is valid for V0.1.

Do not migrate to a heavier database solely for prestige.

Use PostgreSQL or another database when an actual requirement appears.

---

## Sync Rules

Manual sync is acceptable in V0.1.

Example:

```text
[ Sync Study Data ]
```

Do not introduce:

- job queues
- webhooks
- real-time streaming
- background schedulers

until the product actually needs them.

Every connector should eventually fail gracefully without breaking unrelated modules.

---

## AI Rules

AI is not required for KRAVV Core to function.

Do not make basic product functionality depend on an LLM.

AI should eventually operate as a reasoning and insight layer over KRAVV data.

Good future uses:

- daily brief
- weekly review
- study insight
- schedule summary
- cross-domain pattern
- personal-data question answering

AI output should distinguish observed data from interpretation.

Do not add autonomous agents unless a concrete use case requires them.

---

## Security and Secrets

Never commit:

- API keys
- OAuth secrets
- access tokens
- passwords
- private credentials
- production secrets

Use environment variables or appropriate local secret storage.

Keep a safe `.env.example` when needed.

Do not expose local services publicly as part of normal prototype work unless the task explicitly requires remote access and the security implications are considered.

---

## Scope Control

Before adding a new feature, ask internally:

1. Is this required for the current milestone?
2. Is it already defined in `PRODUCT.md`?
3. Does it affect architecture?
4. Does it alter the design language?
5. Can it wait?

If it can wait, keep it out of the current implementation.

Do not silently expand scope.

---

## Documentation Rules

Update documentation when a meaningful decision changes.

Update:

- `PRODUCT.md` when product scope or intended behavior changes.
- `ARCHITECTURE.md` when system boundaries, data flow, storage, integrations, or infrastructure materially change.
- `DESIGN.md` when the design language, major layout behavior, or UI principles materially change.

Do not update documentation for trivial implementation details.

Do not create new documentation files unless they solve a real documentation need.

---

## Planning Complex Work

For small tasks, implement directly.

For larger features, significant refactors, or work spanning multiple subsystems:

1. inspect the relevant code and docs,
2. identify affected boundaries,
3. write a concise implementation plan before editing,
4. keep the plan grounded in the current repository,
5. update the plan if discoveries change the approach.

A dedicated `PLANS.md` may be added later if recurring multi-hour Codex work makes it useful.

Do not create process overhead for tiny changes.

---

## Code Quality

Prefer:

- clear naming
- small focused modules
- readable code
- explicit data boundaries
- reusable UI components
- typed contracts where appropriate
- useful error states
- simple tests around important boundaries

Avoid clever abstractions that make the prototype harder to understand.

Comments should explain why, not restate obvious code.

---

## Testing Priorities

Prioritize tests for:

- normalization
- connector mapping
- API contracts
- sync behavior
- persistence
- error handling
- critical dashboard rendering

Do not spend disproportionate effort testing decorative UI details during V0.1.

---

## Performance

Do not make the interface visually heavy for decorative reasons.

Be conservative with:

- backdrop blur
- continuously animated gradients
- large background videos
- unnecessary 3D effects
- always-running animation loops

Prefer lightweight CSS transitions and localized effects.

---

## Working Style

When completing a task:

1. understand the requested outcome,
2. inspect relevant files before changing them,
3. respect existing boundaries,
4. make the smallest coherent change,
5. test the behavior when possible,
6. summarize what changed,
7. mention any unresolved issue or assumption clearly.

Do not claim something works unless it was actually verified or the limitation is explicitly stated.

---

## V0.1 Definition of Done

The initial architecture is considered proven when:

```text
KRAVV frontend runs
KRAVV backend runs
frontend can call backend
Study data is normalized
data persists locally
dashboard renders it
sync changes visible state
a real Study connector can replace mock input without redesigning the UI
```

Everything else can grow after that.

---

## Final Principle

KRAVV OS should remain understandable as it grows.

Providers will change.

Models will change.

The interface will evolve.

The core concepts should remain clear.

> **Build the smallest useful system, preserve clean boundaries, and let complexity arrive only when reality asks for it.**
