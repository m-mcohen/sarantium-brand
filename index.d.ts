// Type declarations for @sarantium/brand.

export declare const colors: {
  ground: string; surface: string; elevated: string; soft: string;
  ink: string; body: string; muted: string; border: string; bronze: string;
  gold: string; goldLine: string; goldDeep: string;
  wine: string; wineLine: string; wineDeep: string;
  tile1: string; tile2: string; tile3: string; tile4: string;
  success: string; successLine: string; successBg: string;
};

export declare const colorAliases: Record<string, string>;
export declare const colorRoles: Record<string, string>;

export declare const fonts: { display: string; body: string; mono: string };
export declare const fontPrimitives: { display: string; body: string; mono: string };

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
export declare const radius: { none: number };

export interface MotionSpec { duration: number; easing: string }
export declare const motion: { base: MotionSpec; large: MotionSpec; fade: MotionSpec };

export declare const layout: {
  headerHeight: number;
  maxContent: string;
  measureProse: string;
  marginaliaWidth: number;
  marginaliaGap: number;
};

export declare const identity: {
  name: string; fullName: string; domain: string; siteUrl: string;
  email: string; cal: string; calUrl: string; linkedin: string;
};

declare const brand: {
  colors: typeof colors;
  colorAliases: typeof colorAliases;
  colorRoles: typeof colorRoles;
  fonts: typeof fonts;
  fontPrimitives: typeof fontPrimitives;
  typeScale: typeof typeScale;
  spacing: typeof spacing;
  radius: typeof radius;
  motion: typeof motion;
  layout: typeof layout;
  identity: typeof identity;
};

export default brand;
