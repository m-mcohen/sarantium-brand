// @sarantium/brand - canonical design tokens (raw values).
// Single source of truth shared by sarantium-site, 5-day-close, card-scanner.
// CSS-side mirror: ./tokens.css (Tailwind v4 @theme + :root). Keep names parallel.
// Derived from sarantium-site/lib/brand.config.ts (Loop 2 cool palette, LOCKED 2026-05-27).

/** Raw hex primitives - the only place hex literals live. */
export const colors = {
  ground:      "#F5F0E8",
  surface:     "#FCFAEE",
  elevated:    "#EBE6DC",
  soft:        "#D8D2CA",
  ink:         "#15161A",
  body:        "#3A3A3F",
  muted:       "#5C5C60",
  border:      "#888B8E",
  bronze:      "#7A4E14",
  gold:        "#C47A3A",
  goldLine:    "#D69846",
  goldDeep:    "#9C5018",
  wine:        "#6E1F2A",
  wineLine:    "#8A2B36",
  wineDeep:    "#5E1A24",
  tile1:       "#E0DDD0",
  tile2:       "#C0BFB2",
  tile3:       "#94978D",
  tile4:       "#4F5249",
  success:     "#3F6B4A",
  successLine: "#5E8A66",
  successBg:   "#E8EEE4",
};

/** Back-compat aliases for color names already used across the repos. */
export const colorAliases = {
  champagne:     colors.ground,   // sarantium-site --bg / 5-day-close --color-paper
  paper:         colors.ground,
  text:          colors.ink,
  text2:         colors.body,     // sarantium-site --text-2
  walnut:        colors.body,     // warm-era alias, now cool
  stone:         colors.muted,
  hair:          colors.border,   // card-scanner --hair
  parchment:     colors.border,
  rule:          colors.bronze,   // card-scanner --rule (strong)
  mosaicGold:    colors.gold,
  antiqueBronze: colors.bronze,
};

/** Semantic roles consumed by components. */
export const colorRoles = {
  ground:        colors.ground,
  text:          colors.ink,
  bodyText:      colors.body,
  label:         colors.body,
  labelLight:    colors.muted,
  border:        colors.border,
  accent:        colors.gold,
  accentText:    colors.goldDeep,
  accentDeep:    colors.bronze,
  inverseGround: colors.ink,
  inverseText:   colors.ground,
  focusRing:     colors.goldDeep,
};

/**
 * Font stacks. The leading primitive is a CSS var the consuming app must
 * define via next/font/google (e.g. Cinzel({ variable: "--font-cinzel" })).
 * The fallback chain also accepts the "*-google" names sarantium-site uses.
 */
export const fonts = {
  display: 'var(--font-cinzel-google, var(--font-cinzel, "Cinzel")), Georgia, serif',
  body:    'var(--font-crimson-pro-google, var(--font-crimson, "Crimson Pro")), Georgia, serif',
  mono:    'var(--font-jetbrains-mono-google, var(--font-jetbrains, "JetBrains Mono")), ui-monospace, monospace',
};

/** CSS-var names the app should assign its next/font variable to. */
export const fontPrimitives = {
  display: "--font-cinzel",
  body:    "--font-crimson",
  mono:    "--font-jetbrains",
};

/** Type scale. Numeric sizes are px; `display` uses a fluid clamp(). */
export const typeScale = {
  display:  { size: "clamp(40px, 6vw, 72px)", lineHeight: 0.88, letterSpacing: "-0.01em" },
  h1:       { size: 42, lineHeight: 1.1,  letterSpacing: "-0.01em" },
  h1Detail: { size: 38, lineHeight: 1.1,  letterSpacing: "normal" },
  h2:       { size: 28, lineHeight: 1.15, letterSpacing: "normal" },
  h3:       { size: 22, lineHeight: 1.25, letterSpacing: "normal" },
  pull:     { size: 24, lineHeight: 1.4,  letterSpacing: "normal" },
  body:     { size: 15, lineHeight: 1.85, letterSpacing: "normal" },
  bodyLg:   { size: 17, lineHeight: 1.85, letterSpacing: "normal" },
  stat:     { size: 38, lineHeight: 1,    letterSpacing: "-0.01em" },
  eyebrow:  { size: 10, lineHeight: 1.4,  letterSpacing: "0.20em" },
  caption:  { size: 11, lineHeight: 1.4,  letterSpacing: "normal" },
  wordmark: { sm: 14, md: 18, lg: 24, xl: 36, lineHeight: 1, letterSpacing: "0.08em" },
};

/** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 scale (px). */
export const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 96 };

/** Sharp corners are a brand invariant. */
export const radius = { none: 0 };

/** Editorial-restraint motion (D12): 150ms base, sharp-out cubic-bezier. */
export const motion = {
  base:  { duration: 150, easing: "cubic-bezier(0.2, 0, 0, 1)" },
  large: { duration: 220, easing: "cubic-bezier(0.2, 0, 0, 1)" },
  fade:  { duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)" },
};

/** Layout primitives (px unless noted). */
export const layout = {
  headerHeight:    64,
  maxContent:      "1080px",
  measureProse:    "65ch",
  marginaliaWidth: 220,
  marginaliaGap:   32,
};

/** Firm-level identity. Product-specific fields stay in each app's own config. */
export const identity = {
  name:     "Sarantium",
  fullName: "Michael Cohen",
  domain:   "sarantium.co",
  siteUrl:  "https://sarantium.co",
  email:    "mcohen@sarantium.co",
  cal:      "michael-cohen",
  calUrl:   "https://cal.com/michael-cohen",
  linkedin: "https://linkedin.com/in/mmcohen",
};

export const brand = {
  colors, colorAliases, colorRoles, fonts, fontPrimitives,
  typeScale, spacing, radius, motion, layout, identity,
};

export default brand;
