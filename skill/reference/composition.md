# Composition, surfaces, motion

How Sarantium surfaces are built. Read with `SKILL.md`, which carries the palette
roles and the precedence order.

## Reading tokens.css correctly

`tokens.css` is the source of truth for **values**. It is *not* a reliable
description of **what shipped**. Two traps, both verified against live source.

### Trap 1: the canonical/banked labels have drifted

`tokens.css` records decisions D01 through D15, each with a canonical choice and
one or more "banked alternates" for a one-line swap. Some of those labels no longer
match production.

- **Bracketed nav** (`[ link ]`) is filed as a *banked* alternate under D10. It is
  **live** in `sarantium-site`.
- **The D04 button vocabulary** (transparent ground, deep-bronze text, underline,
  trailing arrow glyph) is filed as *canonical*. It is **almost entirely
  unconsumed**: the site ships its own solid ink-ground button instead.

More broadly, most of the D04 through D13 component vocabulary is declared but not
consumed. Motion is the sharp exception: `--m-easing` is used heavily and is real.

**Rule: when the token file's label and the live CSS disagree, the live CSS wins.**
Before teaching or reusing a component token, grep the consuming repo for it. A
token that resolves is not the same as a token that ships.

### Trap 2: `--color-ink` is not a stable primitive

`--color-ink` is declared as a literal in the `@theme` block, then **redefined** in
the legacy-alias block as `var(--ink)`, which chains to `--text`. The later
declaration wins. It is the only `--color-*` primitive that gets redefined.

So a dark surface pinned to `--color-ink` will follow the *text* token, and any
future theme flip that lightens text will also lighten that ground. `--color-ground`
is safe (one literal definition). `sarantium-site` handles this by pinning a literal
in its own shim layer and severing the non-text roles into `--ground-inverse`,
`--on-ground-inverse`, and `--tint-ink`.

## Layout

**Two container tiers, and the pairing is deliberate.**

- `--content-measure` is the text tier. Prose, cards, most sections.
- `--max-content` is the wide tier, used for stat bands and full-width rows that
  would look pinched at the text measure.

Do not collapse them to one. The retired skill taught "840, not 1080" as a
correction; that was wrong in both directions. Both are live and each has a job.

Editorial prose sits in a `--measure-prose` measure with an optional
`--marginalia-width` gutter on case-study pages.

Section padding scales fluidly via `--section-pad-y`. The header height is
`--header-h` and the hero's viewport fit depends on it.

## Surfaces

- Default page ground is a flat champagne field. No gradients, no patterns.
- `--surface` for cards and panels; `--elevated` for tiered or secondary sections.
- **One ink surface per page maximum.** Two consecutive dark sections read as
  wallpaper. The footer is a reasonable default choice for the one.
- **The Byzantine texture is shelved.** `--texture-byzantine` still exists so legacy
  layouts do not break, but nothing renders it. Do not reintroduce it without an
  explicit brand decision.
- **Paper grain** (`--paper-grain`) is a real, applied surface treatment. It is not
  the shelved texture; do not confuse them.

## Borders, radii, shadows

- **Borders** are 1px hairlines (`--border`), escalating to the accent on hover.
- **Corners are square.** Radius appears on buttons and nowhere else. Cards, panels,
  and images are 90 degrees.
- **Shadows do not exist in this brand.** No drop shadows, no glows, no elevation
  system. Depth comes from hairline borders, ink surfaces, tone shifts, and
  editorial whitespace.
- **Never `backdrop-filter: blur()`.** Foreign to the register.

## Dividers

- A short accent hairline, **one per page maximum**, typically at the hero close.
- Subsequent section breaks use whitespace plus a mono eyebrow label, or a
  full-width hairline in the border colour.
- A heavier chapter rule (`--rule-chapter-*`) is for editorial breaks inside
  long-form case studies, not marketing pages.

## Contrast

The brand is measured with **APCA**, not WCAG ratios alone, against Lc 75 for body
and Lc 45 for large or bold text. WCAG AA remains the legal floor.

The accent ramp's whole shape follows from this: only `--gold-deep` clears the body
target on champagne, which is why it is the link colour and why the lighter steps
are decorative. On a dark ground the bronze collapses, which is why `--onink-accent`
exists.

**Never create a text tier with `color-mix(..., transparent)`.** Transparency-derived
text tiers are a known defect class here, not a shortcut. Define a real colour.

## Motion

Doctrine, in force for any new work:

- **Motion must carry information.** Decorative motion is rejected.
- **Scroll-triggered**, via the site's single reveal controller rather than
  per-section client components.
- **Reduced-motion safe.** `prefers-reduced-motion: reduce` collapses transitions
  globally. Start-states must be gated so nothing is ever trapped invisible when JS
  does not run. Progressive enhancement is not optional here: a no-JS render shows
  everything.
- **Refused outright:** parallax, video-on-hover, cursor effects, bounce, spring
  physics.
- Every clickable gets a real pressed state. Its absence is a leading tell of
  machine-generated UI.
- Hover-only motion belongs inside `@media (hover: hover)`, or it fires on phone
  taps.

Tokens: `--m-easing`, `--m-duration-base`, `--m-duration-large`, `--m-duration-fade`,
`--m-transform-nudge`, plus `--dur-reveal`, `--dur-transition`, `--ease-out-cubic`.

Banked alternates for a cinematic or mechanical register exist in `tokens.css` and
are a one-line swap, not a per-component decision.

**`animate` owns the actual values.** This file names the tokens and the bounds.

## The mosaic motif

The mosaic is conceptual before it is decorative.

- Geometry stays **concentric or reflective.** The medallion is the reference
  implementation.
- **Never rotational, never cruciform.** Rotational and cruciform tile layouts read
  as a swastika or a cross. This has been raised and rejected repeatedly. It is not
  a taste preference.
- No tessellated bands, no mortar strips, no multi-tone tile rows as wallpaper. The
  tile tokens exist for the medallion, markers, and restrained ornament.

## Imagery

- Warm, editorial, slightly desaturated. Magazine plates, not corporate stock.
- Black and white is fine for editorial portraits. Grain in moderation.
- No HDR, no neon, no glossy gradient renders.
- Full-bleed editorial imagery is welcome on case-study and writing pages.
- If a photograph is a placeholder, leave a captioned `<figure>` slot. Do not
  improvise SVG illustrations to fill it.

**Artwork credit:** on-page credit renders **only** for scans carrying an
attribution licence (CC-BY, CC-BY-SA). Public-domain and CC0 art is credited in the
footer only. A `credit` prop means "attribution we are obligated to display," not
"attribution that would be nice."

## Iconography

Sarantium runs **no third-party icon set.** No Lucide, Heroicons, Phosphor, or icon
font. No emoji as icons. No Unicode-character icons.

An earlier set of five service icons was shelved: they read as generic geometric
primitives rather than mosaic-tile construction. If icons are needed, flag for
commission rather than reaching for a library.

## The mark

A heraldic front-facing bird, faceted, in the accent bronze. Canonical SVG in
`../assets/mark/`, native ratio roughly 1.82:1, with a PNG ladder from 16 to 1024.

Three lockups: vertical, horizontal, mark-only. Minimums: 128px lockup standard,
96px web, 16px mark-only floor. Below 16px, drop the mark and use the wordmark or
label alone.

Never stretch, rotate, recolour outside the palette, or apply effects. No gradients
on or around the mark.
