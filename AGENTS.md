# ALLVERRA ROOM — Agent Instructions

**File:** `AGENTS.md`  
**Status:** Active baseline  
**Version:** V0.1  
**Purpose:** Define how Codex and other coding agents should work inside the ALLVERRA ROOM repository.

---

# 1. Read This First

Before making a meaningful change, read the relevant project documents.

Priority:

1. `docs/PRODUCT.md`
2. `docs/DESIGN.md`
3. `docs/ARCHITECTURE.md`
4. `README.md`
5. this file

Do not treat these documents as optional context.

They define the product.

---

# 2. Source of Truth

When instructions conflict, use this order:

```text
Current user request
→ PRODUCT.md
→ DESIGN.md
→ ARCHITECTURE.md
→ README.md
→ Existing implementation
```

Existing code is not automatically correct if it conflicts with the active documentation.

Do not preserve an old KRAVV design decision merely because it already exists in code.

ALLVERRA ROOM is the active product identity.

---

# 3. Product Identity

ALLVERRA ROOM is:

- local-first,
- personal,
- calm,
- data-aware,
- domain-based,
- intentionally small in V0.1.

It is not:

- a generic SaaS dashboard,
- a Notion clone,
- a fitness dashboard clone,
- a habit tracker,
- a generic LMS,
- a calendar clone,
- an AI chatbot shell.

The product should feel like a personal room with useful systems inside it.

---

# 4. V0.1 Priority

The V0.1 implementation priority is:

```text
Home
→ Study end-to-end
→ Health structure
→ Context structure
→ deeper domain work
```

Do not expand scope before the current layer is coherent.

Study is the first real data path.

Health and Context may remain partial until real integrations exist.

---

# 5. Home Rule

Home contains only:

1. **Now / Hero**
2. **This Week**

Do not add:

- This Month,
- All Time,
- yearly analytics,
- large historical dashboards,
- unrelated productivity widgets.

Detailed analytics belong inside domain pages.

---

# 6. Hero Rule

The Hero should remain compact.

It may include:

- date,
- greeting,
- one relevant highlight,
- optional CTA,
- character / environmental atmosphere.

Do not turn Hero into a multi-card dashboard.

The active highlight is not permanently Study.

Study may be used in V0.1 because it currently has the strongest real data path.

---

# 7. Weekly Domain Rule

The Home weekly section must not become three identical cards.

Each domain uses a different visual language.

### Study

Use:

- 7-day contribution-style activity,
- muted violet / lavender,
- target-based intensity.

Do not represent Git commits.

### Health

Use:

- movement rhythm,
- slim bars,
- compact physical signals,
- navy + gray.

Do not copy the Study heatmap.

### Context

Use:

- quiet timeline / calendar state,
- neutral gray,
- sparse event display.

Do not artificially fill empty days.

---

# 8. Visual Priority

The UI is always more important than the background.

Hierarchy:

```text
UI content
→ active data
→ domain accent
→ character artwork
→ environment
→ decorative texture
```

If readability becomes weak:

**reduce background strength first.**

Do not immediately add:

- huge shadows,
- dark panels,
- stronger card fills,
- glowing outlines.

---

# 9. Background Rule

Character and environmental artwork are atmosphere.

They are not the interface.

Backgrounds should support:

- upper-right character composition,
- negative space on the left,
- negative space below,
- quiet lower content area,
- low visual competition.

Use opacity, masking, saturation control, overlays, and cropping when necessary.

Do not let the background become the focal point.

---

# 10. Character Canon

Character model sheets are canonical.

Generated wallpapers are not canonical.

Do not infer permanent character features from generated background images.

## Alverixx

Preserve:

- white / silver-white hair,
- calm / detached expression,
- slim young male proportions,
- gray / white / black outfit language,
- right eye blue,
- left eye muted gray,
- subtle left-eye corneal damage,
- restrained styling.

Avoid:

- generic anime-boy face,
- heroic redesign,
- cyberpunk exaggeration,
- strong glossy rendering.

## Lyverra

Preserve:

- very long loose black hair,
- natural straight / soft flow,
- subtle violet undertone,
- soft brown eyes,
- slim face,
- muted violet cardigan,
- white inner layer,
- black lower garment,
- calm older-sister presence.

Do not invent:

- ponytails,
- ribbons,
- bright violet eyes,
- aggressive expression,
- unrelated accessories.

---

# 11. Character Relationship

Lyverra is the older sister.

Alverixx is the younger sibling.

Do not reinterpret the pair as romantic.

Artwork should communicate familiarity without excessive drama.

---

# 12. Art Style

Target:

**clean editorial manga illustration with soft matte texture**

Prefer:

- human-looking linework,
- restrained shading,
- desaturated color,
- subtle texture,
- low-gloss rendering.

Avoid:

- glossy AI-anime rendering,
- plastic skin,
- excessive bloom,
- hyper-detailed hair,
- painterly blur that changes identity.

---

# 13. Design System Rule

Do not hardcode one-off styling when a reusable token makes sense.

Prefer shared tokens for:

- spacing,
- typography,
- radius,
- borders,
- glass surface,
- domain accents,
- foreground contrast,
- muted text,
- background overlays.

Do not build a giant abstraction layer before it is useful.

---

# 14. Glass Rule

Glass is a material.

It is not the entire layout.

Use glass only when it improves:

- separation,
- focus,
- readability,
- interaction.

Avoid turning every section into the same translucent rounded card.

---

# 15. Data Honesty

Never invent data to make a design look complete.

Differentiate:

- real data,
- fixture data,
- missing data,
- derived data,
- AI-generated interpretation.

Missing is not automatically zero.

Fixture data must never visually pretend to be live data.

---

# 16. Provider Independence

Frontend components must consume ALLVERRA models.

Do not make Home depend directly on:

- Huawei payloads,
- Moodle payloads,
- calendar provider payloads,
- n8n node output.

Provider-specific structures belong behind adapters / normalization.

---

# 17. Responsibility Boundaries

Use this mental model:

```text
n8n
→ moves data

ALLVERRA backend
→ understands data

database
→ remembers data

frontend
→ presents data

AI
→ reasons over prepared data
```

Do not blur these responsibilities without a strong reason.

---

# 18. n8n Rule

n8n may handle:

- schedules,
- provider fetches,
- transport filtering,
- payload preparation,
- triggering ingestion.

n8n should not become the permanent home of ALLVERRA domain semantics.

---

# 19. Backend Rule

The backend owns:

- validation,
- normalization,
- canonical field names,
- persistence,
- domain logic,
- derived metrics,
- Home view models,
- AI context preparation.

Do not move business logic into random frontend components.

---

# 20. AI Rule

AI is optional.

The product must remain useful without it.

Preferred pipeline:

```text
normalized data
→ deterministic preprocessing
→ compact context
→ model
→ structured output
→ validation
→ persistence
```

Do not:

- send uncontrolled raw dumps,
- trigger model calls whenever Home renders,
- use AI for deterministic arithmetic,
- make AI required for core navigation.

---

# 21. Local-First Rule

V0.1 is designed for local use.

Avoid introducing cloud infrastructure unless specifically requested.

Do not prematurely add:

- Kubernetes,
- distributed queues,
- message brokers,
- multi-region services,
- complex auth,
- multi-tenancy.

One person's system should remain understandable by one developer.

---

# 22. Persistence Rule

Important state must survive restart.

Do not store important application state only inside ephemeral containers.

Protect accumulated personal history.

Schema evolution should not casually require deleting the database.

---

# 23. Scope Control

When given a focused task:

- solve that task,
- preserve unrelated working behavior,
- avoid opportunistic redesign,
- avoid refactoring unrelated modules,
- avoid adding speculative features.

If a broader change seems useful, mention it separately rather than silently implementing it.

---

# 24. Implementation Workflow

For non-trivial work:

1. read the relevant docs,
2. inspect existing code,
3. identify current behavior,
4. define the smallest useful change,
5. implement,
6. run relevant checks,
7. inspect the UI if visual,
8. verify data honesty,
9. summarize what changed,
10. note anything intentionally deferred.

---

# 25. Before Editing UI

Before changing Home or another major screen, answer internally:

```text
What user problem am I solving?
What data is real?
What belongs on this page?
What should remain in a deeper page?
Does the change preserve ALLVERRA's visual hierarchy?
```

Do not begin from decoration.

---

# 26. Before Adding a Component

Ask:

- Is this component used more than once?
- Does it represent a real product concept?
- Is the abstraction simpler than duplication?

Do not create component libraries for imagined future needs.

---

# 27. Before Adding a Dependency

Ask:

- Is it necessary?
- Can existing tools solve the problem?
- Is the maintenance cost justified?
- Does it improve the owner's real workflow?

Avoid dependency accumulation.

---

# 28. Empty States

Prefer quiet empty states.

Good:

```text
No health data yet.
```

Avoid:

- giant illustrations,
- motivational filler,
- large empty cards,
- fake numbers.

---

# 29. Error Handling

Errors should be local.

One failed provider should not blank the entire Home page.

Previously persisted data should remain visible when safe.

---

# 30. Loading

Keep layout stable during loading.

Avoid large full-screen spinners.

Prefer:

- subtle skeletons,
- reserved space,
- local loading states.

---

# 31. Accessibility

Do not sacrifice accessibility for atmosphere.

Maintain:

- readable contrast,
- keyboard support,
- focus states,
- sufficient type size,
- reduced-motion compatibility.

Background art must never reduce critical readability.

---

# 32. Responsive Behavior

Desktop is the primary V0.1 target.

Still ensure smaller widths remain usable.

On narrow screens:

- crop artwork more,
- reduce artwork prominence,
- stack weekly sections,
- simplify environment,
- preserve data clarity.

Do not shrink everything until it becomes unreadable.

---

# 33. Route Integrity

Do not create fake navigation.

A CTA should not lead to:

- empty placeholder routes,
- fake pages,
- dead destinations.

If a domain page does not exist yet:

- keep the visual doorway subtle,
- or disable / defer the route intentionally.

---

# 34. Fixture Data

Fixture data is allowed during development.

Rules:

- store it separately,
- label it clearly in code,
- keep it replaceable,
- never mix it invisibly with live data.

---

# 35. Comments and Documentation

Write comments for:

- why a decision exists,
- non-obvious constraints,
- provider quirks,
- domain rules.

Do not narrate obvious code line by line.

Update docs when implementation meaningfully changes product or architecture.

---

# 36. Naming

Prefer names that reflect domain meaning.

Good:

```text
StudyWeeklyActivity
HealthDailySummary
ContextEvent
HomeHighlight
```

Avoid vague names:

```text
DataBox
InfoCard
Thing
Widget2
```

---

# 37. Testing Priority

Prioritize tests around:

- normalization,
- data mapping,
- persistence,
- sync behavior,
- Home view-model assembly,
- provider adapters,
- critical UI states.

Do not chase arbitrary coverage percentages.

Test behavior that would hurt if it silently broke.

---

# 38. Visual Acceptance Check

Before considering Home complete, verify:

- greeting is immediately readable,
- Hero remains compact,
- background is secondary,
- character identity is not visually distorted,
- Study weekly signal is understandable,
- Health does not look like Study,
- Context remains quiet,
- CTAs are understated,
- normal browser zoom feels complete,
- whitespace still exists.

If the page feels impressive but tiring:

reduce it.

---

# 39. Do Not Reintroduce Old KRAVV Visual DNA

Do not automatically use:

- heavy navy dashboard surfaces,
- corporate terminal styling,
- KRAVVIENT branding,
- dark VC-dashboard composition.

ALLVERRA ROOM is a separate visual identity.

Some engineering history may survive.

The old visual identity does not.

---

# 40. Long-Term Mindset

ALLVERRA ROOM is intended to accumulate value through real use.

Optimize for:

- maintainability,
- honest history,
- understandable code,
- replaceable providers,
- gradual evolution.

Avoid building impressive complexity that makes tomorrow's change harder.

---

## Final Agent Rule

> **Build the smallest honest version that fits ALLVERRA's product, design, and architecture — then stop before adding things nobody asked for.**
