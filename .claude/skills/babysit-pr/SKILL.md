---
name: babysit-pr
description: Monitor a pull request through CI and review. Use when the user asks to monitor, watch, or babysit a PR.
license: MIT, adapted from tstack by Theo Browne; see .claude/LICENSE-tstack
---

# Babysit PR

## Waiting

Wait with `scripts/pr-wait` from this skill's directory, by its absolute path. Never write your own watcher, polling loop, or `sleep` loop, and run one watcher per PR: every watcher on a GitHub account shares one rate limit.

```bash
pr-wait <pr> [--repo owner/name] [--until green|any-change]
```

It prints one line per real event. It exits 0 when the `--until` condition is met or the PR merges, 1 when it needs you (a required check failed or was cancelled, conflicts, PR closed), and 2 on bad input.

- `green` (default): required checks green. A base branch without required checks, such as any private repo without GitHub Pro, gates on every CI check.
- `any-change`: exit on the first event.

An event carries its context: a failed GitHub Actions check comes with its failed steps, its annotations by file and line, and the tail of its log, and a comment, review, or thread with its body and, for a thread, its file and line. Act on that; fetch the full log or thread only when the event does not explain the failure.

Run it with the Monitor tool (`timeout_ms: 3600000`), so each line wakes you. Start it again after you push, after you handle an exit 1, and after a resume; it remembers what it already reported. If it says another pid already watches the PR, do not start a second one. Kill the old one only if its events do not reach you.

When an event needs no action, end your turn without a message.

## GitHub rate limits

`gh pr create`, `gh pr view`, and `gh pr checks` use GraphQL. When GraphQL is used up (`gh api rate_limit --jq .resources.graphql`), the REST limit is separate and usually still has room: read the PR with `gh api repos/<owner>/<repo>/pulls/<n>` and checks with `gh api repos/<owner>/<repo>/commits/<sha>/check-runs`.

## Reviews

Act only on checks and comments newer than the latest push. Verify every bot finding against the source before changing code. Fix real findings and CI failures, and tell repository failures from infrastructure flakes. Run the check command from `CLAUDE.md` before each push. Dismiss a false positive with a written reason, then resolve the thread.

Keep the PR at the size the user's goal needs. Review loops grow a PR one cheap-looking fix at a time. Fix real bugs in the intended case. Decline the rest with a written reason and list them as follow-ups: unneeded tests, guards for edge cases that do not matter, extra compatibility, small performance costs. Prefer the fix that deletes or narrows code.

## Comments

Start every comment you post with this note, using the model name the harness reports and the user's GitHub login:

```md
> [!NOTE]
> 🤖 **<model> responding on behalf of <user>**
```

Below it, lead with the conclusion, cite the code, check, or reproduction, and skip thanks and status narration. Check it for secrets before posting.

## Base branch and merging

`pr-wait` reports when new base commits touch this PR's files and when the PR becomes BEHIND or DIRTY; rebase then, and push with `--force-with-lease`. If an overlapping PR makes this one obsolete, stop, report it, and ask before closing.

Stop when `pr-wait` exits 0. Merge only when the user explicitly asked; otherwise report that the PR is ready. Right before a merge, `git fetch` and check the PR again. Never merge when it is BEHIND or DIRTY, or when base commits that landed after the last green run touch this PR's files: rebase, push, and wait for green again.
