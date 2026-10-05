# ALLVERRA ROOM — Design System & Visual Direction

**Document:** `docs/DESIGN.md`  
**Status:** Active baseline  
**Version:** V0.2  
**Purpose:** Define ALLVERRA ROOM's visual system, Home composition, domain-specific artwork strategy, character usage, background behavior, and UI hierarchy.

---

## 1. Design Goal

ALLVERRA ROOM should feel like a **personal room with a quiet command center inside it**.

It should not look like:

- a generic SaaS dashboard,
- a corporate analytics product,
- a productivity template,
- an anime wallpaper with UI pasted on top,
- or a collection of identical glass cards.

The interface should feel:

- calm,
- clean,
- personal,
- softly atmospheric,
- visually intentional,
- modern without becoming sterile.

The UI remains the primary subject.

Artwork, lighting, foliage, character scenes, and environment provide atmosphere and identity without overpowering the information.

---

# 2. Core Design Principle

## Clean first. Personality second. Decoration third.

ALLVERRA should not become colorless in the name of cleanliness.

A clean interface may still contain:

- muted violet,
- navy,
- environmental lighting,
- foliage,
- soft floral detail,
- character presence,
- subtle event colors.

When readability competes with artwork:

**adjust the artwork locally before making the UI heavier.**

Prefer:

- local masks,
- localized wash,
- controlled opacity,
- contrast reduction,
- subtle blur in specific areas.

Avoid solving readability by adding:

- dark opaque cards,
- heavy shadows,
- thick borders,
- large white overlays,
- full-page bleaching.

---

# 3. Global App Shell

The app shell is shared across Home, Study, Health, and Context.

Shared elements:

- left navigation,
- ALLVERRA ROOM wordmark,
- navigation icons,
- Settings access,
- search / command entry where available,
- typography system,
- spacing system,
- glass/material tokens.

The app shell should remain visually stable while domain content changes.

---

## 3.1 Navbar / Sidebar

The sidebar is intentionally **plain and neutral**.

It should not contain environment-specific decoration such as:

- flowers,
- foliage,
- character elements,
- domain-specific illustration.

Reason:

Each domain may use a different background scene.

The navbar must remain consistent across all of them.

Preferred behavior:

- translucent neutral surface,
- enough local wash to remain readable,
- subtle divider or edge,
- environment may faintly show through,
- but decorative artwork should not visually belong to the navbar.

The sidebar should feel like part of the application shell, not part of one wallpaper.

Primary items:

- Home
- Study
- Health
- Context

Do not fill the sidebar with slogans, system status, or decorative copy.

---

# 4. Background Strategy

ALLVERRA does **not** use one identical wallpaper for every route.

The app shell stays consistent.

The background changes at the **domain level**.

```text
Home
→ Alverixx + Lyverra

Study
→ Lyverra-focused scene

Health
→ Alverixx-focused scene

Context
→ neutral / contextual scene
```

This allows each section to have its own personality while remaining part of one design system.

---

# 5. Home Background

Home represents the shared ALLVERRA space.

It should show both Alverixx and Lyverra.

The preferred Home scene is a calm study / library environment with:

- window light,
- books,
- shelves,
- soft lavender-gray atmosphere,
- subtle plants / foliage,
- large negative space for UI,
- visible but non-dominant character composition.

The characters should feel naturally present in the room, not posed like a promotional poster.

Preferred scene energy:

- quiet,
- familiar,
- study-oriented,
- slightly tired / relaxed,
- visually soft.

The study theme may be communicated through:

- books,
- table / desk,
- notes,
- shelves,
- reading posture,
- natural library context.

Do not make the scene too literal or cluttered.

---

# 6. Study Background

Study is Lyverra's domain.

Study may use a Lyverra-only background.

Visual direction:

- muted violet,
- lavender-gray,
- books / study environment,
- softer light,
- contemplative composition,
- calm cognitive atmosphere.

Lyverra should not compete with detailed Study analytics.

As the page becomes denser, her prominence may be reduced through:

- cropping,
- local fade,
- softer contrast,
- less central placement.

The Study environment may differ from Home while preserving the same visual world.

---

# 7. Health Background

Health is Alverixx's domain.

Health may use an Alverixx-only background.

Visual direction:

- navy,
- cool gray,
- white,
- structured light,
- cleaner and more physical atmosphere.

Health should feel slightly more analytical than Study.

Do not force a gym aesthetic unless the data and future concept require it.

The background may still feel quiet and personal.

---

# 8. Context Background

Context does not require a character.

It may use:

- neutral environment,
- quiet room detail,
- calendar / life-context atmosphere,
- soft gray composition.

Character use is optional.

Context should remain the least visually dominant domain.

---

# 9. Visual Hierarchy

From strongest to quietest:

1. **Primary UI content**
2. **Current / relevant data**
3. **Domain accent**
4. **Character focal area**
5. **Environmental background**
6. **Decorative foliage / floral detail**
7. **Ambient texture**

Approximate visual-strength guidance:

```text
UI text + important data        100%
Interactive states              90–100%
Character focal area            70–85%
Environment                     45–65%
Foliage / floral detail         20–35%
Ambient texture                 10–20%
```

These are visual targets, not strict CSS constants.

Important:

Do not reduce the entire Home image to low opacity.

Character artwork is already soft by nature.

Prefer local readability treatment over global image fading.

---

# 10. Negative Space

Negative space should not mean empty white space.

ALLVERRA negative space may still contain very subtle:

- leaf shadows,
- foliage silhouettes,
- window light,
- soft flower detail,
- distant bookshelf structure,
- light beams,
- environmental texture.

These elements must remain low contrast.

The user should feel that the UI exists inside a room, not on top of a blank white canvas.

---

# 11. ALLVERRA Base Palette

The shared foundation uses:

- warm white,
- off-white,
- soft gray,
- graphite,
- charcoal,
- restrained black.

ALLVERRA is neutral-based, but not monochrome.

The global atmosphere may carry a soft lavender-gray tint.

Avoid pure white dominating the entire interface.

---

# 12. Domain Color Language

## Study / Lyverra

Primary:

- muted violet,
- lavender,
- soft desaturated purple.

Use for:

- contribution cells,
- progress,
- Study icon states,
- selected days,
- Study CTA,
- small accents.

Study should clearly contain visible violet.

---

## Health / Alverixx

Primary:

- deep navy,
- steel blue,
- cool gray,
- blue-white.

Use for:

- movement bars,
- Health state,
- selected day,
- metric emphasis,
- Health CTA.

Health should clearly read as blue/navy rather than neutral gray.

---

## Context

Context does not need one dominant accent color.

The base remains neutral gray.

Individual event markers may use semantic colors.

Examples:

```text
Study / academic      → violet
Meeting / information → blue
Deadline / urgent     → red
Personal / activity   → yellow
Neutral / free time   → gray
```

The exact mapping may evolve.

Important:

- colors must represent meaning,
- do not assign random colors per render,
- event color semantics must be consistent,
- empty days remain neutral.

Context should use color through events, not through the entire section.

---

# 13. Material Language

Glass is a material, not a layout strategy.

Use glass to improve:

- separation,
- readability,
- local focus,
- interaction.

Preferred:

- translucent neutral surface,
- background still faintly visible,
- subtle blur,
- thin low-contrast border,
- minimal shadow.

Avoid:

- opaque white SaaS cards,
- strong blue glass,
- thick glowing borders,
- excessive shadows.

Study, Health, and Context do not need identical surface treatments.

---

# 14. Character Identity

Character model sheets are canonical.

Generated wallpapers are composition references only.

Do not infer permanent character identity from a generated scene.

---

## 14.1 Alverixx

Preserve:

- white / silver-white hair,
- calm / detached expression,
- slim young male proportions,
- gray / white / black clothing language,
- long gray coat when using the established outfit,
- white shirt,
- dark trousers,
- right eye cool blue,
- left eye muted gray,
- subtle left-eye corneal damage.

Character energy:

- quiet,
- calm,
- distant,
- stylish,
- his own pace.

Avoid:

- heroic posing,
- generic glossy anime face,
- cyberpunk exaggeration,
- excessive emotion.

---

## 14.2 Lyverra

Preserve:

- very long loose black hair,
- natural straight / soft flow,
- subtle violet undertone,
- slim face,
- calm narrow-soft eyes,
- soft brown eyes,
- muted violet cardigan,
- white inner layer,
- black lower garment,
- calm older-sister presence.

Avoid:

- invented ponytail,
- invented ribbon,
- bright violet eyes,
- aggressive / yandere expression,
- unrelated accessories,
- glossy AI-anime treatment.

---

# 15. Character Relationship on Home

Lyverra is the older sister.

Alverixx is the younger sibling.

Home artwork may show:

- quiet companionship,
- shared study environment,
- relaxed poses,
- natural physical spacing,
- non-performative body language.

Do not reinterpret the relationship romantically.

The pair should feel familiar, calm, and lived-in.

---

# 16. Character Art Style

Target:

**clean editorial manga illustration with soft matte texture**

Preferred:

- human-looking linework,
- visible drawing structure,
- desaturated color,
- soft shadows,
- matte rendering,
- subtle paper / brush texture,
- restrained highlights.

Avoid:

- glossy AI-anime rendering,
- plastic skin,
- excessive bloom,
- hyper-detailed hair,
- painterly blur that changes identity.

---

# 17. Typography

Typography should feel clean and editorial.

Use:

- refined serif for selected hero / greeting text,
- modern sans-serif for interface text.

Recommended:

- Hero greeting may use serif.
- Navigation, metrics, labels, dates, CTAs, and system text should use sans-serif.

Avoid:

- too many font families,
- decorative typography inside data surfaces,
- oversized wordmarks.

---

# 18. ALLVERRA Wordmark

The ALLVERRA ROOM wordmark should remain subtle.

It is product identity, not the visual focal point.

Use:

- modest size,
- restrained tracking,
- high enough contrast to read,
- but lower visual weight than the Hero greeting.

Do not let the wordmark compete with:

- greeting,
- current highlight,
- character artwork.

---

# 19. Home Structure

Home contains two main layers:

## Layer 1 — Now / Hero

Contains:

- date,
- greeting,
- compact current highlight,
- optional CTA,
- Home artwork.

The Hero remains compact.

---

## Layer 2 — This Week

Contains:

- Study,
- Health,
- Context.

Home shows the current week only.

No month.

No year.

No all-time analytics.

---

# 20. Current Highlight

The current highlight should be compact and readable.

Example:

```text
Study
TKA Mathematics
Conditional Probability
50%
```

Possible treatment:

- light translucent glass,
- visible violet Study accent,
- compact progress,
- restrained border.

Do not make it a giant dashboard card.

---

# 21. Home Weekly Composition

The primary Home reference establishes the preferred composition.

Desktop:

```text
Study        Health
Context spans below
```

Study and Health share the main weekly row.

Context runs horizontally below them.

Do not return to:

```text
large Study left
+
Health / Context stacked right
```

That legacy composition is no longer preferred.

---

# 22. Study Weekly Visual

Study uses a 7-day contribution-style visualization.

Use violet intensity.

Do not fabricate daily Study history.

If history is unavailable:

- show unrecorded / unknown states honestly,
- preserve the contribution structure,
- avoid pretending every day has data.

Supporting information may include:

- overall progress,
- subject,
- topic,
- weekly duration when real.

---

# 23. Health Weekly Visual

Health uses a different grammar from Study.

Preferred:

- vertical rhythm bars,
- physical activity indicators,
- navy / blue states.

Possible supporting metrics:

- steps,
- resting HR,
- sleep,
- movement duration.

Do not fabricate metrics.

If data is unavailable, keep the structure but show a quiet unavailable state.

---

# 24. Context Weekly Visual

Context uses a horizontal timeline.

Event markers may contain semantic colors.

Prefer:

- small colored dot,
- event label,
- optional time,
- neutral line underneath.

Do not fill every day.

No event means visually quiet.

The Home reference may contain example events, but implementation must use real or explicitly fixture data only.

---

# 25. CTA Behavior

Use small doorway cues:

- `Open study →`
- `Open health →`
- `Open context →`

Keep CTAs visible but secondary.

Do not use oversized primary buttons for navigation.

---

# 26. Responsive Behavior

Desktop is the primary V0.1 target.

On smaller widths:

- background may crop,
- character prominence may reduce,
- weekly modules may stack,
- atmosphere may simplify,
- sidebar may collapse,
- readability takes priority.

Do not globally shrink everything.

---

# 27. Motion

Use subtle motion only.

Allowed:

- small hover transitions,
- opacity change,
- compact progress animation,
- very restrained background motion if later added.

Avoid:

- floating cards,
- constant decorative animation,
- game-like transitions.

Respect reduced-motion settings.

---

# 28. Empty States

Empty states should remain quiet.

Examples:

```text
No movement data yet.
No context data yet.
```

Do not invent data.

Do not use giant decorative empty states.

---

# 29. Loading & Error States

Keep layout stable.

Avoid full-screen spinners.

Errors should be local and preserve previously saved data when safe.

---

# 30. Accessibility

Maintain:

- readable contrast,
- keyboard navigation,
- focus states,
- sufficient type size,
- reduced motion,
- non-color-only meaning when required.

Semantic event colors should be accompanied by labels / context.

---

# 31. Asset Roles

Use clear asset roles.

Recommended repository structure:

```text
apps/web/public/images/allverra/
├─ home-background.png
├─ study-background.png        # future
├─ health-background.png       # future
└─ context-background.png      # optional future

docs/assets/characters/
├─ alverixx-reference.png
└─ lyverra-reference.png

docs/assets/references/
└─ home-ui-reference.png
```

---

## 31.1 `home-background.png`

This is the **runtime Home background**.

It must contain:

- environment,
- Alverixx + Lyverra,
- no UI,
- no app text,
- no fake metrics.

Use the approved clean background-only image.

This asset belongs in:

```text
apps/web/public/images/allverra/home-background.png
```

---

## 31.2 `home-ui-reference.png`

This is the **primary Home composition reference**.

It contains the UI and is used to communicate:

- layout,
- hierarchy,
- surface transparency,
- spacing,
- Study / Health / Context balance,
- sidebar treatment,
- relative artwork prominence.

It is NOT a runtime asset.

It must not be rendered directly.

Store it in:

```text
docs/assets/references/home-ui-reference.png
```

The current approved reference is the version with:

- plain neutral sidebar,
- compact ALLVERRA ROOM wordmark,
- Hero in the upper-left,
- Study and Health side by side,
- Context below,
- visible lavender-gray atmosphere,
- translucent cards,
- no decorative flowers belonging to the navbar.

---

## 31.3 Character Reference Sheets

Character sheets are canonical identity references.

Store:

```text
docs/assets/characters/alverixx-reference.png
docs/assets/characters/lyverra-reference.png
```

These are not runtime UI assets unless explicitly needed later.

---

# 32. Asset Priority During Implementation

For Home implementation:

```text
1. PRODUCT.md / DESIGN.md rules
2. home-ui-reference.png for composition
3. home-background.png for runtime atmosphere
4. character sheets for identity
5. existing implementation for behavior only
```

If the old implementation conflicts with the approved Home visual composition:

preserve behavior, not the old layout.

---

# 33. Implementation Rules for Codex

When implementing visual work:

1. preserve real data behavior;
2. use the approved UI reference as the composition target;
3. use the background-only asset at runtime;
4. do not reproduce fake metrics from the reference;
5. keep character sheets canonical;
6. do not globally bleach the background;
7. keep navbar visually neutral;
8. keep Study visibly violet;
9. keep Health visibly navy/blue;
10. give Context semantic event colors only when data supports them;
11. preserve whitespace with subtle atmosphere;
12. avoid opaque white dashboard cards;
13. avoid unrelated layout refactors;
14. preserve accessibility and responsive behavior.

---

# 34. Home Visual Acceptance Check

Before approving Home, verify:

### A. Is the greeting immediately readable?
If no, improve local readability.

### B. Is the background clearly visible?
If no, artwork has been over-muted.

### C. Does the background overpower the UI?
If yes, reduce it locally.

### D. Does negative space still contain atmosphere?
If no, it has become too sterile.

### E. Is Study visibly violet?
If no, strengthen Study color language.

### F. Is Health visibly navy / blue?
If no, strengthen Health color language.

### G. Does Context use event colors meaningfully?
If no, keep it neutral until real events exist.

### H. Are Study and Health side by side?
If no, composition has drifted from the approved reference.

### I. Is Context horizontal below them?
If no, composition has drifted.

### J. Is the ALLVERRA ROOM wordmark secondary?
If no, reduce its visual weight.

### K. Does the navbar remain plain and reusable across domains?
If no, remove environment-specific decoration.

---

# 35. V0.2 Home Acceptance Criteria

Home is visually acceptable when:

- the navbar is clean and environment-independent,
- the ALLVERRA ROOM wordmark is understated,
- Hero text is readable,
- background is visible and smooth,
- Alverixx + Lyverra remain secondary to UI but clearly present,
- subtle foliage / lighting survives in negative space,
- Study and Health share the weekly row,
- Study visibly uses violet,
- Health visibly uses navy / blue,
- Context spans below,
- event colors are semantic rather than random,
- surfaces are translucent rather than opaque white,
- the interface feels personal rather than SaaS-generic,
- no fake data is introduced to match visual references.

---

## Design rule in one sentence

> **ALLVERRA should feel like a calm personal room where each domain has its own atmosphere, while the app shell stays clean, consistent, and unmistakably secondary to the information that matters.**
