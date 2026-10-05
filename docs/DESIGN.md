# ALLVERRA ROOM — Design System & Home Direction

**Document:** `docs/DESIGN.md`  
**Status:** Active baseline  
**Version:** V0.1  
**Purpose:** Define the visual system, composition rules, background behavior, character usage, and Home-page hierarchy for ALLVERRA ROOM.

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
- modern without looking over-designed.

The UI remains the main subject.

The background and character artwork support the experience rather than compete with it.

---

# 2. Core Design Principle

## Clean first. Personality second. Decoration third.

When a visual decision creates tension between beauty and readability:

**reduce the background or decoration before increasing UI heaviness.**

Do not solve a busy background by adding:

- stronger shadows,
- darker card fills,
- heavier borders,
- excessive blur,
- more containers.

Instead, reduce the visual strength of the background.

---

# 3. Visual Hierarchy

The visual hierarchy should remain predictable.

From strongest to quietest:

1. **Primary UI content**
2. **Current / relevant data**
3. **Domain accent**
4. **Character artwork**
5. **Environmental background**
6. **Decorative foliage / texture**

Approximate contrast hierarchy:

```text
UI text + important data         100%
Interactive states               90–100%
Character focal area             55–70%
Environmental illustration       30–45%
Foliage / texture                15–30%
Ambient atmosphere               10–20%
```

These values are guidance, not strict CSS constants.

The intended result is simple:

> The user should notice the information before noticing how beautiful the background is.

---

# 4. ALLVERRA Base Palette

ALLVERRA uses a shared neutral foundation.

## Base

- warm white / off-white
- soft gray
- graphite
- charcoal
- near-black

Avoid pure black unless used sparingly.

Avoid strongly saturated blue as the global identity.

---

## Domain accents

### Study / Lyverra

Primary accent:

- muted violet
- lavender
- soft desaturated purple

Use violet for:

- active Study state,
- weekly activity intensity,
- Study CTA,
- focus indicator,
- subtle ambient reflection.

Do not fill large areas with saturated purple.

---

### Health / Alverixx

Primary accent:

- deep navy
- cool gray
- steel gray
- subtle blue-white

Use navy for:

- Health activity state,
- selected movement day,
- important metric,
- small chart / rhythm emphasis,
- Health CTA.

The Health section may feel more analytical than Study.

---

### Context

Default accent:

- neutral gray
- graphite
- soft white

Context should usually be quieter than Study and Health.

Do not introduce a third strong color unless future product meaning requires it.

---

# 5. Material Language

ALLVERRA may use glassmorphism, but glass is a **material**, not a layout strategy.

Do not put every section inside the same rounded translucent rectangle.

Use glass only where it helps:

- separate foreground information from the background,
- create local focus,
- improve readability,
- support floating UI,
- communicate interaction.

Recommended glass behavior:

- neutral or slightly warm white tint,
- low opacity,
- subtle blur,
- thin low-contrast border,
- minimal shadow.

Avoid:

- blue-tinted glass everywhere,
- excessive blur,
- bright glowing borders,
- thick shadows,
- oversized bubbles.

---

# 6. Background System

The Home background is a designed visual layer, not just a CSS gradient.

It should already contain a natural visual transition from the upper Hero area into a quieter lower area.

The lower Home area must remain suitable for weekly data.

## Background composition

The background should provide:

- character artwork in the upper-right area,
- environmental framing,
- large usable negative space on the left,
- large usable negative space below,
- low-contrast transition into the weekly area,
- subtle foliage or environmental texture.

The background should not contain:

- readable text,
- logos,
- fake UI,
- strong decorative objects behind important data,
- high-frequency detail across the whole screen.

---

## Background strength

The background should be adjusted in the UI layer if needed.

Useful controls:

- opacity,
- contrast,
- saturation,
- brightness,
- overlay,
- blur in selected areas,
- masked fade.

Recommended starting point:

```text
Character artwork opacity:
55–70%

Environment detail:
20–40%

Decorative foliage:
15–30%

Saturation:
slightly reduced

Foreground UI:
full readability
```

Do not apply one global opacity blindly if local masking works better.

---

## Hero-to-content transition

The transition should feel embedded into the artwork.

Preferred:

- soft light wash,
- mist / environmental fade,
- low-detail lower region,
- gradual value transition,
- negative space.

Avoid:

- obvious rectangular overlays,
- hard horizontal gradient cuts,
- sudden background-color changes,
- heavy dark fades unless required by a dark theme variant.

CSS may support the transition, but should not be solely responsible for it.

---

# 7. Decorative Foliage

Foliage is optional atmospheric framing.

It may appear:

- behind the sidebar,
- at far left,
- lower corners,
- far right edge,
- as soft shadows or blurred foreground elements.

Foliage is not part of navigation.

If visible behind translucent UI, it should remain subtle.

Do not treat foliage as a mandatory ALLVERRA logo motif.

If another environmental motif works better later, it may replace foliage.

---

# 8. Character Identity

Character sheets are the canonical source of truth.

Generated background images are **not** canonical references for:

- face,
- hairstyle,
- proportions,
- outfit identity,
- eye design.

When generating new artwork, preserve character identity first and composition second.

---

## 8.1 Alverixx

Visual identity:

- white / silver-white hair,
- calm / distant expression,
- slim young male proportions,
- gray / white / black clothing language,
- long gray coat when using the established outfit,
- white shirt,
- dark trousers,
- understated styling.

Eyes:

- right eye: cool blue,
- left eye: muted gray,
- left eye reflects corneal damage,
- effect must remain subtle and non-graphic.

Character energy:

- quiet,
- detached,
- relaxed,
- slightly aloof,
- not performative.

Avoid:

- generic glossy anime face,
- overly heroic pose,
- excessive emotion,
- strong cyberpunk treatment.

---

## 8.2 Lyverra

Visual identity:

- very long black hair,
- hair remains loose,
- no invented ponytail,
- no invented ribbon unless the canonical character sheet includes it,
- natural straight / softly flowing hair,
- subtle violet strands or undertone,
- calm narrow-soft eyes,
- slim face,
- understated expression.

Eyes:

- soft brown.

Outfit language:

- muted violet cardigan,
- white inner shirt,
- black lower garment,
- elegant and calm silhouette.

Character energy:

- older-sister presence,
- calm,
- mature,
- observant,
- emotionally softer than Alverixx without becoming overly cute.

Avoid:

- generic anime-girl face,
- exaggerated violet eyes,
- overly glossy hair,
- yandere expression,
- artificial accessories not present in the reference.

---

# 9. Character Relationship in Home Artwork

Lyverra is the older sister.

Alverixx is the younger sibling.

The Home artwork should communicate familiarity without turning into a dramatic poster.

Possible pose direction:

- both relaxed,
- Alverixx slightly more casual / unconcerned,
- Lyverra visually steadier,
- no forced camera-facing pose,
- no exaggerated emotional scene.

The pair should occupy mainly the upper-right composition.

Do not let the artwork consume the entire layout.

---

# 10. Character Art Style

Target:

**clean editorial manga illustration with soft matte texture**

Characteristics:

- clean but slightly human linework,
- visible drawing structure,
- soft desaturated shading,
- matte color treatment,
- restrained highlights,
- subtle paper / brush texture,
- low-gloss rendering.

Avoid:

- hyper-polished AI anime rendering,
- plastic skin,
- excessive bloom,
- glossy cinematic face rendering,
- over-detailed hair strands,
- over-sharpened line art,
- painterly blur that destroys character identity.

The image should feel like:

> a polished illustration drawn from a manga / editorial character design language.

---

# 11. Typography

Typography should feel clean and editorial.

Use a controlled combination of:

- refined serif for selected large hero text,
- modern sans-serif for interface text.

Do not overuse serif.

Recommended:

- Hero greeting may use serif.
- Navigation, metrics, labels, CTAs, dates, and system text should use sans-serif.

Avoid:

- too many font families,
- decorative typography inside data surfaces,
- excessive letter spacing on body text,
- motivational micro-copy.

---

# 12. Sidebar

The sidebar should be quiet.

It may be:

- translucent,
- lightly frosted,
- borderless or use one subtle divider,
- visually connected to the background.

Background artwork may faintly remain visible behind it.

Primary items:

- Home
- Study
- Health
- Context

Do not fill the sidebar with:

- product slogans,
- system-status copy,
- developer information,
- fake shortcuts,
- unnecessary secondary labels.

Selected state should be obvious but restrained.

---

# 13. Home Structure

Home has only two major content layers.

## Layer 1 — Now / Hero

Contains:

- date,
- greeting,
- one relevant highlight,
- optional CTA,
- character artwork / atmosphere.

The hero must remain cleaner than a dashboard.

Do not put multiple competing statistics in the hero.

---

## Layer 2 — This Week

Contains:

- Study weekly signal,
- Health weekly signal,
- Context weekly signal.

No month.

No year.

No all-time.

---

# 14. Current Highlight

The Hero highlight should be compact.

Example:

```text
Study
Mathematics
Conditional Probability
50%
```

Use the least UI necessary to communicate this.

Possible treatment:

- soft translucent panel,
- borderless text block,
- subtle accent line,
- compact progress indicator.

Do not make the highlight a giant dashboard card.

The relevant domain may change in the future.

---

# 15. Weekly Layout

The weekly area must not become three duplicated cards.

Each domain gets a visual form appropriate to its data.

The layout may be asymmetric.

Study and Health may receive more visual weight than Context.

---

# 16. Study Weekly Visual

Study uses a contribution-inspired visualization.

Show exactly seven current-week days.

Example:

```text
Mon  Tue  Wed  Thu  Fri  Sat  Sun
 □    ░    ▒    ▓    █    ░    □
```

The boxes represent Study activity intensity toward a daily target.

They do not represent Git commits.

Possible intensity states:

- unrecorded,
- low activity,
- medium activity,
- target reached.

Use violet as the active language.

Keep labels minimal.

Possible supporting data:

- subject,
- topic,
- weekly minutes,
- current progress.

CTA:

`Open study →`

---

# 17. Health Weekly Visual

Health must use a different visual language from Study.

Possible forms:

- slim vertical movement bars,
- rhythm strip,
- pulse-like weekly indicators,
- compact movement curve.

Use navy + gray.

Supporting highlights may include:

- steps,
- resting HR,
- sleep,
- movement duration.

Do not show too many metrics at once.

Recommended Home maximum:

**2–3 health highlights.**

CTA:

`Open health →`

---

# 18. Context Weekly Visual

Context should be the quietest weekly domain.

Use a timeline / calendar-like visual.

Days may remain empty if no event exists.

State language:

- past event → muted,
- current / today → clear,
- upcoming → visible outline / light emphasis.

Events should only appear where real or fixture data exists.

Do not fill every day artificially.

CTA:

`Open context →`

Context may be visually flatter and less card-like than Study or Health.

---

# 19. CTA Behavior

Each Home domain should have a small doorway into its dedicated section.

Examples:

- `Open study →`
- `Open health →`
- `Open context →`

CTA should not dominate the module.

Avoid large primary buttons unless an action truly requires one.

Do not create a CTA if its destination does not exist.

---

# 20. Whitespace

Whitespace is a required part of the design.

Do not treat empty space as unfinished.

The Home layout should leave breathing room around:

- greeting,
- highlight,
- weekly modules,
- character artwork.

The interface should remain usable at 100% browser zoom without requiring zoom-out to understand the composition.

Avoid excessively tall hero sections that push the weekly overview too far below the fold.

---

# 21. Responsive Behavior

Desktop is the primary V0.1 target.

The layout should still degrade cleanly on smaller widths.

On narrower screens:

- artwork may crop more aggressively,
- character art may reduce in prominence,
- weekly sections may stack,
- sidebar may collapse,
- background detail should be reduced.

Data readability always wins over artwork preservation.

---

# 22. Motion

Motion should be subtle.

Allowed:

- soft hover transitions,
- small opacity change,
- gentle surface lift,
- compact progress animation,
- low-key background parallax only if inexpensive and optional.

Avoid:

- constant decorative animation,
- large floating elements,
- exaggerated card motion,
- motion that makes the product feel game-like.

Respect reduced-motion preferences.

---

# 23. Empty States

Empty states should remain quiet.

Good:

```text
No movement data yet.
```

Better when the visual itself can communicate emptiness without a large message.

Avoid giant empty-state cards.

Do not use motivational filler.

---

# 24. Loading & Error States

Loading should preserve layout stability.

Avoid replacing entire sections with large spinners.

Errors should be clear and local.

Example:

```text
Study data unavailable.
Try again
```

Previously persisted data should remain visible where safe.

---

# 25. Accessibility

Maintain:

- sufficient text contrast,
- visible focus states,
- keyboard-accessible navigation,
- readable font sizes,
- non-color-only state indicators when necessary,
- reduced-motion support.

Background artwork must never reduce critical text readability.

---

# 26. Implementation Rules for Codex

When implementing a visual reference:

1. reproduce the hierarchy, not every pixel;
2. preserve real data behavior;
3. do not invent data to match a mockup;
4. use reusable tokens;
5. do not hardcode visual noise into components;
6. keep background assets separate from UI logic;
7. keep character artwork replaceable;
8. avoid tying component structure to one wallpaper;
9. preserve responsive behavior;
10. keep the Home page lightweight.

---

# 27. Asset Layering Recommendation

Recommended layer model:

```text
Layer 5 — Interactive UI
Layer 4 — Glass / readable foreground surfaces
Layer 3 — Character artwork
Layer 2 — Environment / foliage
Layer 1 — Base background / ambient tone
```

A character or environmental asset should never contain required UI text.

This allows:

- artwork replacement,
- responsive cropping,
- opacity tuning,
- theme adjustment,
- future day/night variants.

---

# 28. CSS / Rendering Strategy

Prefer separate controllable layers rather than a single flattened screenshot when possible.

Example concept:

```text
base background
+
hero/environment image
+
masked character artwork
+
subtle overlay
+
UI
```

If a flattened background asset is used, it should already provide:

- left-side negative space,
- lower negative space,
- low-detail UI zones.

CSS may then add only small readability adjustments.

---

# 29. Home Visual Rule

Before approving a Home design, ask:

### A. Can I identify the current important information immediately?

If no:
reduce background or decorative strength.

### B. Can I understand this week without opening another page?

If no:
improve weekly visual clarity.

### C. Does each domain feel different because its data is different?

If no:
stop duplicating card patterns.

### D. Does it still look like one product?

If no:
strengthen shared typography, spacing, materials, and base palette.

### E. Does removing the artwork still leave a usable app?

If no:
the artwork is carrying too much product meaning.

---

# 30. V0.1 Home Acceptance Criteria

The Home design is acceptable when:

- the greeting is immediately readable,
- the hero highlight is compact,
- artwork stays visually secondary,
- character identity remains accurate,
- left and lower areas retain enough negative space,
- weekly Study shows 7-day activity,
- Health uses a distinct visual grammar,
- Context is quieter,
- CTAs are visible but understated,
- background does not overpower UI,
- the page feels complete at normal browser zoom,
- no section exists only as decorative filler,
- no duplicated card system dominates the page.

---

## Design rule in one sentence

> **ALLVERRA should feel like a quiet personal room whose data happens to be beautifully organized — not a dashboard decorated with characters.**
