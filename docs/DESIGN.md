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

### Home principle

**Information should be minimal. Personality should come from visual design,
not excess copy.**

Use a real raster wallpaper in the upper Home area, with a dark gradient overlay
for legibility and a soft transition into the navy base. Selected glass surfaces
float over that transition. Strong KRAVV blue, restrained indigo/violet light,
typography, spacing, and meaningful motion carry the personality.

Empty space is intentional. Do not fill it with motivational text, decorative
charts, fake data, connection panels, or large placeholders. Home has two time
horizons: **Now** in the atmospheric hero and **This Week** below it. Home is for
a glance; domain sections are for understanding; Insights are for investigation.
Wallpaper and greeting are the emotional anchor. The hero has no permanently
dominant domain. Study currently supplies its one real signal. The weekly area
keeps subtle visual structure for Study, Health/Movement, and Context/Events
even when some data is unavailable. Hide empty-state content, not necessarily
the domain itself. AI presence is optional and omitted until useful.
Source/mock indicators, last-sync details, backend status, and provider connections
belong in Settings or a future developer view.

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

Current desktop Home layout:

```text
Navigation rail | Now: wallpaper / date / greeting / one relevant signal
Home            | This Week: Study activity / Movement rhythm / Context timeline
Study           |
Settings        |
```

The atmospheric opening remains the visual center. The hero signal sits within
the wallpaper transition without a large card. This Week is one composition
with distinct visual forms, not three equal cards. There is no system/AI context
rail on Home. The weekly parts stack on smaller screens; navigation moves to
the bottom on mobile. Existing Settings and Commands dialogs are outside this
Home refinement.

Weekly surfaces use neutral, low-opacity frosted glass with moderate corners.
Each carries a small text-and-arrow doorway cue. Study links to the existing
`#study` section; Movement and Context cues remain non-interactive until real
destinations exist. Only working links receive hover/focus feedback.

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

## 6. Home Arrival Layer

Home should answer at a glance:

> What matters to me right now?

It should not attempt to show every available metric.

V0.1 structure:

```text
Now: wallpaper + greeting / date + one current signal
        ↓
This Week: compact weekly visual structure for Study, Movement, Context
```

### Study Highlight

Should prioritize:

- current subject/course
- compact progress only when useful
- current topic
- recent activity
- Continue when a real destination exists

Avoid turning it into a miniature LMS.

Study is the first working integration, not the permanent visual owner of Home.
Use a compact course/topic treatment; keep progress subordinate and sync secondary.
Continue is intentionally omitted in the current implementation because there is
no separate Study page or lesson URL. Do not create a pretend navigation action.
Do not repeat progress in an ornamental chart. Sync success is a brief, transient
acknowledgment; error feedback stays visible with technical details available in Settings.

In This Week, Study uses seven contribution-style day marks. The current model
has aggregate progress and one `last_activity` timestamp, not daily history.
Mark that day only when it falls in the current week; leave all other days
unrecorded rather than implying confirmed inactivity or inventing intensity.

---

### Health Highlight

In V0.1, Health has no dataset. Its weekly movement rhythm stays neutral and
unrecorded, with no invented levels or trends. Connection status remains in
Settings. Do not use a large disconnected card.

Should prioritize:

- one currently relevant signal when real data exists
- morning: sleep; daytime: movement/activity; evening: daily recap, when supported
- a presentation appropriate to that signal, not a copy of the Study highlight

Avoid presenting health data as diagnosis.

---

### Context / Events Highlight

In V0.1, Context has no event dataset. Its weekly calendar/timeline structure
remains empty, with no invented events, deadlines, or completed activities.

Should prioritize:

- the next relevant event, deadline, or daily context when real data exists
- a concise line or other contextual format rather than another equal module card

Avoid displaying an entire complex calendar when a short daily view is enough.

Month, semester, year, detailed activity histories, long-term trends, and
showcase surfaces belong in domain pages or future dedicated surfaces. Home
shows only now and the current week.

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

For current Home, use greeting/date and available contextual highlights. Do not
add the other examples to fill space; quotes and slogans are not part of Home.

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

V0.1 has no Home AI panel or artificial activity indicator. Its disconnected
status is visible in Settings. The following patterns are future possibilities.

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

Home is for a glance. A highlight may offer a real domain destination and a
secondary action, but it must not become a domain workspace. The card examples
below apply where those domain surfaces actually exist.

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

Home keeps the wallpaper/greeting anchor at every size. The weekly composition
stacks on narrow screens while preserving each domain's visual form. The
card/context-rail/AI-panel patterns below are for future domain surfaces, not
requirements to add those elements to Home.

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
Compact navigation rail / mobile bottom navigation
Upper wallpaper with dark overlay
Greeting / date
One contextual hero highlight when meaningful data is available
Current-week Study activity, neutral Movement rhythm, empty Context timeline
No permanent dominant domain or fixed three-module layout
Commands shortcut
Settings dialog for technical details
```

Mock Study data is acceptable. Identify the source in Settings, not with a badge
on Home. Do not add Today's Focus, AI insight placeholders, music controls, or
system-status panels to this iteration. Health and Context retain quiet weekly
structure without invented data; their connection status stays elsewhere. This pass changes no
domain pages, Settings, integrations, models, or backend behavior.

### Wallpaper asset

`apps/web/public/images/blue-hour.png` was generated with the built-in imagegen
tool and is served locally through Next.js Image. No remote image host is needed.
The wallpaper is decorative and uses empty alt text. Generation prompt:

> Use case: photorealistic-natural. Asset type: wide desktop wallpaper for the upper area of KRAVV OS, a personal digital environment. Create a beautiful photorealistic mountain landscape at blue hour, wide panoramic 16:9 composition. Layered rugged alpine ridgelines emerge from soft mist; a prominent detailed peak sits toward the right, the left third has calmer shadowed slopes and open sky so a short white greeting can be placed there later. Rich cobalt and deep KRAVV blue atmosphere, subtle indigo/violet light in the clouds, very restrained cool highlights on the rock. Natural photographic texture, cinematic but believable light, peaceful expansive negative space. Frame mountains in the middle and lower portions with a spacious dusk sky above. It must feel like a premium personal desktop wallpaper, not a business website. Image only: no text, logos, UI, cards, grids, charts, people, buildings, glowing orbs, sci-fi objects, or neon. Landscape 2048x1152 if possible.

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
