# KRAVV OS — Product Definition

> Status: Living document  
> Stage: Early prototype / V0.1  
> Purpose: Source of truth for what KRAVV OS is, why it exists, and what should be built first.

## 1. Product Identity

**KRAVV OS** is a personal operating system under the fictional **KRAVVIENT** universe.

KRAVV OS shares brand DNA with **KRAVV-IENT**, KRAVVIENT's flagship VC-oriented intelligence product, but it is not a copy of it.

- **KRAVV-IENT** is corporate, analytical, restrained, and terminal-like.
- **KRAVV OS** is personal, adaptive, interactive, expressive, and more visually alive.

KRAVV OS is meant to become a long-lived personal system that can evolve from high school into university and beyond.

---

## 2. Core Problem

Personal data is fragmented across many apps:

- learning progress lives in learning platforms,
- health data lives in Huawei Health or other wearable ecosystems,
- events and deadlines live in calendars or planners,
- development activity lives in GitHub,
- notes and research live elsewhere.

Each app understands only its own domain.

KRAVV OS exists to become a **personal command center** that connects these signals, normalizes them, and helps the user understand what is happening across daily life.

KRAVV OS should not replace every app.

It should **observe, connect, summarize, and reason across them**.

---

## 3. Core Product Idea

The system has three layers:

### Data Sources
External apps and services provide raw personal data.

Initial priorities:

1. **Study**
2. **Health**
3. **Events**

Future sources may include:

- GitHub / development activity
- Notes / personal knowledge
- Fundamental stock analysis platform
- Projects
- Other personal data sources

### KRAVV Core
KRAVV receives external data through connectors and converts it into a stable internal format.

External providers should be replaceable.

Example:

```text
Huawei Health ─┐
Moodle / edX ──┼─> Connectors -> Normalized Data -> KRAVV Core
Calendar ──────┘
```

KRAVV should not permanently couple its internal model to one provider.

### Intelligence Layer
AI acts as a **reasoning and insight layer**, not only as a chatbot.

The AI should eventually be able to:

- summarize daily state,
- generate weekly reviews,
- notice useful patterns,
- compare current data with personal baseline,
- connect information across domains,
- surface relevant priorities,
- answer questions about personal history and progress.

AI output should explain observations rather than pretend to make medical, academic, or life decisions for the user.

---

## 4. Primary Domains

### Study

Goal: understand both **time spent learning** and **actual learning progress**.

Potential data:

- course
- subject
- section / module / lesson
- completion
- current topic
- study session duration
- quiz / exercise score
- last activity
- learning history

KRAVV should support external learning-platform connectors where practical.

Possible future sources include Moodle, Open edX, or other platforms with usable APIs.

KRAVV may also support native/manual study tracking, but it should not become a full LMS unless there is a real need.

---

### Health

Goal: provide a personal view of health and activity trends from wearable data.

Initial candidate source:

- Huawei Health / Health Kit

Potential data:

- sleep
- steps
- activity
- exercise
- heart rate
- resting heart rate
- stress or other supported metrics

KRAVV should present trends and personal baselines.

It should not present itself as a medical diagnostic system.

---

### Events

Goal: connect plans, deadlines, school activities, study targets, and other time-based commitments.

Potential data:

- calendar events
- deadlines
- daily plan
- reminders
- study schedule
- project milestones

Events should become context for AI reasoning.

Example:

> A busy schedule tomorrow may affect available study time.

---

## 5. Daily Product Loop

KRAVV OS should become useful through a recurring loop:

```text
PLAN -> LIVE -> RECORD -> UNDERSTAND -> ADAPT
```

Possible daily experience:

**Morning**
- see today's events,
- see recent health context,
- see study priorities,
- receive a short AI daily brief.

**During the day**
- external systems continue recording activity,
- KRAVV syncs relevant data.

**Evening**
- see a lightweight recap.

**Weekly**
- receive a cross-domain review of study, health, and schedule trends.

The product should earn daily use through usefulness, not through artificial streaks or unnecessary notifications.

---

## 6. V0.1 Scope

The first version is intentionally small.

### Milestone 01 decisions

The implementation uses Next.js + TypeScript, FastAPI, and local SQLite.
Study is the only functional domain in this milestone and uses a mock source.
Health and Events have no meaningful data yet; Home gives them quiet weekly
visual structure without inventing values.
AI remains unimplemented and does not require a Home panel. There is no real AI, external provider
integration, production deployment, or multi-user service.
Home covers **Now** and **This Week**: **Home = glance; domain section =
understand; Insights = investigate.** Wallpaper and greeting anchor Now, with
one relevant signal and no permanently dominant domain. Study currently shows
course/topic, subordinate progress, and a secondary sync action. Continue is
deferred until a real destination exists. This Week uses distinct forms for
Study activity, Movement rhythm, and Context timeline, not three equal cards.
Study can mark its one known `last_activity` day in the current week; other
days are unrecorded. Health and Context stay neutral until data exists. Show
signal, hide meaningless empty-state content, and preserve sparse structure.
Wallpaper, glass, typography, and space establish Home's personality. Motivational
copy, duplicate focus summaries, mock badges, and connection diagnostics stay off Home.
Settings contains source, last sync, backend connection, and integration status.
Commands provide Home/Study navigation, Study sync, and Settings access.

The first real Study connector follows this milestone; it is not part of this implementation.

### Must exist

- basic KRAVV OS frontend shell,
- atmospheric Home with contextual highlights,
- a current-week overview with honest Study activity and neutral Health/Context structure,
- compact Study summary while meaningful Study data is available,
- Settings for connection details (including AI's disconnected state),
- backend connection,
- simple internal data model,
- dummy/mock data,
- one working end-to-end data flow.

### First technical proof

The first meaningful milestone is:

```text
External or mock study data
        ->
KRAVV backend
        ->
normalized data
        ->
KRAVV frontend
```

Example proof:

```text
TKA Mathematics
Progress: 42% -> 50%
Completed: 5/12 -> 6/12
Current topic: Probability
```

Once this works, a real Study connector can replace the mock source.

Home does not include month or year history, detailed analytics, long-term
trends, or portfolio/showcase views. Those belong to domain pages or dedicated
future surfaces.

---

## 7. Not in V0.1

Do not build these yet unless required by the first working loop:

- full notes system,
- stock analysis integration,
- advanced GitHub analytics,
- finance module,
- complex AI agents,
- autonomous planning,
- full LMS features,
- complex authentication,
- production-grade multi-user support,
- elaborate analytics dashboards,
- excessive charts,
- large plugin ecosystem.

These are future possibilities, not current commitments.

---

## 8. Product Principles

1. **Personal-first**  
   KRAVV OS is designed around one user's real daily workflow before considering generalization.

2. **Integration over duplication**  
   Prefer connecting good existing tools rather than rebuilding everything.

3. **Provider independence**  
   External services are sources, not foundations.

4. **Useful before impressive**  
   A working data loop matters more than a visually complex dashboard.

5. **AI should reason from data**  
   AI must have meaningful context before advanced AI features are added.

6. **Progressive complexity**  
   Start simple. Add infrastructure only when a real requirement appears.

7. **Long-lived architecture**  
   The product should survive changes in school, university, devices, and service providers.

8. **Living documentation**  
   This document should evolve when product decisions materially change.

---

## 9. KRAVVIENT Relationship

KRAVV OS belongs to the same fictional product family as KRAVV-IENT.

Shared DNA may include:

- dark-first interface,
- blue-led identity,
- clean typography,
- precise spacing,
- technical clarity,
- disciplined information hierarchy.

However, KRAVV OS should feel more personal and expressive.

Detailed visual rules belong in a separate `DESIGN.md`.

---

## 10. Future Direction

Potential future modules:

```text
KRAVV OS
├── Home
├── Study
├── Health
├── Events
├── Projects
├── GitHub
├── Knowledge / Notes
├── Finance
└── AI
```

These should share:

- one personal data layer,
- one normalization strategy,
- one intelligence layer,
- one coherent interface.

The goal is not to create a collection of unrelated mini-apps.

The goal is to create a system where different parts of personal life can meaningfully understand each other.
