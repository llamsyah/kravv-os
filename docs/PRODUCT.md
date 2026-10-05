# ALLVERRA ROOM — Product Definition

**Document:** `docs/PRODUCT.md`  
**Status:** Active baseline  
**Version:** V0.1  
**Purpose:** Define what ALLVERRA ROOM is, what it should do, and what it should not become.

---

## 1. Product Identity

**ALLVERRA ROOM** is a personal digital space for understanding daily life through a small set of connected domains.

It is not intended to feel like a corporate dashboard, productivity SaaS, or generic analytics app.

The product should feel like:

- a personal room first,
- a command center second,
- and an analytical system only when deeper detail is requested.

The interface should help the user quickly answer:

> What matters right now?  
> How has this week been going?  
> Where do I go if I want the details?

ALLVERRA ROOM is separate from the visual identity of KRAVV / KRAVVIENT.

KRAVV may remain part of the wider project universe, but ALLVERRA ROOM has its own product identity.

---

## 2. Core Product Philosophy

### 2.1 Personal, not performative

The product exists primarily for the owner.

It may later function as a long-running portfolio and proof of system design, but the interface should never become cluttered merely to impress other people.

Useful data comes first.

### 2.2 Overview before analytics

The Home page should not try to show everything.

It gives:

1. what matters now,
2. a compact view of the current week,
3. clear entry points into deeper domain pages.

Detailed analytics belong inside each domain.

### 2.3 Different data deserves different visual language

Study, Health, and Context should not be forced into identical cards.

The visual form should follow the nature of the data.

Examples:

- repeated daily learning activity → contribution-style cells,
- physical activity → movement rhythm / quantitative signals,
- schedule and life context → timeline / calendar structure.

Consistency comes from the shared design system, not from duplicating the same card layout.

### 2.4 Honest data

The UI must distinguish:

- real recorded data,
- missing data,
- not-yet-connected sources,
- derived values,
- AI-generated interpretation.

Never invent activity simply to make the interface look full.

Empty does not mean zero unless the data explicitly says zero.

### 2.5 Calm by default

ALLVERRA ROOM should reduce visual noise rather than create more of it.

Avoid unnecessary:

- motivational copy,
- decorative statistics,
- system-status text,
- fake insights,
- duplicated labels,
- oversized UI chrome.

---

## 3. Product Structure

The initial product has four top-level destinations:

- **Home**
- **Study**
- **Health**
- **Context**

Future modules may be added only when they have a real use case.

Do not expose unfinished future modules in primary navigation.

---

# 4. Home

Home is the shared ALLVERRA space.

It combines multiple domains without becoming a full dashboard for any single one.

Home has only two primary information layers:

1. **Now / Hero**
2. **This Week**

No month view.  
No year view.  
No all-time analytics.

Those belong inside the dedicated domains if added later.

---

## 4.1 Now / Hero

The hero is the emotional and contextual opening of the app.

It should include:

- date / time context,
- greeting,
- one relevant current highlight,
- optional lightweight action into the relevant domain,
- ALLVERRA artwork / atmosphere.

The hero should not permanently belong to Study.

The highlighted domain may change based on relevance.

Examples:

- last or active Study topic,
- meaningful Health signal,
- upcoming event,
- current Context item.

For V0.1, Study may be used as the real highlight because it is currently the most complete source.

That is an implementation reality, not a permanent product rule.

### Hero highlight rule

Show only a small amount of useful information.

Example:

- `Study`
- `Mathematics`
- `Conditional Probability`
- `50%`

Avoid turning the hero into a large analytics panel.

---

# 5. This Week

This Week is the stable summary layer beneath the hero.

It covers the **current 7-day week only**.

Each domain uses a visual form suited to its data.

---

## 5.1 Study — Weekly Overview

Study uses a contribution-style weekly visualization.

It is inspired by the clarity of contribution heatmaps, but it does **not** represent commits.

It represents Study activity relative to a daily target.

Example model:

- no recorded activity → empty / unrecorded state,
- partial target → partial intensity,
- target met → strongest intensity.

Example:

- target = 60 minutes,
- 30 minutes → medium intensity,
- 60+ minutes → full intensity.

Only 7 days are shown on Home.

Study may also show one very small supporting signal, such as:

- current subject,
- current topic,
- weekly duration,
- current progress.

Do not overload the module.

CTA:

`Open study →`

---

## 5.2 Health — Weekly Overview

Health includes Movement and other useful body signals.

Movement is part of Health, not a separate top-level product domain.

Home should show a compact weekly Health summary using a visual language different from Study.

Potential signals include:

- steps,
- movement duration,
- resting heart rate,
- sleep duration,
- recovery-related metrics,
- other wearable data when available.

The Home view should show only the most relevant few metrics.

The main weekly visualization should feel physical / rhythmic rather than like a contribution grid.

Possible forms:

- slim vertical movement bars,
- rhythm strips,
- compact activity arcs,
- another simple weekly movement visualization.

CTA:

`Open health →`

Health uses a navy + gray visual identity.

---

## 5.3 Context — Weekly Overview

Context represents the surrounding life information that helps explain the other domains.

Examples:

- school,
- meetings,
- appointments,
- planned activities,
- project work,
- important notes,
- events.

Home should treat Context as quieter than Study and Health.

Use a weekly timeline or calendar-like form.

Days without an event should remain visually quiet.

Event states should be distinguishable:

- past → muted,
- current / today → clear,
- upcoming → visible but not dominant.

Context exists to add meaning, not to compete for attention.

CTA:

`Open context →`

Context uses neutral gray as its default identity.

---

# 6. Study

The Study section contains deeper learning information.

Possible future capabilities:

- subjects,
- courses,
- topics,
- session history,
- daily / weekly study duration,
- progress,
- learning streaks,
- activity history,
- source integrations,
- AI learning summaries.

V0.1 does not need all of these.

The first functional Study loop remains:

`source → normalized Study data → local persistence → API → UI`

The Home page should consume the same normalized Study model as the dedicated Study page.

---

# 7. Health

Health is the detailed destination for physical and physiological information.

Potential data:

- movement,
- steps,
- exercise sessions,
- sleep,
- resting heart rate,
- HRV,
- SpO₂,
- recovery,
- other wearable data.

Future source candidates may include Huawei Health or other supported wearable sources.

Home should summarize Health.

The Health section may later provide:

- trends,
- charts,
- comparisons,
- correlations,
- deeper historical analysis.

Do not bring those detailed analytics into Home.

---

# 8. Context

Context stores life events and surrounding information that may explain Study or Health patterns.

Potential inputs:

- calendar data,
- school schedule,
- meetings,
- tasks with time context,
- project milestones,
- manual notes.

Context may later be used by AI when generating cross-domain insight.

Context is not intended to become a generic task manager unless a real need emerges.

---

# 9. Data Flow Philosophy

External services remain data sources.

ALLVERRA ROOM owns the normalized internal model.

Preferred high-level flow:

```text
Source
  ↓
n8n
  fetch
  filter
  deduplicate
  prepare
  ↓
ALLVERRA backend
  validate
  normalize
  persist
  ↓
Local database
  ↓
ALLVERRA API
  ↓
Home / Study / Health / Context
```

n8n is used where visual workflow orchestration is useful.

ALLVERRA should not depend on provider-specific data structures in its frontend.

---

# 10. AI Role

AI is a reasoning layer, not the foundation of the product.

AI should receive prepared data, not uncontrolled raw dumps.

Preferred pattern:

```text
raw source
→ deterministic preprocessing
→ normalized / selected context
→ AI reasoning
→ optional insight
```

AI should be invoked intentionally:

- scheduled,
- event-based,
- or manually requested.

It should not continuously process every piece of data.

This keeps:

- cost low,
- behavior understandable,
- context controlled,
- maintenance manageable.

The core app must remain useful without AI.

---

# 11. Local-First Product Model

V0.1 is designed primarily for local use.

Expected environment:

- personal laptop,
- local backend,
- local database,
- local automation workflows,
- browser-based frontend.

Remote hosting and mobile-first access are not requirements for the first milestone.

The product should remain architecturally capable of evolving later without requiring a total rewrite.

---

# 12. Product Visual Identity

ALLVERRA ROOM uses a shared neutral base:

- gray,
- black,
- off-white,
- translucent neutral surfaces.

Domain accents:

- **Study / Lyverra:** muted violet / lavender
- **Health / Alverixx:** navy + gray
- **Context:** neutral gray

The product identity is not a simple single-color brand.

It is the relationship between its neutral base and domain-specific atmospheres.

---

# 13. Character Identity in the Product

Alverixx and Lyverra are part of ALLVERRA's personal visual identity.

They should not behave like decorative mascots pasted onto every screen.

Use them primarily through:

- hero artwork,
- atmospheric imagery,
- domain visual language,
- selected personal surfaces.

Character artwork must remain secondary to usability.

The UI should still work if the artwork is removed.

Character model sheets are the source of truth for identity.

Generated background artwork is a composition reference, not the canonical character reference.

---

# 14. V0.1 Scope

V0.1 should prove that ALLVERRA ROOM can operate as a real local personal system.

### Required

- Home shell
- Study data working end-to-end
- local persistence
- Study sync
- Home Now / Hero
- Home This Week
- compact Study weekly visualization
- Health weekly visual structure
- Context weekly visual structure
- real navigation destinations where implemented
- local API
- clear loading / empty / error states

### Allowed as temporary

Health and Context may use:

- clearly labeled fixture data,
- or visually empty states,

until real sources are connected.

They must not pretend to be live.

### Not required yet

- production hosting,
- mobile app,
- authentication system,
- queues,
- distributed architecture,
- continuous AI agents,
- complex recommendation engine,
- full historical analytics,
- multiple real integrations,
- enterprise features.

---

# 15. V0.1 Success Criteria

The milestone is successful when:

1. the app starts locally without a complicated manual sequence,
2. Study data can be changed at the source,
3. sync updates the normalized record,
4. data survives restart,
5. Home reflects the latest Study state,
6. weekly Study visualization can represent real daily activity when history is available,
7. Health and Context surfaces remain honest about unavailable data,
8. navigation does not lead to fake functionality,
9. visual hierarchy still prioritizes clarity over decoration,
10. the architecture can accept a real data provider without redesigning the frontend model.

---

# 16. Product Boundaries

Do not turn ALLVERRA ROOM into:

- a generic Notion clone,
- a generic habit tracker,
- a generic fitness dashboard,
- a generic LMS,
- a generic calendar,
- a generic AI chatbot.

It may interact with all of those categories while remaining one coherent personal system.

The value is in connecting useful context across domains without forcing the user to live inside a single provider.

---

# 17. Long-Term Direction

ALLVERRA ROOM should be able to grow gradually with the owner.

Potential future areas:

- projects,
- portfolio activity,
- archive,
- finance,
- personal knowledge,
- deeper AI reasoning,
- cross-domain pattern detection,
- long-term consistency visualizations,
- optional public portfolio surfaces.

These should be added only when they become useful.

The product should feel better after two years of real use, not heavier.

---

## Product rule in one sentence

> **Home shows what matters now and how this week is going; dedicated rooms explain the details.**
