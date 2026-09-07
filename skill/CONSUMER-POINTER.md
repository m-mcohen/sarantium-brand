# Installing the pointer in a consumer repo

Claude Code only auto-discovers skills in `~/.claude/skills/` or
`<repo>/.claude/skills/`. This skill lives in `sarantium-brand` so it cannot drift
from `tokens.css`, which means each consumer needs a small pointer to make sessions
find it.

**Copy `pointer-template.md` to `<consumer>/.claude/skills/sarantium-design/SKILL.md`.**

## Why a pointer and not a copy

A copy is drift wearing a different hat. It would need syncing, nothing would gate
it, and it would go stale on the same schedule that killed the previous skill.

The pointer carries only **invariants**: rules that are not derived from token
values and so cannot fall out of step with them. The precedence order, the bans, the
motif geometry, the no-shadow rule. Everything value-derived stays in the canonical
file and is read from the vendored package.

## Keeping the pointer honest

If you find yourself wanting to add a colour value, a token value, or a
palette-dependent rule to a pointer file, that is the signal that it belongs in
`SKILL.md` in this repo instead. The pointer has one job: route the reader to canon.

## Consumers

- `sarantium-site` (sarantium.co, sarantiumventures.com, michaelcohen.bio)
- `5-day-close`
- `card-scanner`

Each vendors or installs `@sarantium/brand`, so each already has `skill/` on disk
under its dependency path. The pointer names that path.
