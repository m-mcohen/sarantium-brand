---
name: sarantium-design
description: The Sarantium brand system - palette roles, type stack, voice and bans, composition, motion, the mark, and the mockup-round process. Use when designing or building any Sarantium surface or artifact, and before writing brand copy, choosing a colour, adding motion, or proposing a layout. Constrains design work to the brand; does not set design direction.
user-invocable: true
---

# Sarantium design (pointer)

**This is a pointer. The canonical skill lives in the `@sarantium/brand` package,
beside `tokens.css`, so the rules and the palette values can never disagree.**

## Read these now

Read the canonical files before doing brand work. In this repo they are at:

- `vendor/sarantium-brand/skill/SKILL.md` (or `node_modules/@sarantium/brand/skill/SKILL.md`)
- `.../skill/reference/voice.md` - bans and the cliché stack, before writing copy
- `.../skill/reference/composition.md` - layout, surfaces, motion, token traps
- `.../skill/reference/process.md` - the mockup-round doctrine

Palette values live in `tokens.css` in that same directory. **Never restate a hex
anywhere that persists.** The previous version of this skill hand-copied its palette
and spent nine days teaching a ramp the owner had rejected.

## Invariants (safe to state here; not derived from token values)

**Skill order.** `ui-registries` first, always. This skill constrains what comes
back; it does not set direction. `animate` owns motion values. `impeccable` is the
final audit, on demand only. Never co-author with `design-taste-frontend`.

**Copy.** No em-dashes. No emoji, no exclamation points, no hype, no drop caps.
First person plural; "I" only in solo-engagement case studies. Banned words:
synergy, leverage, transformation, world-class, helps you, fractional CFO. Banned
phrases: "we sit between", "where books and data meet", "at the moments their books
can't keep up", "the data existed, the systems existed", and any humble-craftsman
adjectival stack. Work sections show real client engagements only, never the demo
companies.

**Colour.** Propose swatches, never bare hex. Vary hue and chroma, not just
luminance. Tokenize everything; no one-off hex in components. No colour emphasis on
body copy or headings; the homepage hero inlay chips are the one sanctioned
exception and do not generalize.

**Composition.** Square corners except buttons. No shadows, no glows, no elevation
system, no `backdrop-filter: blur()`. No gradients. One ink surface per page
maximum. No third-party icon set and no emoji as icons.

**Motion.** Must carry information, scroll-triggered, reduced-motion safe. Refuse
parallax, video-on-hover, cursor effects.

**Motif.** Concentric or reflective only. Never rotational, never cruciform: those
read as a swastika or a cross and have been rejected repeatedly.

## Changing any of this

Edit the canonical files in the `sarantium-brand` repo, not here. A rule change and
its token change belong in one commit.
