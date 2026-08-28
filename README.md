# @sarantium/brand

Canonical Sarantium design tokens — one source of truth for the **palette,
type scale, spacing, motion, layout, and brand textures** shared across:

- `sarantium-site` (the firm site)
- `5-day-close` (productized engagement site)
- `card-scanner` (the PWA)

These surfaces had drifted into three hand-maintained copies of the same
tokens. This package replaces the copies. Change a color here, every surface
moves together.

Register: **Loop 2 cool palette** (champagne ground, cool ink, mosaic gold +
wine accents, sharp corners, hairline borders, flat) with **Cinzel** (display),
**Crimson Pro** (body), and **JetBrains Mono** (mono). Locked 2026-05-27.

## What's in the box

| File | What it is |
|---|---|
| `tokens.css` | Tailwind v4 `@theme` (color + font utilities) plus a `:root` block of extended tokens (type scale, spacing, motion, layout, textures) and back-compat aliases. |
| `index.js` / `index.d.ts` | The same tokens as a typed JS object, for non-CSS consumers (PDF renderers, inline styles, server code). |

## Install

These repos are siblings under `C:\Projects`, so the lowest-friction option is
the local `file:` protocol — no registry, no publish, no cost:

```jsonc
// each consumer's package.json
"dependencies": {
  "@sarantium/brand": "file:../sarantium-brand"
}
```

Then `npm install`. Alternatively, once pushed to GitHub:

```jsonc
"@sarantium/brand": "github:m-mcohen/sarantium-brand"
```

## Use

**1. CSS (Tailwind v4).** In each app's `globals.css`, import the tokens right
after Tailwind:

```css
@import "tailwindcss";
@import "@sarantium/brand/tokens.css";
```

You now get utilities (`bg-ground`, `text-ink`, `text-gold`, `border-border`,
`font-display`, `font-mono`, …) and every extended token as a CSS var
(`var(--fs-h1)`, `var(--space-5)`, `var(--m-easing)`, `var(--texture-byzantine)`).

**2. Fonts.** The package can't load fonts (that's app-specific via
`next/font`). Each app loads the three families and assigns the CSS vars the
`--font-*` tokens look for:

```ts
import { Cinzel, Crimson_Pro, JetBrains_Mono } from "next/font/google";
const cinzel    = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const crimson   = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
// put cinzel.variable, crimson.variable, jetbrains.variable on <html>
```

The `--font-*` fallback chain also accepts the `--font-cinzel-google` style
names `sarantium-site` already uses, so no rename is forced there.

**3. JS / TS.** For values you need outside CSS (e.g. the Playwright HTML→PDF
renderers, or inline styles):

```ts
import { colors, typeScale, fonts } from "@sarantium/brand";
const gold = colors.gold;            // "#C47A3A"
const h1   = typeScale.h1.size;      // 42
```

## Token reference (summary)

- **Palette:** `ground #F5F0E8` · `surface #FCFAEE` · `elevated #EBE6DC` ·
  `soft #D8D2CA` · `ink #15161A` · `body #3A3A3F` · `muted #5C5C60` ·
  `border #888B8E` · `bronze #574425` · `gold #A4885B` · `goldLine #9A7D4E` ·
  `goldDeep #6C542D` · `wine #6E1F2A` · `wineLine #8A2B36` · `wineDeep #5E1A24` ·
  `oninkAccent #CDB284` · `oninkAccentHover #BAA176` ·
  `tile1-4` · `success/-line/-bg`.
- **Type:** display/h1/h1Detail/h2/h3/pull/body/bodyLg/stat/eyebrow/caption/wordmark.
- **Spacing:** `1..9` → 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px.
- **Motion:** base 150ms · large 220ms · fade 180ms · `cubic-bezier(0.2,0,0,1)`.
- **Layout:** header 64px · maxContent 1080px · measure 65ch · marginalia 220/32px.
- **Textures:** `--paper-grain`, `--texture-byzantine`.

### 0.3.0 — the accent ramp moves to statuary bronze (D14/D15)

`bronze` / `gold` / `goldLine` / `goldDeep` changed, and `oninkAccent` /
`oninkAccentHover` are new. This is a **visible** change for every consumer:
the amber-gold accent becomes a low-chroma bronze at OKLCH hue ~78.

Two measured defects forced it. The old `gold #C47A3A` scored 18.7 on
orange-proximity to #D97757 — the highest of any colour in the system, and that
family is rejected. The old `goldDeep #9C5018`, the colour of every inline link,
measured APCA Lc 70.3 against a 75 body target; it failed on its own. The new
`goldDeep #6C542D` measures Lc 76.1 and passes. Full rationale and the measured
table are in `tokens.css` beside the tokens.

It shipped in sarantium-site on 2026-08-06 scoped to one brand, which quietly
left michaelcohen.bio on the rejected ramp. Promoting it here is what stops the
two from diverging again.

**Consumers that have NOT verified against this** (card-scanner, 5-day-close)
can pin the previous ramp by re-declaring the four tokens in their own `:root`
after the `tokens.css` import:

```css
:root {
  --border-strong: #7A4E14;
  --gold:          #C47A3A;
  --gold-line:     #D69846;
  --gold-deep:     #9C5018;
}
```

sarantiumventures.com does exactly that, to keep the separate bronze it chose
in July.

## Adoption notes (not yet wired into consumers)

This package is **created but not yet consumed** — wiring each app is a separate
step (it touches three other repos):

- **`card-scanner`** — already on this exact cool palette + font stack. Adopting
  the package is a near-no-op rename; lowest risk, do first.
- **`sarantium-site`** — same cool palette. Its `lib/brand.config.ts` is the
  richest existing source and matches these values; migrate it to re-export from
  here so the hand-maintained copy goes away.
- **`5-day-close`** — on the **older warm v1.0** (`ink #2d2016`, Source-Serif /
  Inter placeholders). Adopting the package is a deliberate, **visible** change
  (warm→cool ink + Cinzel/Crimson/JetBrains swap). Its config already anticipates
  this ("a future shared package … is trivial"). Do this one last and eyeball it.

Component classes (`.card`, `.btn-primary`, `.eyebrow`, …) intentionally stay in
each app — they legitimately differ per surface. This package is tokens only.
