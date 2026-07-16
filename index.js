// @sarantium/brand - canonical design tokens (raw values).
// Single source of truth shared by sarantium-site, card-scanner, 5-day-close.
// CSS-side mirror: ./tokens.css (Tailwind v4 @theme + :root). Keep names parallel.
// Mirrors sarantium-site/lib/brand.config.ts token exports EXACTLY so the site
// re-exports them losslessly. (Loop 2 cool palette, LOCKED 2026-05-27.)

/** Raw hex primitives - the only place hex literals live. */
export const colors = {
  // === Loop 2 - canonical T1-T20 (LOCKED 2026-05-27) ===
  bg:             '#F5F0E8',  // T1   Champagne ground
  text:           '#15161A',  // T2   cool ink (re-locked from warm #2D2016)
  text2:          '#3A3A3F',  // T3   close-to-ink, body
  muted:          '#5C5C60',  // T4   cool muted
  surface:        '#FCFAEE',  // T5   rise card
  elevated:       '#EBE6DC',  // T6   cool-shifted cream
  soft:           '#D8D2CA',  // T7   pale stone
  border:         '#888B8E',  // T8   cool slate hairline
  borderStrong:   '#7A4E14',  // T9   Antique Bronze emphasis
  gold:           '#C47A3A',  // T10  Mosaic Gold main
  goldLine:       '#D69846',  // T11  bright gold for 1px lines
  goldDeep:       '#9C5018',  // T12  Brick - red-leaning
  wine:           '#6E1F2A',  // T14
  wineLine:       '#8A2B36',  // T15
  wineDeep:       '#5E1A24',  // T16
  tile1:          '#E0DDD0',  // T18.C-a Range C lightest
  tile2:          '#C0BFB2',  // T18.C-b
  tile3:          '#94978D',  // T18.C-c
  tile4:          '#4F5249',  // T18.C-d Range C darkest
  tileEmphasis1:  '#D69846',  // T18.E-a Range E loud
  tileEmphasis2:  '#C47A3A',  // T18.E-b
  tileEmphasis3:  '#8A2B36',  // T18.E-c
  tileEmphasis4:  '#4A1219',  // T18.E-d
  success:        '#3F6B4A',  // restrained success green - confirmations only
  successLine:    '#5E8A66',
  successBg:      '#E8EEE4',

  // === Legacy aliases (values remapped to canonical) ===
  champagne:      '#F5F0E8',  // alias of bg
  mosaicGold:     '#C47A3A',  // alias of gold
  antiqueBronze:  '#7A4E14',  // alias of borderStrong
  ink:            '#15161A',  // COOL INK SHIFT - was '#2D2016'
  walnut:         '#3A3A3F',  // alias of text2 - was warm '#6B5440'
  stone:          '#5C5C60',  // alias of muted - was warm '#9A8570'
  parchment:      '#888B8E',  // alias of border - was '#DDD5C0'
};

/** Semantic roles consumed by components. */
export const colorRoles = {
  ground:        colors.bg,
  text:          colors.text,
  bodyText:      colors.text2,
  label:         colors.text2,
  labelLight:    colors.muted,
  border:        colors.border,
  accent:        colors.gold,
  accentText:    colors.goldDeep,       // D05 inline-link color
  accentDeep:    colors.borderStrong,
  inverseGround: colors.text,           // ink-band-bg = T19 alias of text
  inverseText:   colors.bg,             // ink-band-fg = T20 alias of bg
  focusRing:     colors.goldDeep,       // D08/D10 focus = gold-deep
};

/**
 * Font stacks. CSS-var strings; the actual font files load in the consuming app
 * (sarantium-site app/layout.tsx) via next/font/google.
 */
export const fonts = {
  // Canonical Loop 3 type stack (Cinzel display + Crimson Pro body + JetBrains Mono)
  display: 'var(--font-display)',  // = Cinzel
  body:    'var(--font-body)',     // = Crimson Pro
  mono:    'var(--font-mono)',     // = JetBrains Mono
  // Legacy aliases - same names, route through CSS-side var() to canonical.
  cinzel:   'var(--font-cinzel)',     // -> --font-display
  playfair: 'var(--font-playfair)',   // -> --font-display (headlines now Cinzel)
  sans:     'var(--font-sans)',       // -> --font-body (body now Crimson Pro)
};

/** Type scale. Numeric sizes are px; `display` uses a fluid clamp(). */
export const typeScale = {
  display:   { size: 'clamp(40px, 6vw, 72px)', lineHeight: 0.88, letterSpacing: '-0.01em' },
  h1:        { size: 42, lineHeight: 1.1,  letterSpacing: '-0.01em' },
  h1Detail:  { size: 38, lineHeight: 1.1,  letterSpacing: 'normal'   },
  h2:        { size: 28, lineHeight: 1.15, letterSpacing: 'normal'   },
  h3:        { size: 22, lineHeight: 1.25, letterSpacing: 'normal'   },
  pull:      { size: 24, lineHeight: 1.4,  letterSpacing: 'normal'   },
  body:      { size: 15, lineHeight: 1.85, letterSpacing: 'normal'   },
  bodyLg:    { size: 17, lineHeight: 1.85, letterSpacing: 'normal'   },
  stat:      { size: 38, lineHeight: 1,    letterSpacing: '-0.01em' },
  eyebrow:   { size: 10, lineHeight: 1.4,  letterSpacing: '0.20em'  },
  caption:   { size: 11, lineHeight: 1.4,  letterSpacing: 'normal'   },
  wordmark:  { sm: 14, md: 18, lg: 24, xl: 36, lineHeight: 1, letterSpacing: '0.08em' },
};

/** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 scale (px). */
export const spacing = {
  1:  4,
  2:  8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 48,
  8: 64,
  9: 96,
};

/**
 * Motion language. D12 editorial restraint (150ms base, sharp-out cubic-bezier);
 * legacy reveal/transition entries kept for components not yet migrated.
 */
export const motion = {
  base:       { duration: 150, easing: 'cubic-bezier(0.2, 0, 0, 1)' },
  large:      { duration: 220, easing: 'cubic-bezier(0.2, 0, 0, 1)' },
  fade:       { duration: 180, easing: 'cubic-bezier(0.2, 0, 0, 1)' },
  reveal:     { duration: 600, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' },
  transition: { duration: 300, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' },
};

/** Layout primitives (px unless noted). */
export const layout = {
  headerHeight:    64,        // px - mirrors --header-h in globals.css
  maxContent:      1080,      // px - mirrors --max-content
  measureProse:    '65ch',
  marginaliaWidth: 220,       // px
  marginaliaGap:   32,        // px
};

/** Firm-level identity. Product-specific fields stay in each app's own config. */
export const identity = {
  name: 'Sarantium',
  fullName: 'Michael Cohen',
  tagline: 'Stronger finance and operations through data strategy and automation.',
  domain: 'sarantium.co',
  siteUrl: 'https://sarantium.co',
  email: 'contact@sarantium.co',
  cal: 'michael-cohen',
  calUrl: 'https://cal.com/michael-cohen',
  location: 'Ft. Lauderdale, FL',
  linkedin: 'https://www.linkedin.com/company/sarantium/',
};

export const brand = {
  colors, colorRoles, fonts, typeScale, spacing, motion, layout, identity,
};

export default brand;
