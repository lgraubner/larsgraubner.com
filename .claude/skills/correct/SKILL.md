---
name: correct
description: Make the mistakes agents keep repeating impossible, with architecture, types, lint, or tests before prose.
disable-model-invocation: true
license: MIT, adapted from pstack by Lauren Tan; see .claude/LICENSE-pstack
---

# Correct

The operator keeps correcting agents in this repo for the same mistakes. Change the repo so the next agent can't make them.

Assume every contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. Design the repo so a change that looks right from one file is right for the whole repo.

## Find the mistake classes

First, read recent commits, reverts, review comments, agent instruction files, comments that explain workarounds, and past agent sessions (Claude Code keeps them as JSONL under `~/.claude/projects/`): look for repeated corrections, re-explained context, and manual interventions. Group the mistakes into classes. A class counts once it has happened twice.

## Fix each class at the highest level that works

1. **Eliminate it with architecture.** Give each piece of state one owner and each task one supported way. Hide internals so the wrong import fails. Replace hand-synced lists with one source of truth. Delete old ways and dead code an agent would copy.
2. **Enforce it with types so the bad state can't be written.** If bad code still compiles, add a lint or CI check whose error names the file, type, or function to use instead. If the pattern is already common, fail only when a change adds more.
3. **Test the behavior.** Fix or delete any test that still passes when the behavior it checks breaks, or that fails when only the internals change.
4. **Write agent rules last, only for judgment calls.** Nothing fails when an agent skips them. Prefer a rule (`CLAUDE.md` or a path-scoped rule) over a skill: a rule loads whenever its scope applies, a skill only when the agent picks it.

## Fix and prove

Then fix the most frequent classes now, one commit each. Prove each new check fails on a real past mistake. Run the same command locally and in CI. An exception is a suppression on the offending line that names its reason, an expiry date, and the approving human. `/no-comments` keeps it until it expires.

## Prune the prose

Last, delete every instruction in `CLAUDE.md`, rules, and skills that a new check now enforces. A class that repeated although a prose rule covered it shows the prose failed: fix it at a higher level, not with a sharper sentence.

**Reply:** each class with its evidence, the level you picked, and why a higher level didn't work.
