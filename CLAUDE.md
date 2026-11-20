# larsgraubner.com

Personal website and blog of Lars Graubner: a static Astro site with Tailwind CSS, deployed from `main` by the Deploy job in `.github/workflows/ci.yml` once the checks pass. Read `GLOSSARY.md` for the domain language.

## Working

- When a step doesn't need my input, keep going. Put status notes in the same message as your next action.
- A bug report, a question, or a design discussion is an investigation: it ends with the cause and the change you propose. Edit files once I ask for the change or to ship it.
- Stop and ask only when you can't continue without me, or before anything destructive: deleting data, force-pushing, publishing, or changing anything outside this repository. A push to `main` deploys the site. Ask with `AskUserQuestion`, so the session shows it is waiting.
- Before asking which approach to take, check whether running something can answer it: behavior, timing, output, or performance. If it can, try it and let the result decide. Ask only for product or preference calls no experiment settles.
- Before writing code, take the first that works: no code (the need is speculative), code already in this repo, the standard library, a platform feature, an installed dependency, then the minimum new code.
- Give your real judgment. Push back or say that something does not earn its place when that is true; agreement is not the default.
- Back each claim with its evidence, or label it as measured, inferred, or a guess. Run any check you could run yourself instead of handing it to me.

## Development

Start the dev server in background mode:

```sh
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Astro docs: https://docs.astro.build. Consult the matching guide before working on [routing](https://docs.astro.build/en/guides/routing/), [components](https://docs.astro.build/en/basics/astro-components/), [content collections](https://docs.astro.build/en/guides/content-collections/), or [styling](https://docs.astro.build/en/guides/styling/).

## Conventions

One home per kind of code, and the file to copy when adding one:

```
src/
  pages/                one file per route, rendered inside layouts/Layout.astro, follow legal-notice.astro
    blog/[id].astro     the post page; the post's file name sets /blog/<id>/
    rss.xml.ts          the feed
  layouts/Layout.astro  the one layout: head and meta tags, nav, footer
  components/           UI shared across pages, follow Link.astro
  content/blog/         posts as Markdown; unfinished posts set `draft: true`
  content.config.ts     the frontmatter schema of the blog collection
  lib/                  helpers that render nothing, follow posts.ts
  styles/global.css     the Tailwind entry and the styles of rendered post Markdown
  assets/               fonts and images that Astro processes
public/                 files served as they are
```

Import everything under `src/` with `@/`, files in the same folder too; relative imports only outside `src/`. Nothing imports from `src/pages/`: a route shares code through `src/components/` or `src/lib/`. `eslint/no-restricted-imports` enforces both.

Post lists go only through `getPosts()` in `src/lib/posts.ts`, which filters drafts and sorts: the blog index, the post pages, and the feed all read it.

Agents extend the patterns they see, so treat every pattern you add as one that will be copied:

- Split a file once it holds several concerns. Agents keep appending to the largest file in reach.
- Enforce module boundaries through the import graph (lint rules, package exports, separate packages), not through prose.
- A workaround, or a comment explaining one, is a pattern too: the next agent copies it. Fix the cause instead.
- When a bad pattern already exists, add a lint rule that fails only on new instances first, then clean up the existing ones.

## Boundaries

Untrusted data is parsed once, where it enters, into a named domain type:

| Boundary         | Parser                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| Post frontmatter | zod schema of the `blog` collection in `src/content.config.ts`; the build fails on an invalid post |

- Hand the parsed value on, not the raw input. Code behind the boundary takes the domain type and does not validate again.
- Expose domain types across a boundary, not the transport, storage, or wire types behind it.
- Resolve an `as` cast by finding the boundary it skips and parsing there. A cast is right only for a fact the type system cannot express, after validation.

Public contracts with outside callers (links, feed readers, search engines) stay stable: post URLs `/blog/<id>/` (the post's file name, always with a trailing slash), `/rss.xml`, and the sitemap. Renaming a post file breaks its links and feed entries.

## Types

Make the compiler reject impossible states.

- Model variants as a discriminated union, not as a bag of optional fields. If a comment explains when a combination of fields is valid, split it into a union.
- Give each lifecycle one status field with a literal union instead of a second boolean that must stay in sync with the first.
- Prefer a lookup table or a `satisfies Record<Union, …>` map over an if/else chain that grows by one branch per feature.
- In `.astro` frontmatter, end every `switch` over a union with an exhaustive `never` check. Type-aware lint checks `.ts` files only.
- Keep the plain type while every operation on it stays total. Strengthen it only where the loose type forces a `!`, an `as`, or a "should never happen" branch.
- Brand an ID when two IDs of the same primitive type travel through the same call and can be swapped.
- Keep code boring when the shape is clear, local, and unlikely to grow. An abstraction earns its place by deleting branches, duplicated rules, or invalid states.

## Changes and debugging

Fix the fault where it starts, and leave the design simpler than you found it.

- The root cause is the first place the system did something it should not, or failed to handle a state it should; the symptom is only where that became visible. Ask whether the state that broke the code is legitimate. If it is, handle it where it broke. If it is not, find what produced it. Guards, retries, swallowed errors, clamped values, and fallback defaults are the usual ways to hide a bug.
- Instrument when stuck: read the actual error, the log, the stored state.
- When two fixes fail the same check, they likely share a wrong assumption. Write that assumption down in one sentence and test it before a third fix.
- After a fix, search for the same fault elsewhere and fix every instance.
- When the deciding fact took a deep dig to find, propose the cheap always-on signal (a log field, a metric, a status) that would have shown it at first look.
- Integrate a new requirement as if it had been there from the start. Propagate it through types, docs, and tests, then deliver it in small steps.
- Remove dead code, stale validators, and unused options before building on top of them.
- Design for observed usage.
- Keep one supported way per task. Replace an internal API in one change: inventory its callers, migrate them, and delete the old API. A temporary adapter needs a named removal step. Public contracts under Boundaries are the exception.
- For a mechanical change across many files, write a codemod or script instead of editing each file by hand: change one file by hand, make the script reproduce that change exactly, then run it on the rest. When the work is split across subagents, hand each the same tool.
- When the same correction comes up twice, make the mistake impossible at the highest level that works: architecture, then a type or lint rule, then a test or hook, instead of another instruction. Suggest `/correct` to the user; only they can run it.

In this repo:

- Fix post ordering or draft filtering in `getPosts()`, not per page.
- Absolute URLs derive from `site` in `astro.config.mjs`, through `Astro.site` in pages and `import.meta.env.SITE` in `rss.xml.ts`. Do not hardcode the domain.
- Tailwind generates classes from every file under `src/` (`source("../")` in `global.css`). A class built from a string outside `src/` is never generated.

## Documentation

- `GLOSSARY.md` is the glossary. Use its terms in code, UI copy, and conversation. When a discussion settles a new or sharper term, update it in the same change.
- Record a decision in `docs/adr/` only when it is hard to reverse, would surprise a reader without context, and came from a real trade-off.
- The Todo list in `README.md` is speculation, never current behavior or authorization to implement.
- Keep credentials, secret values, production identifiers, and private URLs out of documentation.

## Tests

The repo has no automated tests: the build checks every page and post, and the built files in `dist/` are what visitors get. When a test is added:

A test is a claim about what the code does for its users. Assert what they can observe, here the built HTML, feed, and sitemap, not internal helpers or call order. Judge each test against two imagined edits: break the behavior (it must fail) and restructure the internals while keeping every result (it must pass). Rewrite or delete tests that fail either.

- A new test counts once you have seen it go **red**: break the behavior it covers, watch it fail, restore.
- Derive the expected value from the requirement, never from the code under test.
- Hand tests for code you just wrote to the `test-writer` agent, with a brief (the intent and what is out of scope) and the entry points instead of the diff. A test written first, before the code, stays with you.

## Comments

Write a comment only for one of these; `/no-comments` removes the rest:

- An outside rule the code works around: a dependency, platform, vendor, spec, or protocol we cannot reshape. The comment names the rule, even when the workaround is our own code.
- An issue or RFC link that explains a constraint code cannot express.
- `// prettier-ignore`.

Write them in short, full sentences. `.claude/rules/typescript.md` sets their punctuation in TypeScript and Astro frontmatter. This overrides the ponytail plugin's `ponytail:` comment markers. Record a deliberate shortcut's limit in the PR description, or enforce it with a type, lint, or test.

## Commits

Write every commit message as a Conventional Commit: `type(scope)!: subject`, with a lowercase subject. Pull request titles follow the same format. The `commit-msg` hook and CI on pull requests enforce it with commitlint; when commitlint rejects a message, rewrite the message and commit again.

## Done

A change is done when `pnpm run check` is **green** and you observed the real result, not when it compiles, a proxy looks right, or a subagent says so. The gate chains the Prettier check, oxlint, and the build; `pnpm run format` fixes formatting. Judge the gate by its own exit code (`pnpm run check; echo $?`): a pipe through `tail` or `grep` reports the last command's status instead. CI runs the scripts that the gate chains as separate steps in `.github/workflows/ci.yml`; a script added to the gate gets a step there too.

- Read the actual value: the built files `dist/index.html`, `dist/blog/index.html`, `dist/blog/<id>/index.html`, `dist/rss.xml`, and `dist/sitemap-0.xml`.
- `astro dev` shows drafts; the build leaves them out. Check whether a post is published against `dist/`, not the dev server.
- Prefer a scripted check over a one-time look, and keep its output where a reviewer can rerun it.
- When a check fails unexpectedly, suspect the observation first: a stale page, the wrong instance, a cached build.
- Hand over an artifact that shows the change works and is quicker to review than the diff: for a visual change, screenshots of the page in `pnpm preview` at phone and desktop width.
- For a user-facing change, drive the real site and report its evidence. Name every page you did not check as unverified.
