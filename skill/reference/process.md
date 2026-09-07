# Design process

How design changes get decided on Sarantium surfaces. This doctrine predates this
skill; it is recorded here because it was previously carried only by a retired
skill file and by prose references pointing at it.

## The failure this replaces

The owner describes a visual intent in words. Claude generates options. The
direction is wrong. Repeat.

Words are a lossy medium for spatial and parametric adjustment. Every channel below
replaces a verbal description with direct manipulation or direct pointing.

## Routing: which channel for which decision

| Decision | Channel |
|---|---|
| What sections exist, in what order, which layout | **Mockup round, 3+ options** |
| A parametric round of 3+ options to compare | **Design cockpit presets** |
| How big, how much space, which shade, which weight | **Design cockpit** (drag the token) |
| Move this, tighten this, this specific element | **VisBug** on the preview, send screenshot plus changes |
| "This thing here should be quieter" (async) | **Vercel toolbar comment** pinned to the element |
| Real-time back-and-forth on the live page | **Co-piloting session** |

**Structural decisions keep the mockup doctrine. Parametric decisions go to the
cockpit.** Routing a structural question to a slider, or a spacing nudge to a mockup
round, wastes the tool and the reviewer's attention.

## The mockup round

For structural decisions, before any production code:

1. **Three or more options, and they must be genuinely distinct positions,** not
   variants of one idea with the padding changed. If all three could be produced by
   moving one slider, it is a cockpit decision, not a mockup round.
2. **Browser-openable HTML**, no build step, in a dated folder:
   `mockups/<topic>-<YYYY-MM-DD>/`.
3. **Real brand fonts**, not fallbacks. A mockup set in a system serif is not
   showing the decision being asked about.
4. **Real tokens.** Mockups read a generated token file, never a hand-copied
   palette. In `sarantium-site` this is `mockups/_tokens.css`, produced by
   `scripts/build-mockup-tokens.mjs`. Outside a repo, use this skill's `brand.css`.
   Both exist for the same reason: a hand-copied file carries a promise to mirror
   the tokens exactly, and that is a promise no hand-copied file can keep.
5. **Restraint counts as a valid option.** "Do less than the current design" is a
   legitimate position and should appear in rounds where it is plausible. A round of
   three maximalist options is a round of one.
6. **Decided together.** Present, do not pick.

## The design cockpit

A live token instrument panel built into `sarantium-site`. It enumerates every
design token in the live cascade and gives each one a control: colour pickers for
hexes, sliders for lengths and durations, endpoint sliders for fluid `clamp()`
tokens, text fields for composites.

- Summon on `localhost` or any preview deployment: append `?design=1`, or press
  Ctrl+Shift+D. Dismiss with `?design=0` or the same chord.
- The three production hosts never render it, and the panel code does not download
  unless activated.
- **Snapshots** are the "three options on one URL" mechanism for parametric
  decisions. Name an override set, save it, apply another.
- Overrides apply as inline styles on the root element and persist in
  `localStorage`. **Nothing is written to code.** A cockpit session ends with a
  decision to implement, not an implementation.

## Colour proposals

Whenever a new colour is on the table:

- **Propose swatches, never bare hex.** A hex in a chat message is not a proposal, it
  is a number.
- **Vary hue and chroma, not just luminance.** A ramp that only changes lightness is
  one colour presented three times.
- **Measure before proposing.** The brand's accent ramp was replaced on measured
  grounds: APCA contrast against the body target, and proximity to the AI-orange
  reference point. New candidates get the same treatment.
- **Tokenize before shipping.** No one-off hex values in components, ever.

## After a decision ships

- Update `tokens.css` in this repo. It is the single source of truth, and it feeds
  every consumer.
- Run `npm run skill:build` and commit the regenerated `brand.css`. CI fails if you
  forget.
- If the decision changes a rule rather than a value, update `SKILL.md` or the
  relevant reference file **in the same commit**. Colocation is the whole reason
  this skill lives here; a rules change that lags its value change reintroduces
  exactly the drift this arrangement exists to prevent.
