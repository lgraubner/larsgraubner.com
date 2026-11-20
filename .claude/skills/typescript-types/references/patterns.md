# TypeScript patterns

Code examples for the rules in `SKILL.md` and the Types and Boundaries sections of `CLAUDE.md`.

## Branded types

Brand primitives so they can't be mixed up. The zod schema brands the value where it enters; downstream code trusts the type.

```ts
import { z } from "astro/zod";

const agentIdSchema = z.uuid().brand<"AgentId">();
type AgentId = z.infer<typeof agentIdSchema>;

function focusAgent(id: AgentId): void {
  /* input is trusted */
}

focusAgent(agentIdSchema.parse(params.agentId));
```

## Discriminated unions

Model variants with a literal discriminant. Every variant shares the field name and each variant's value is unique, so impossible combos can't be represented.

```ts
// Don't. Boolean + optionals lets contradictory states exist.
type DiffState = { loading: boolean; diff?: GitDiff; error?: string };

// Do. Only valid states exist.
type DiffState =
  | { kind: "loading" }
  | { kind: "ready"; diff: GitDiff }
  | { kind: "error"; error: string };
```

Pick one discriminant name (`kind`, `type`, `tag`) and stick to it.

## Constructive modeling

Build the type from parts that are all legal instead of restricting a loose type with runtime checks.

Non-empty, via a variadic tuple:

```ts
type NonEmpty<T> = [T, ...T[]];

// Don't: T[] plus a length check every caller must repeat
function pickWinner(entries: string[]): string {
  if (entries.length === 0) throw new Error("no entries");
  return entries[Math.floor(Math.random() * entries.length)];
}

// Do: an empty value of the type can't exist
function pickWinner(entries: NonEmpty<string>): string {
  return entries[Math.floor(Math.random() * entries.length)];
}
```

Where a plain `T[]` arrives, narrow once with a guard. The fact then travels in the type:

```ts
const isNonEmpty = <T>(arr: T[]): arr is NonEmpty<T> => arr.length > 0;
```

Even length, as pairs:

```ts
type Pairs<T> = [T, T][];
```

A time range, as start plus duration:

```ts
// Don't: a comment holds the invariant
type TimeRange = { start: Date; end: Date }; // start <= end

// Do: a negative range can't be written; derive end when needed
type TimeRange = { start: Date; durationMs: number };
```

Keep `durationMs` a plain number. Brand it (per Branded types) only if a raw number could be passed where a duration is expected, not by reflex. Pick the representation that makes the bad state unconstructable, then expose the reading you need on top (`pairs.flat()`, a `rangeEnd()` helper).

## Simplest total type

Keep `T[]` when every operation on it is total:

```ts
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0); // [] is 0, fine
```

Strengthen when the loose type forces a lie at a use site. The tells are `!`, `arr[0] as T`, and a "should never happen" throw:

```ts
// Don't: partiality smuggled past the compiler
function newestSession(sessions: Session[]): Session {
  return sessions.at(0)!;
}

// Do: strengthen the input; the assertion disappears
function newestSession(sessions: NonEmpty<Session>): Session {
  return sessions[0];
}
```

Weakening the result to `Session | undefined` is the other total signature.

## No `as` casts

The rules live in the Boundaries section of `CLAUDE.md` and in Parsing of `.claude/rules/typescript.md`: parse with the schema, and the type comes from it.

```ts
import { z } from "astro/zod";

// Don't
const user = data as User;

// Do
const userSchema = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof userSchema>;

function parseUser(data: unknown): User {
  return userSchema.parse(data);
}
```

Use `safeParse` when failure is an expected branch.

When the type comes first, annotate the validator with the type it proves. The compiler then rejects a validator that proves less than the type. Remove `name` from the object below and the assignment fails to compile.

```ts
type User = { id: string; name: string };

const userSchema: z.ZodType<User> = z.object({
  id: z.string(),
  name: z.string(),
});
```

When refactoring an `as` out of existing code, identify why TypeScript can't infer:

- Missing discriminant: add one, switch to a discriminated union.
- Overly wide source type (e.g. `Record<string, unknown>`): narrow it.
- Untyped boundary: parse with the schema that owns the shape. Add a schema only where none exists.
- Genuinely inexpressible: use a branded type or `satisfies`.

## Narrowing hierarchy

From best to last-resort:

1. **Discriminated union switch / if.** Compiler narrows automatically.
2. **`in` operator.** `"key" in obj` narrows to variants containing that key.
3. **`typeof` / `instanceof`.** For primitives and class instances.
4. **User-defined type guard.** When the above aren't enough.
5. **`as` cast.** Only after validation.

A union without a discriminant narrows with `in`. Add a discriminant when you own the type.

```ts
type LegacyShape = { radius: number } | { width: number; height: number };

function area(s: LegacyShape): number {
  if ("radius" in s) return Math.PI * s.radius ** 2; // narrowed to the circle variant
  return s.width * s.height; // narrowed to the rectangle variant
}
```

## Type guards

A guard narrows a value already inside the boundary; external data takes its schema (No `as` casts). The body checks everything the signature claims.

```ts
type Task = { id: TaskId; assignee?: User };
type AssignedTask = Task & { assignee: User };

// Don't: claims a whole AssignedTask, checks a key that may hold undefined
function isAssigned(task: Task): task is AssignedTask {
  return "assignee" in task;
}

// Do: checks exactly the claim
function isAssigned(task: Task): task is AssignedTask {
  return task.assignee !== undefined;
}
```

## `satisfies` over `as`

`satisfies` validates without widening literal types.

```ts
// Don't. Widens, loses literal types.
const config = { theme: "dark", cols: 3 } as Config;

// Do. Validates AND preserves literal types.
const config = { theme: "dark", cols: 3 } satisfies Config;
// config.theme is "dark" (literal), not string
```

## Boundary validation

The rules live in the Boundaries section of `CLAUDE.md`. Format specifics:

- **Wire formats** (JSON, protobuf): accept unknown fields so a newer sender doesn't break an older reader. Zod objects strip unknown keys by default; protobuf-es `fromJson` needs `ignoreUnknownFields: true`.
- **Persisted JSON:** versioned blob with a try/catch around the parse.

## Schema-derived types

When a `.proto`, OpenAPI spec, GraphQL schema, or database migration already defines a shape, derive from the generated types instead of duplicating them.

```ts
// Don't. Duplicate shape, drifts when the schema changes.
type CheckSummary = {
  totalCount: number;
  checks: { name: string; status: string }[];
};
function renderChecks(s: CheckSummary) {
  /* ... */
}

// Do. Derive from the generated schema type.
import type { ChecksMessage } from "<generated module>";
function renderChecks(s: Pick<ChecksMessage, "totalCount" | "checks">) {
  /* ... */
}
```

Reach for `Pick`, `Omit`, `Parameters`, `ReturnType`, `Awaited`, `typeof` before writing a new interface.

## Object args

```ts
// Don't. Swap the two numbers, still compiles.
resizeWindow(windowId, 600, 800);

// Do. Order-independent, self-documenting.
resizeWindow({ windowId, width: 800, height: 600 });
```

Skip on hot paths: per-frame render, tokenizers, parsers, anything in a tight loop where the allocation cost matters.
