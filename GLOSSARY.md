# larsgraubner.com

The personal website of Lars Graubner: a profile page and a blog for readers interested in software architecture, coding agents, and shipping software.

## Language

**Post**:
A blog article, one Markdown file in `src/content/blog/`. Its file name is its id and sets its URL `/blog/<id>/`.
_Avoid_: article, entry

**Draft**:
A post with `draft: true`. The dev server shows it; the build, the feed, and the sitemap leave it out.
_Avoid_: unpublished post
