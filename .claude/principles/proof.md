# Proof

Work is done when you observed the real result, not when it compiles, a proxy looks right, or a subagent says so.

- Read the actual value: the stored row, the sent message, the HTTP status, the page the user sees.
- Prefer a scripted check over a one-time look, and keep its output where a reviewer can rerun it.
- When a check fails unexpectedly, suspect the observation first: a stale page, the wrong instance, a cached build.
- Hand over an artifact that shows the change works as intended and is quicker to review than the diff: screenshots or a video for UI, the request and response for an API, the command and output for a CLI.
- For a user-facing change, drive the real app with the project's `verify-*` skill and report its evidence path. Name every entry point you did not drive as unverified.

Adapted from pstack (MIT), see `.claude/LICENSE-pstack`.

## In this repo

- `pnpm run check` builds every page into `dist/`. An invalid post frontmatter fails there, at the schema in `src/content.config.ts`.
- Read the built files: `dist/index.html`, `dist/blog/index.html`, `dist/blog/<id>/index.html`, `dist/rss.xml`, `dist/sitemap-0.xml`.
- `astro dev` shows drafts; the build leaves them out (`getPosts()` in `src/lib/posts.ts`). Check whether a post is published against `dist/`, not the dev server.
- For a visual change, look at the page in a browser with `pnpm preview`, at phone and desktop width.
