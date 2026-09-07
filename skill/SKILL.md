---
name: sarantium-design
description: The Sarantium brand system - palette roles, type stack, voice and bans, composition, motion, the mark, and the mockup-round process. Use when designing or building ANY Sarantium surface (sarantium.co, sarantiumventures.com, michaelcohen.bio, 5-day-close, card-scanner) or any Sarantium artifact (slides, one-pagers, OG images, marketing PDFs, throwaway mockups). Use before writing brand copy, choosing a colour, adding motion, or proposing a layout. Constrains design work to the brand; does not set design direction.
user-invocable: true
---

# Sarantium design system

Canonical. This file lives in `sarantium-brand` beside `tokens.css`, the palette's
single source of truth, so the rules and the values move in one commit and cannot
disagree.

## Where this sits in the skill order

This is a **constraint layer, not a taste layer.** It never sets design direction
and never competes with a design skill. Two style-prescribers produce mush.

1. **`ui-registries` runs FIRST, always.** Search `@shadcnblocks`, `@react-bits`,
   `@shadcn-studio`, `@shadcn` before writing any component by hand. A shipped
   component beats prompt-level taste.
2. **This skill constrains what comes back** to Sarantium's palette, type, voice
   and composition. It tells you what the brand forbids, not what to make.
3. **`animate` owns motion values** exclusively. This skill names the motion
   tokens and the brand's motion doctrine; `animate` picks curves and durations
   inside those bounds.
4. **`impeccable` is the final audit,** invoked deliberately, on demand only.

Never run this alongside `design-taste-frontend` as co-authors. On an existing
Sarantium surface, skip direction-setting entirely: registries, build, audit.

## The one rule that keeps this file honest

**This file states no hex values. Ever.** It teaches roles and token names.

That is not fastidiousness, it is the lesson of the artifact this replaces. The
retired `sarantium-design` skill hand-copied its palette. It resynced 2026-08-19.
D14 moved the accent ramp 2026-08-28. On 2026-09-03 the skill still taught the two
values D14 existed to eliminate, and any session trusting it would have painted new
work in the ramp the owner had rejected. Nine days.

So:

- **Building inside a repo that installs `@sarantium/brand`?** Use the token names.
  Never write a literal colour into a component. If you need to know a value, read
  `tokens.css`; do not restate it anywhere that persists.
- **Building an artifact outside a repo** (slide, OG image, one-pager, throwaway
  HTML)? Link or inline **`brand.css`** next to this file. It is generated from
  `tokens.css`, stamped with its source commit, and gated in CI. Never hand-type a
  palette into an artifact.
- **Proposing a new colour?** Propose **swatches, never bare hex.** Vary hue and
  chroma, not just luminance. Tokenize the result before it ships.

## Palette, by role

Read values from `tokens.css`. These are the roles and the constraints on them.

**Ground and text**

| Role | Token | Constraint |
|---|---|---|
| Page ground | `--bg` | Champagne. Never pure white. |
| Card / panel | `--surface` | One step warmer than the ground. |
| Quote / callout | `--elevated` | Tiered and secondary sections. |
| Primary text, dark surfaces | `--text` | Cool near-black. Never pure black. |
| Body copy | `--text-2` | |
| Eyebrows, captions | `--muted` | Cool. Never a warm grey. |
| Hairline | `--border` | Cool slate. |

**The accent ramp (D14, "statuary bronze")**

Four steps, and they are **not interchangeable.** The ramp moved off the old amber
family for two measured reasons: the old accent scored the highest orange-proximity
in the system to the AI-orange reference point, and the old link colour failed its
own APCA body target. Both had one cause: warm hue, high chroma, too light.

| Token | Job | Hard limit |
|---|---|---|
| `--gold` | Decorative only | Does **not** carry text. |
| `--gold-line` | 1px rules, card hover | Does **not** carry text. |
| `--gold-deep` | **Links and accent text** | The **only** step that passes APCA for body. |
| `--border-strong` | Strong rules, focus | |
| `--onink-accent` | Accent on a **dark** ground | The bronze reads on champagne and fails on ink. Dark chrome uses this, never `--gold-line`. |

If accent exceeds roughly 10% of a surface, something is wrong.

**Wine** (`--wine`, `--wine-line`, `--wine-deep`) is a co-accent. Pair it with gold;
never use it alone, and never introduce a third accent colour.

**Mosaic tiles** (`--tile-1` through `--tile-4`) are for the medallion, section
markers, and restrained ornament. The **emphasis** variants (`--tile-emphasis-1`
through `-4`) contain the rejected amber and are scoped to decorative case-study
covers only. They never touch text.

**Banned:** saturated primaries, cool greys as UI grey (use `--muted`), gradients
anywhere, and any colour that resolves into the AI-orange family.

## Type

Three families, one job each. Locked 2026-05-27.

- **Cinzel** (`--font-display`) - all headlines, display, wordmark. Roman caps. No
  italic, no lowercase glyphs.
- **Crimson Pro** (`--font-body`) - body, prose, H3, pull quotes. Italic preserved.
- **JetBrains Mono** (`--font-mono`) - eyebrows, nav, stat labels, micro-labels,
  table headers, code.

Playfair Display and DM Sans are dead. Legacy aliases (`--font-playfair`,
`--font-sans`) resolve to Cinzel and Crimson Pro; nothing new should reach for them.

Scale tokens are `--fs-*` / `--lh-*` / `--ls-*`. Prefer the named scale over an
ad-hoc `clamp()`.

## Colour emphasis: the rule and its one exception

**No colour emphasis on body copy or headings.** Emphasis comes from italic, scale,
or weight, in ink.

The single sanctioned exception is the **homepage hero**, where accent phrases sit
on coloured inlay chips: gold for *finance* and *operations*, wine for *data
strategy* and *automation*. It is an explicit owner override, scoped to the hero,
implemented as `.hero-tessera` wrapping `.hero-tessera-fill`.

**Do not generalize it.** The retired skill promoted this exception into a general
"one tessera per headline, two if paired" device that never existed. There is no
headline tessera convention. There is one hero, and it is locked.

## Voice

Full rules, bans, and the cliché stack: **`reference/voice.md`.** Read it before
writing any brand copy. The short version:

- Declarative, specific, compressed. The brand **does** the thing; it never "helps
  you" do anything.
- First person plural. "I" only inside a solo-engagement case study.
- **No em-dashes.** No emoji. No exclamation points. No hype. No drop caps.
- Numbers prove the point; copy does not oversell.
- Banned words and banned *phrases* both. The phrase bans matter more, because they
  are the clichés a model reaches for precisely when told to avoid the words.

## Composition and motion

Full rules: **`reference/composition.md`.** The load-bearing ones:

- **Two container tiers, deliberately.** `--content-measure` for text,
  `--max-content` for wide stat bands. Not one or the other.
- **Corners are square.** Radius appears on buttons and nowhere else.
- **Shadows do not exist.** Depth comes from hairlines, ink surfaces, tone shifts
  and whitespace. No glows, no elevation system, no `backdrop-filter: blur()`.
- **One ink surface per page maximum.** Two consecutive dark sections read as
  wallpaper.
- **Motion must carry information,** be scroll-triggered, and be reduced-motion
  safe. Refuse parallax, video-on-hover, and cursor effects. Motion tokens are
  `--m-easing`, `--m-duration-base` / `-large` / `-fade`, `--dur-reveal`,
  `--ease-out-cubic`.
- **Brand motif geometry stays concentric or reflective.** Never rotational, never
  cruciform. Rotational and cruciform mosaic layouts read as a swastika or a cross
  and have been rejected repeatedly. This one is not negotiable.

## Reading tokens.css correctly

Two traps, both real, both documented in `reference/composition.md`:

1. **`tokens.css` labels some decisions "canonical" and others "banked," and the
   labels have drifted from what shipped.** Bracketed nav is filed as a banked
   alternate and is live. The D04 button vocabulary is filed as canonical and is
   almost entirely unconsumed. **Live CSS wins over the token file's own labels.**
2. **`--color-ink` is not a stable ink primitive.** It is declared once as a literal
   and then redefined as `var(--ink)`, which chains to `--text`. The later
   declaration wins, so anything pinned to it follows the text token. Use
   `--color-ground` (safe) or pin a literal, as `sarantium-site` does.

## Process

Full doctrine: **`reference/process.md`.** In short: structural decisions get a
**mockup round of three or more genuinely distinct positions**, not variants of one
idea, browser-openable, with the real brand fonts, decided together before any code.
**Restraint counts as a valid option.** Parametric decisions (how big, which shade,
how much space) do not get a mockup round; they go to the design cockpit.

## Assets

- `assets/mark/` - the heraldic bird mark. Canonical SVG plus a PNG ladder from 16
  to 1024. Never stretch, rotate, recolour outside the palette, or apply effects.
  Below 16px, drop the mark and use the wordmark alone.
- `brand.css` - generated drop-in stylesheet for out-of-repo artifacts. Do not edit;
  run `npm run skill:build`.

Sarantium runs **no third-party icon set.** No Lucide, no Heroicons, no Phosphor, no
icon font, no emoji as icons. If an icon is needed, flag it for commission.

## When invoked with no further direction

Ask what is being built (surface or artifact), for whom (PE operating partners,
small-business owners, internal), and which states are genuinely needed. A marketing
artifact rarely needs loading, empty, and error states. Then constrain the work to
the rules above, and search the registries before building anything by hand.
