# Changes and debugging

Fix the fault where it starts, and leave the design simpler than you found it.

## Debugging

- The root cause is the first place the system did something it should not, or failed to handle a state it should. The symptom is only where that became visible.
- Ask whether the state that broke the code is legitimate. If it is, handle it where it broke. If it is not, find what produced it. Guards, retries, swallowed errors, clamped values, and fallback defaults are the usual ways to hide a bug.
- Instrument when stuck: read the actual error, the log, the stored state.
- After a fix, search for the same fault elsewhere and fix every instance.
- When the deciding fact took a deep dig to find, propose the cheap always-on signal (a log field, a metric, a status) that would have shown it at first look.

## Changing the design

- Integrate a new requirement as if it had been there from the start. Propagate it through types, docs, and tests, then deliver it in small steps.
- Remove dead code, stale validators, and unused options before building on top of them.
- Design for observed usage. Validation belongs at boundaries the data actually crosses.
- Replace an internal API in one change: inventory its callers, migrate them, and delete the old API. A temporary adapter needs a named removal step.
- For a mechanical change across many files, write a codemod or script first and run it, instead of editing each file by hand. When the work is split across subagents, hand each the same tool.
- **Public contracts are the exception.** An API, protocol, or published package with callers outside the repo stays compatible; version a breaking change instead of deleting the old path. The project's `CLAUDE.md` names its public contracts.

## Repeated mistakes

When the same correction comes up twice, make the mistake impossible (a type, lint rule, test, or hook) instead of writing another instruction. Suggest `/correct` to the user; only they can run it.

Adapted from pstack (MIT), see `.claude/LICENSE-pstack`.

## In this repo

- The public contracts are post URLs `/blog/<id>/`, `/rss.xml`, and the sitemap. `<id>` is the post's file name in `src/content/blog/`, so renaming a file changes its URL.
- The blog index, the post pages, and the feed all read posts through `getPosts()` in `src/lib/posts.ts`. Fix ordering or draft filtering there, not per page.
- Absolute URLs derive from `site` in `astro.config.mjs` through `Astro.site` or `context.site` (`Layout.astro`, `index.astro`, `rss.xml.ts`). Do not hardcode the domain.
