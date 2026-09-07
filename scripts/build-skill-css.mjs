#!/usr/bin/env node
/*
 * FILE: scripts/build-skill-css.mjs
 * PURPOSE: Generate skill/brand.css from tokens.css so the design skill can
 *          hand a drop-in stylesheet to artifacts built OUTSIDE a consumer repo
 *          (slides, OG images, one-pagers, throwaway mockups) without anyone
 *          hand-copying a hex.
 *
 * WHY THIS EXISTS. The retired sarantium-design skill kept a hand-copied
 * palette. It resynced 2026-08-19; D14 moved the accent ramp on 2026-08-28; by
 * 2026-09-03 it still taught --gold #C47A3A and --gold-deep #9C5018 - precisely
 * the two values D14 existed to eliminate. Nine days. The same class of bug had
 * already been diagnosed one layer in by sarantium-site's build-mockup-tokens.mjs:
 * a hand-copied file comes with a promise to mirror tokens.css exactly, and that
 * is "a promise no hand-copied file can keep."
 *
 * WHAT IS DIFFERENT HERE. sarantium-site's PR #106 built this same machinery,
 * but it lived in the site repo and wrote into ~/.claude/skills/ - outside every
 * repo, so no CI could gate it. Here the generator, its source, and its output
 * are three files in ONE repo. The check is local, cheap, and real.
 *
 * USAGE
 *   npm run skill:build    rewrite skill/brand.css from tokens.css
 *   npm run skill:check    report drift, exit 1, write nothing
 *
 * THE TRANSFORM IS DELIBERATELY DUMB. It rewrites the `@theme {` wrapper to
 * `:root {` (Tailwind's @theme only registers custom properties; outside a
 * Tailwind build they need to be plain custom properties) and prepends a
 * provenance header plus the Google Fonts import. It does NOT reorder, resolve,
 * prune, or rename anything. Every hex in the output is the hex in tokens.css,
 * in tokens.css's own order, because any cleverness here is hand-copying
 * wearing a script.
 *
 * ONE FAITHFULLY REPRODUCED TRAP. tokens.css declares --color-ink: #15161A in
 * @theme, then redefines it as var(--ink) -> var(--text) in the legacy-alias
 * block. The later declaration wins, so --color-ink follows the TEXT token and
 * is not a stable ink primitive. The output reproduces this exactly, because it
 * is what consumers actually resolve. skill/reference/composition.md documents
 * it; do not "fix" it here.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'tokens.css')
const OUT = join(ROOT, 'skill', 'brand.css')

/* The three families, in the weights the brand actually uses. Font FAMILIES are
   not a drift risk the way hexes are - they have changed once in the life of the
   brand (the 2026-05-27 lock) and a change would be a headline event, not a
   quiet ramp shift. They live here rather than in tokens.css because tokens.css
   deliberately does not load fonts: consumers load them via next/font. A
   standalone HTML artifact has no next/font, so it needs this line. */
const FONTS =
  "@import url('https://fonts.googleapis.com/css2?" +
  'family=Cinzel:wght@400;500;600;700&' +
  'family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400&' +
  'family=JetBrains+Mono:wght@400;500&' +
  "display=swap');"

/** Short commit that last touched tokens.css, or a marker when git is unavailable. */
function sourceCommit() {
  try {
    return execFileSync('git', ['log', '-1', '--format=%H', '--', 'tokens.css'], {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim() || 'unknown'
  } catch {
    return 'unknown (no git)'
  }
}

/**
 * Build the stylesheet text.
 * Normalizes to LF so the checked-in file and a CI regeneration compare equal
 * regardless of the platform's checkout settings (this repo is authored on
 * Windows with CRLF and gated on Linux).
 */
export function build() {
  const src = readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n')

  // Hash the SOURCE, not the output: it answers "which tokens.css is this?"
  // even if the header format below ever changes.
  const digest = createHash('sha256').update(src).digest('hex').slice(0, 12)

  if (!src.includes('@theme {')) {
    throw new Error(
      'tokens.css no longer contains an "@theme {" block. The transform in ' +
        'scripts/build-skill-css.mjs assumes one. Re-read tokens.css and update ' +
        'this script deliberately rather than loosening the check.'
    )
  }

  const header = `/*
 * GENERATED FILE - DO NOT EDIT.
 *
 * Regenerate with:  npm run skill:build
 * Verify with:      npm run skill:check
 *
 * Source:        tokens.css
 * Source commit: ${sourceCommit()}
 * Source sha256: ${digest}
 *
 * Edits made here are silently destroyed on the next build and, worse, will
 * teach a wrong palette in the meantime. Change tokens.css and rebuild.
 *
 * WHAT THIS IS FOR. Artifacts built outside a consumer repo - slides, OG
 * images, one-pagers, throwaway HTML mockups - have no @sarantium/brand
 * install and no Tailwind build. Link or inline this file and every brand
 * token resolves. Inside a repo that already imports @sarantium/brand, do NOT
 * use this file; import the package.
 *
 * The "@theme" wrapper in tokens.css has been rewritten to ":root" so the
 * custom properties register without a Tailwind build. Nothing else is
 * changed: same values, same order, same comments.
 */
${FONTS}

`

  // String replace, not a regex over the block: the wrapper is the only thing
  // being changed, and the block's contents include SVG data URIs that a
  // brace-matching regex would be one edge case away from mangling.
  return header + src.replace('@theme {', ':root {')
}

function main() {
  const mode = process.argv[2] === '--check' ? 'check' : 'build'
  const next = build()

  if (mode === 'check') {
    let current = ''
    try {
      current = readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n')
    } catch {
      console.error('skill:check FAILED - skill/brand.css does not exist.')
      console.error('Run `npm run skill:build` and commit the result.')
      process.exit(1)
    }
    if (current !== next) {
      console.error('skill:check FAILED - skill/brand.css is stale.')
      console.error('tokens.css has changed since brand.css was generated.')
      console.error('Run `npm run skill:build` and commit the result.')
      process.exit(1)
    }
    console.log('skill:check OK - brand.css matches tokens.css.')
    return
  }

  writeFileSync(OUT, next, 'utf8')
  console.log(`skill:build wrote ${OUT}`)
  console.log(`  source commit ${sourceCommit()}`)
}

main()
