// Type declarations for @sarantium/brand.
// Mirrors sarantium-site/lib/brand.config.ts token exports.

export declare const colors: {
  bg: string; text: string; text2: string; muted: string;
  surface: string; elevated: string; soft: string;
  border: string; borderStrong: string;
  gold: string; goldLine: string; goldDeep: string;
  oninkAccent: string; oninkAccentHover: string;
  wine: string; wineLine: string; wineDeep: string;
  tile1: string; tile2: string; tile3: string; tile4: string;
  tileEmphasis1: string; tileEmphasis2: string; tileEmphasis3: string; tileEmphasis4: string;
  success: string; successLine: string; successBg: string;
  champagne: string; mosaicGold: string; antiqueBronze: string;
  ink: string; walnut: string; stone: string; parchment: string;
};

export declare const colorRoles: {
  ground: string; text: string; bodyText: string; label: string; labelLight: string;
  border: string; accent: string; accentText: string; accentDeep: string;
  inverseGround: string; inverseText: string; focusRing: string;
};

export declare const fonts: {
  display: string; body: string; mono: string;
  cinzel: string; playfair: string; sans: string;
};

export interface TypeSpec {
  size: string | number;
  lineHeight: number;
  letterSpacing: string;
}
export interface WordmarkSpec {
  sm: number; md: number; lg: number; xl: number;
  lineHeight: number; letterSpacing: string;
}
export declare const typeScale: {
  display: TypeSpec; h1: TypeSpec; h1Detail: TypeSpec; h2: TypeSpec; h3: TypeSpec;
  pull: TypeSpec; body: TypeSpec; bodyLg: TypeSpec; stat: TypeSpec;
  eyebrow: TypeSpec; caption: TypeSpec; wordmark: WordmarkSpec;
};

export declare const spacing: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, number>;

export interface MotionSpec { duration: number; easing: string }
export declare const motion: {
  base: MotionSpec; large: MotionSpec; fade: MotionSpec;
  reveal: MotionSpec; transition: MotionSpec;
};

export declare const layout: {
  headerHeight: number;
  maxContent: number;
  measureProse: string;
  marginaliaWidth: number;
  marginaliaGap: number;
};

export declare const identity: {
  name: string; fullName: string; tagline: string; domain: string; siteUrl: string;
  email: string; cal: string; calUrl: string; location: string; linkedin: string;
};

declare const brand: {
  colors: typeof colors;
  colorRoles: typeof colorRoles;
  fonts: typeof fonts;
  typeScale: typeof typeScale;
  spacing: typeof spacing;
  motion: typeof motion;
  layout: typeof layout;
  identity: typeof identity;
};

export default brand;
