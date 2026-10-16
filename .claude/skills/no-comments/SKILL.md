---
name: no-comments
description: Strip comments that restate code, fix the smells they hid, and encode claimed constraints. Run before a commit or PR.
disable-model-invocation: true
license: MIT, adapted from pstack by Lauren Tan; see .claude/LICENSE-pstack
---

# No comments

Spawn Comment Sicko and act on its findings. Accept every finding the table in step 2 does not reject.

## Scope

Use the caller's files or diff. Otherwise use the current diff against the base branch, default `main`, including the working tree.

A scope of paths or the whole repository, rather than a diff, limits steps 3 and 4 to trivial fixes. Every other accepted flag gets a sketch in the report.

## Steps

1. Snapshot the working tree, untracked files included. A separate index leaves the real index and the stash untouched:

   ```sh
   idx="$(git rev-parse --absolute-git-dir)/no-comments-index"
   GIT_INDEX_FILE="$idx" git add -A && GIT_INDEX_FILE="$idx" git write-tree
   ```

   The printed tree is the snapshot. Spawn `Agent` with `subagent_type: "comment-sicko"`. Pass the scope. Do not restate its rules.

2. Check its report and diff. The report's diff is everything since the snapshot:

   ```sh
   idx="$(git rev-parse --absolute-git-dir)/no-comments-index"
   GIT_INDEX_FILE="$idx" git add -A && GIT_INDEX_FILE="$idx" git diff --cached <snapshot>
   ```

   Before deciding on an `IMPORTANT` or `do not remove` comment, trace its symbol yourself: read its callers and its history with `git log -S` and `git blame`.

   | Finding                                                                 | Action                                                                                         |
   | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
   | An edit to application code, or to a file outside the scope             | Reject the report.                                                                             |
   | A deleted comment that the keep list in `CLAUDE.md` protects            | Restore that comment. Keep the rest of the report.                                             |
   | A `MUST KILL` with a wrong reason, or on code that is intentional       | Drop the flag. Keep the rest of the report.                                                    |
   | A `MUST KILL` on a surprise in our own code                             | Accept it for steps 3 and 4. Do not restore the comment.                                       |
   | A deleted comment whose keep claim stays ambiguous after tracing        | Accept the deletion.                                                                           |
   | A kept comment not proven to be about something we cannot change        | Delete it.                                                                                     |
   | A lint or TypeScript suppression in scope that the report does not name | Correctness or safety rule: add a `MUST KILL`. Faulty, pedantic, or style-only rule: leave it. |

   On a rejected report, revert only its changes by piping the report's diff into `git apply -R`. Once the report's diff prints nothing, spawn Comment Sicko once more with the failure named. If the second report is rejected too, report it open and fail `/no-comments`.

3. Fix trivial accepted flags directly by deleting a dead path, dropping a parameter, or using the real API. If any fix needs a shape, sketch one design for the accepted set and surrounding code. Stop at the sketch. Step 4 implements.
4. Implement the smallest root-cause fix in scope. Remove every named workaround. If the root cause is out of scope, land the smallest in-scope fix and report the rest open. A fix that changes a public contract listed under Boundaries in `CLAUDE.md` stays a sketch until the user approves it. `.claude/principles/changes-and-debugging.md` guides intent only. It does not authorize widening the fence or fixing instances outside it. Never bolt on symptom guards.
5. Constraint comments say `do not remove`, `do not change wording`, or `talk to X before changing`. Leave keeps about things we cannot change. Offer the cheapest in-scope type, runtime, test, or CI lint. Wait for interactive approval. Unattended and eval require caller pre-approval. If approved, encode then delete. Otherwise delete, report the constraint open, and sketch out-of-scope work.
6. Report the deletion count, rejected reports and reruns, design sketch, fixes, encoding offers, encodings, unenforced constraints, and other open work.
