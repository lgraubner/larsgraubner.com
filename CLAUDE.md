# larsgraubner.com

Personal website and blog of Lars Graubner: a static Astro site with Tailwind CSS, deployed from `main` by `.github/workflows/deploy.yml`.

## Working

- When a step doesn't need my input, keep going. Put status notes in the same message as your next action.
- Stop and ask only when you can't continue without me, or before anything destructive: deleting data, force-pushing, publishing, or changing anything outside this repository. A push to `main` deploys the site.
- Before asking which approach to take, check whether running something can answer it: behavior, timing, output, or performance. If it can, try it and let the result decide. Ask only for product or preference calls no experiment settles.
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

- Pages: `src/pages/`, one file per route. Every page renders inside `src/layouts/Layout.astro`.
- Blog posts: Markdown in `src/content/blog/`. Unfinished posts set `draft: true`.
- Post lists: only through `getPosts()` in `src/lib/posts.ts`, which filters drafts and sorts.
- UI components: `src/components/`, follow `Link.astro`.

## Boundaries

Post frontmatter is parsed by the zod schema of the `blog` collection in `src/content.config.ts`; the build fails on an invalid post.

Public contracts stay stable: post URLs `/blog/<id>/` (the file name, always with a trailing slash), `/rss.xml`, and the sitemap. Renaming a post file breaks its links and feed entries.

## Principles

Read the matching file in `.claude/principles/` before the work:

- Debugging, refactoring, or changing a URL: `changes-and-debugging.md`.
- Declaring work done: `proof.md`.

## Comments

Write a comment only for one of these; `/no-comments` removes the rest:

- An outside rule the code works around: a dependency, platform, vendor, spec, or protocol we cannot reshape. The comment names the rule, even when the workaround is our own code.
- An issue or RFC link that explains a constraint code cannot express.
- `// prettier-ignore`.

Write them in short, full sentences. `.claude/rules/typescript.md` sets their punctuation in TypeScript and Astro frontmatter. This overrides the ponytail plugin's `ponytail:` comment markers.

## Commits

Write every commit message as a Conventional Commit: `type(scope)!: subject`, with a lowercase subject.

## Done

A change is done when `pnpm run check` is **green** (Prettier, then the build CI deploys). Judge by its own exit code (`pnpm run check; echo $?`). Run `pnpm run format` to fix formatting.
