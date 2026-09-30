# KRAVV OS — Design Language

> Status: Living document  
> Stage: V0.1 / Early Prototype  
> Purpose: Define the visual identity, layout behavior, motion, and interaction rules of KRAVV OS so the product feels coherent across future modules.

---

## 1. Design Vision

KRAVV OS should feel like a **personal living cockpit**.

It belongs to the KRAVVIENT product family, but it should not look like a corporate terminal copied into a personal app.

KRAVV-IENT is designed for a more restrained, analytical, VC-oriented environment.

KRAVV OS should feel:

- personal
- adaptive
- interactive
- expressive
- calm
- slightly futuristic
- useful before decorative

The interface should feel alive without becoming noisy.

---

## 2. Relationship to KRAVVIENT

KRAVV OS inherits the visual DNA of KRAVVIENT.

Shared DNA:

- dark-first interface
- blue-led identity
- technical clarity
- precise spacing
- clean typography
- disciplined information hierarchy
- subtle futuristic character

Different personality:

### KRAVV-IENT

- corporate
- analytical
- restrained
- dense
- terminal-like
- professional
- information-first

### KRAVV OS

- personal
- fluid
- ambient
- animated
- emotionally warmer
- more visual
- more playful
- context-aware

A useful mental model:

> **KRAVV-IENT is the boardroom terminal. KRAVV OS is the living cockpit.**

---

## 3. Core Visual Principles

### 3.1 Dark First

KRAVV OS should primarily use a deep dark background.

The dark base creates contrast for:

- blue accents
- glass panels
- ambient gradients
- charts
- motion
- AI states

Avoid pure black everywhere.

Prefer deep navy or near-black blue tones.

---

### 3.2 Blue Is the Anchor

Blue is the core KRAVV identity.

KRAVV OS may expand into nearby tones such as:

- cobalt
- cyan
- indigo
- violet

These colors should feel related rather than becoming a rainbow dashboard.

Suggested direction:

```text
Deep Navy
    ↓
KRAVV Blue
    ↓
Electric Blue
    ↓
Indigo
    ↓
Soft Violet
```

Color should communicate hierarchy and state, not decorate every surface.

---

### 3.3 Glass, Not Glass Everywhere

Glassmorphism is part of the KRAVV OS personality, but it should be controlled.

Good uses:

- primary dashboard cards
- floating command bar
- AI panel
- modal windows
- sidebar
- music player
- contextual overlays

Avoid making every button, label, or small container a blurred glass surface.

The background should remain visually stable so glass panels have something to contrast against.

---

### 3.4 Motion Has Meaning

Animation should communicate:

- state change
- progress
- synchronization
- hierarchy
- navigation
- system activity

Do not animate something only because it can be animated.

Examples:

- study progress smoothly changes after sync
- health metrics softly update
- cards enter with subtle stagger
- AI insight panel expands when new context appears
- sync indicators pulse while fetching
- ambient background shifts slightly with context

Motion should usually feel soft and controlled rather than fast or flashy.

---

## 4. Layout Philosophy

KRAVV OS should feel like one workspace rather than a collection of unrelated pages.

Desktop-first layout:

```text
┌───────────────┬───────────────────────────────────┬─────────────────┐
│               │                                   │                 │
│   Sidebar     │          Main Workspace           │   Context Rail  │
│               │                                   │                 │
│ Home          │  Greeting / Context               │ KRAVV AI        │
│ Study         │                                   │                 │
│ Health        │  Study   Health   Events          │ System Status   │
│ Events        │                                   │                 │
│ Notes         │  Focus / Tasks / Modules          │ Optional cards  │
│ AI            │                                   │                 │
│ Settings      │                                   │                 │
│               │                                   │                 │
└───────────────┴───────────────────────────────────┴─────────────────┘
```

The right context rail is optional on smaller screens.

The main workspace should remain the visual center.

---

## 5. Navigation

### Primary Navigation

Initial navigation may include:

```text
Home
Study
Health
Events
Notes
AI
Settings
```

Future modules may include:

```text
Projects
GitHub
Music
Finance
Knowledge
```

Navigation should not expose future modules before they are useful.

Inactive or unimplemented sections should not clutter the interface.

---

## 6. Home Dashboard

The Home dashboard should answer:

> What matters to me right now?

It should not attempt to show every available metric.

Suggested V0.1 structure:

```text
Greeting / Time Context
        ↓
Study | Health | Events
        ↓
Today's Focus
        ↓
AI Insight
        ↓
Optional Quick Tools / Music / System Status
```

### Study Card

Should prioritize:

- current subject/course
- progress
- current topic
- recent activity
- next useful action

Avoid turning it into a miniature LMS.

---

### Health Card

Should prioritize:

- one readable summary
- a few current metrics
- recent trend or baseline
- sync state

Avoid presenting health data as diagnosis.

---

### Events Card

Should prioritize:

- today
- upcoming commitments
- deadlines
- short calendar context

Avoid displaying an entire complex calendar when a short daily view is enough.

---

## 7. Personal Context Layer

KRAVV OS should feel personal without becoming visually chaotic.

Possible contextual elements:

- greeting based on time of day
- user's name
- current focus
- lightweight quote or personal line
- ambient background
- music state
- recent activity
- current study topic
- upcoming event
- AI-generated daily brief

These elements should support the current context rather than compete for attention.

---

## 8. Ambient Interface

KRAVV OS may subtly change based on context.

Examples:

### Morning

- slightly brighter blue tones
- clearer highlights
- daily priorities emphasized

### Evening

- deeper navy
- softer violet accents
- lower visual intensity

### Focus Mode

- fewer visible widgets
- reduced animation
- study/task panel emphasized
- secondary panels visually muted

### Weekly Review

- more analytical layout
- trend cards
- cross-domain summaries

Ambient changes must remain subtle.

KRAVV OS should never become visually unpredictable.

---

## 9. AI Presence

KRAVV AI should feel embedded in the system.

Avoid the default pattern of a generic floating chatbot bubble.

Possible UI forms:

- dedicated context rail
- command palette
- inline insight card
- expandable AI panel
- subtle orb / pulse indicator
- contextual suggestions

AI state may include:

```text
Idle
Thinking
Syncing context
Insight ready
Offline
```

The visual state should be understandable without excessive animation.

---

## 10. Command Interface

KRAVV OS may include a universal command bar.

Example:

```text
Ask KRAVV anything...        Ctrl + K
```

Possible uses:

- navigate to modules
- search personal data
- ask AI questions
- trigger sync
- create note
- add event
- start focus session

The command interface should become a shortcut layer, not replace normal navigation.

---

## 11. Music Integration

Music is a future personal module.

Archive Tone may later act as an external music source through an API or connector.

Possible KRAVV surfaces:

- compact now-playing bar
- focus playlist shortcut
- listening context
- playback controls
- library entry point

The Music UI should remain secondary unless music is actively being used.

It should not dominate the dashboard.

---

## 12. Glass Surface System

Suggested hierarchy:

### Level 0 — Background

Opaque dark/navy base.

### Level 1 — Standard Surface

Slightly lighter than background.

Used for:

- secondary cards
- lists
- utility panels

### Level 2 — Glass Surface

Semi-transparent with controlled blur.

Used for:

- major dashboard cards
- command bar
- AI panel
- music bar

### Level 3 — Active / Floating Surface

Stronger border, glow, or depth.

Used for:

- focused modal
- active card
- selected context
- current AI state

Avoid stacking multiple heavy glass layers on top of each other.

---

## 13. Borders and Glow

Borders should be thin and subtle.

Suggested behavior:

- default border: low-contrast blue-gray
- hover: slightly brighter
- active: blue / indigo emphasis
- sync/activity: soft cyan pulse
- AI state: optional blue-violet glow

Glow should be localized.

Do not surround every element with neon.

---

## 14. Typography

Typography should feel modern and readable.

Primary characteristics:

- clean sans-serif
- medium-to-high x-height
- readable at small dashboard sizes
- strong hierarchy
- minimal decorative typography

Suggested hierarchy:

```text
Display / Greeting
Page Title
Section Title
Card Title
Body
Metadata
Micro Label
```

Monospace may be used sparingly for:

- IDs
- technical values
- developer/debug views
- system status

Do not use monospace as the primary UI font.

---

## 15. Iconography

Icons should be:

- simple
- rounded or geometric
- visually consistent
- recognizable at small sizes

Avoid mixing multiple unrelated icon families.

Each module may have one recognizable icon:

```text
Study   → Book / Layers
Health  → Heart / Pulse
Events  → Calendar
AI      → Neural / Orb / Spark
Music   → Wave / Note
Notes   → Document
```

---

## 16. Module Accent Logic

KRAVV OS should use one shared color family.

Suggested accents:

```text
Study   → KRAVV Blue / Indigo
Health  → Cyan / Soft Blue
Events  → Violet / Indigo
AI      → Blue + Violet
Music   → Indigo / Violet
```

These are accents, not separate brand identities.

Avoid assigning completely unrelated colors to every module.

---

## 17. Interaction Behavior

Cards should generally support three levels of interaction:

```text
View
Open
Act
```

Example:

Study card:

- view current progress
- open Study module
- trigger a relevant action

Avoid placing too many controls directly on dashboard cards.

The dashboard should remain scannable.

---

## 18. Responsive Behavior

### Desktop

Full experience:

- sidebar
- main workspace
- optional context rail

### Tablet

- compact sidebar
- main cards stack or form two columns
- context rail moves below main content

### Mobile

- bottom navigation or compact drawer
- single-column cards
- AI panel becomes sheet/modal
- command bar remains accessible
- decorative ambient effects are reduced

KRAVV OS should remain usable without relying on hover.

---

## 19. Accessibility

Visual style must not reduce usability.

Requirements:

- readable contrast
- text must remain legible over glass
- important state cannot rely only on color
- keyboard navigation should be possible
- focus states must be visible
- motion should support reduced-motion preferences
- small metadata text should remain readable

Aesthetic polish is secondary to clarity.

---

## 20. Performance Rules

Visual effects should not make KRAVV OS feel heavy.

Avoid:

- excessive backdrop blur
- multiple large animated gradients
- continuously running decorative animations
- unnecessary 3D effects
- large video backgrounds

Prefer:

- CSS transitions
- lightweight gradients
- subtle transforms
- limited blur areas
- animation only when visible

The UI should remain smooth on a normal laptop.

---

## 21. Anti-Patterns

Avoid:

- generic AI SaaS landing-page aesthetic
- random purple-blue gradient everywhere
- excessive glass blur
- neon cyberpunk styling
- dozens of dashboard charts
- oversized hero sections
- excessive rounded cards
- unnecessary widgets
- fake complexity
- animation without functional meaning
- visual duplication of KRAVV-IENT

KRAVV OS should feel designed for one person, not generated from a generic dashboard template.

---

## 22. V0.1 Design Scope

For the first implementation, design only enough to establish the visual language.

V0.1 should include:

```text
Sidebar
Command Bar
Greeting / Context Header

Study Card
Health Card
Events Card

AI Insight Panel
Today's Focus

Optional:
Quick Tools
Music Mini Player
System Status
```

Mock data is acceptable.

The goal is to answer:

> Does this already feel like KRAVV OS?

Only after the answer is yes should the design language be propagated to more pages.

---

## 23. Codex Implementation Guidance

When implementing KRAVV OS:

- preserve the KRAVV visual identity
- do not copy KRAVV-IENT's corporate terminal layout directly
- favor reusable components
- centralize design tokens
- keep motion subtle
- avoid adding visual complexity without purpose
- do not invent new product modules without documentation
- maintain responsive behavior
- maintain accessible contrast
- avoid provider-specific UI assumptions

Recommended token groups:

```text
colors
surfaces
borders
radius
spacing
typography
shadow
blur
motion
z-index
```

Design tokens should be defined centrally so the interface can evolve without rewriting every component.

---

## 24. Design North Star

KRAVV OS should feel like:

> **A calm, intelligent, personal digital space that quietly understands what is happening in the user's day.**

Not a corporate dashboard.

Not a game HUD.

Not a generic AI app.

Not a futuristic interface for its own sake.

A personal operating system.
