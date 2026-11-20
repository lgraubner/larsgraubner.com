---
paths: ["**/*.ts", "**/*.astro"]
---

# TypeScript

## Blank lines

Prettier never adds blank lines, so write function bodies in **paragraphs**, one per logical step, separated by a blank line:

- A statement and the check on its result form one paragraph: `const user = await getUser(id)` sits directly above `if (!user)`.
- A blank line follows each closing `}` when more statements follow.
- A blank line precedes an `if`, `for`, `switch`, or `try` that starts a new step, and the final `return` of a function with several steps.

## Comments

A one-line comment uses `//` and starts with a capital letter. Holding a single sentence, it ends without a full stop; with several sentences, each ends with one. `/**` opens only a multi-line docblock, with `/**` and `*/` on lines of their own and `*` leading each line between.

## Parsing

Every parser is a [zod](https://zod.dev) schema imported from `astro/zod`, the zod that Astro ships for content collection schemas, and the type comes from it with `z.infer`, so the schema and the type cannot drift. Only a grammar for free-form text, such as pasted notes, keeps a hand-written parser.
