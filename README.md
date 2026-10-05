# ALLVERRA ROOM

> A local-first personal digital room for seeing what matters now, understanding the current week, and exploring deeper Study, Health, and Context data when needed.

ALLVERRA ROOM is a long-running personal system built to grow with its owner.

It is not intended to be a generic productivity dashboard, habit tracker, fitness app, calendar, or AI chatbot.

The product combines several personal domains behind one normalized data layer and presents them through a calm, personal interface.

---

## Product Idea

ALLVERRA ROOM has a simple information hierarchy:

```text
Home
├─ Now / Hero
│  └─ What matters right now?
│
└─ This Week
   └─ What has this week looked like?

Study
└─ Understand learning in detail

Health
└─ Understand movement and body data in detail

Context
└─ Understand schedule and surrounding life context
```

The Home page remains intentionally shallow.

Detailed analytics belong inside each domain.

---

## Current Domains

### Study

Study tracks learning activity and progress.

Home uses a compact 7-day contribution-style visualization where intensity can eventually reflect progress toward a daily Study target.

Possible deeper Study data includes:

- subjects,
- topics,
- progress,
- sessions,
- daily activity,
- weekly duration,
- long-term consistency.

Study uses the **Lyverra** visual language:

- muted violet,
- lavender,
- softer cognitive / reflective atmosphere.

---

### Health

Health contains Movement and other useful wearable / body signals.

Possible data includes:

- movement,
- steps,
- exercise,
- sleep,
- resting heart rate,
- HRV,
- SpO₂,
- recovery-related metrics.

Home may show a compact movement rhythm plus a few relevant highlights.

Health uses the **Alverixx** visual language:

- navy,
- graphite,
- cool gray,
- more analytical / physical presentation.

---

### Context

Context contains surrounding life information that helps explain the other domains.

Possible data includes:

- events,
- calendar items,
- deadlines,
- important notes,
- school / project context.

Home treats Context more quietly than Study and Health.

Its default visual identity is neutral gray.

---

## Visual Identity

ALLVERRA ROOM is separate from the visual identity of KRAVV / KRAVVIENT.

The shared base palette is:

- off-white,
- gray,
- graphite,
- charcoal,
- black.

Domain accents:

```text
Study / Lyverra       → Violet / Lavender
Health / Alverixx     → Navy / Cool Gray
Context               → Neutral Gray
```

The interface follows one important rule:

> **Clean first. Personality second. Decoration third.**

Character artwork and environment are atmosphere.

The UI and data remain the primary subject.

---

## Home Design

Home has two layers.

### Now / Hero

The Hero contains:

- date / time context,
- greeting,
- one relevant highlight,
- optional CTA,
- ALLVERRA atmosphere / character artwork.

The highlighted domain is not permanently Study.

It may eventually change based on relevance.

---

### This Week

Home shows only the current week.

It does not include:

- month views,
- year views,
- all-time views,
- deep analytics.

Each domain uses a different visual language:

```text
Study
→ contribution / intensity

Health
→ movement / rhythm + selected highlights

Context
→ timeline / calendar state
```

Do not turn these into three duplicated dashboard cards.

---

## Character Identity

ALLVERRA uses Alverixx and Lyverra as part of its personal visual language.

They are not generic mascots.

Character model sheets are the canonical identity references.

Generated background artwork is only a composition reference.

### Alverixx

- white / silver-white hair,
- calm / detached expression,
- gray / white / black clothing language,
- right eye blue,
- left eye gray,
- subtle left-eye corneal damage,
- navy / gray domain identity.

### Lyverra

- very long loose black hair,
- subtle violet undertone,
- soft brown eyes,
- muted violet cardigan,
- white inner layer,
- black lower garment,
- calm older-sister presence,
- Study / violet domain identity.

---

# Architecture

ALLVERRA ROOM is local-first.

High-level data flow:

```text
External Source
      ↓
     n8n
fetch / schedule / filter / prepare
      ↓
ALLVERRA Ingestion API
      ↓
validate / normalize / persist
      ↓
Local Database
      ↓
ALLVERRA Domain APIs
      ↓
Frontend
```

AI sits after deterministic preprocessing:

```text
Normalized data
→ select relevant context
→ deterministic metrics
→ AI reasoning
→ validated structured insight
→ persistence
```

AI is optional.

The core product should remain useful without AI.

---

## n8n Responsibility

n8n handles acquisition and orchestration.

Examples:

- scheduled sync,
- startup catch-up,
- provider requests,
- transport-level filtering,
- payload preparation,
- triggering ALLVERRA ingestion.

n8n decides **when data moves**.

ALLVERRA decides **what the data means**.

---

## Backend Responsibility

The backend owns:

- validation,
- provider mapping,
- normalization,
- domain semantics,
- persistence,
- derived metrics,
- Home view models,
- AI context preparation.

The frontend should never depend directly on provider-specific payloads.

---

## Local Runtime

The intended V0.1 environment is:

```text
Windows
└─ WSL2
   └─ Docker
      ├─ web
      ├─ api
      ├─ database
      └─ n8n
```

The laptop does not need to run 24/7.

When the environment starts, the system should eventually support catch-up sync from the last successful synchronization point.

---

# V0.1 Goal

V0.1 exists to prove that ALLVERRA ROOM works as a real local personal system.

The first complete functional path is Study.

```text
Study source
→ ingestion
→ normalization
→ persistence
→ API
→ Home / Study UI
```

V0.1 should establish:

- local app shell,
- Home,
- Study end-to-end data flow,
- persistence,
- sync,
- weekly Study visualization,
- Health visual structure,
- Context visual structure,
- honest loading / empty / error states.

Health and Context do not need full real integrations yet.

---

## V0.1 Non-Goals

Do not build prematurely:

- public production hosting,
- mobile application,
- enterprise authentication,
- multi-user support,
- microservices,
- Kubernetes,
- queues,
- distributed systems,
- autonomous always-running AI agents,
- full long-term analytics,
- many integrations at once.

ALLVERRA ROOM is currently one person's system.

Keep it understandable.

---

# Suggested Repository Layout

```text
allverra-room/
├─ apps/
│  ├─ web/
│  └─ api/
│
├─ packages/
│  └─ domain/
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

This structure is guidance.

Do not create empty abstraction layers merely to match the diagram.

---

# Documentation

Read these before major implementation work:

### `docs/PRODUCT.md`

Defines:

- what ALLVERRA ROOM is,
- domain responsibilities,
- Home scope,
- V0.1 product boundaries,
- long-term direction.

### `docs/DESIGN.md`

Defines:

- visual hierarchy,
- palette,
- character identity,
- background behavior,
- Home composition,
- weekly visual grammar,
- interaction and whitespace rules.

### `docs/ARCHITECTURE.md`

Defines:

- n8n / backend / frontend boundaries,
- ingestion,
- normalization,
- persistence,
- sync strategy,
- AI pipeline,
- local-first runtime.

### `AGENTS.md`

Defines how coding agents should work inside this repository.

---

# Engineering Principles

### Provider independent

Providers are replaceable inputs.

Frontend components consume ALLVERRA models.

### Local first

Do not introduce cloud infrastructure unless it solves a real problem.

### Data honesty

Missing is not zero.

Fixture data must never pretend to be live.

### AI last-mile

Preprocess and aggregate before model calls.

### Small domain models

Add fields because the product needs them, not because a provider exposes them.

### Preserve history

The system is intended to live for years.

Do not casually destroy accumulated data during schema evolution.

### Build for use

A feature should exist because it is useful in the owner's real workflow.

---

# Development Workflow

For significant changes:

1. read the relevant documentation,
2. inspect the current implementation,
3. preserve existing working behavior,
4. identify the smallest useful scope,
5. implement,
6. run relevant checks,
7. inspect the UI when the task is visual,
8. summarize changes and known limitations.

Do not redesign unrelated areas during focused tasks.

---

# Product North Star

ALLVERRA ROOM should become more valuable through continued use.

Over time it may accumulate:

- Study history,
- Health history,
- Context,
- project activity,
- AI insights,
- personal consistency patterns,
- engineering history.

This creates two forms of long-term value:

```text
The system itself
→ proof of building and maintaining software

The history inside it
→ proof of real, sustained use
```

The immediate priority is simpler:

> Build something useful enough to open again tomorrow.

---

## One-line summary

> **ALLVERRA ROOM is a local-first personal room that turns Study, Health, and Context data into a calm view of now and this week.**
