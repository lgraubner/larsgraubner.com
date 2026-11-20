---
name: ship-pr
description: Ship a settled task to a PR that is ready to merge, without the user watching.
disable-model-invocation: true
effort: low
license: MIT, adapted from tstack by Theo Browne; see .claude/LICENSE-tstack
---

# Ship PR

The user is not watching; your messages go unread until you stop. The task is what this conversation settled, plus any arguments to `/ship-pr`. Own it until its PR is ready to merge.

## What this grants, for this task only

- A worktree with its branch, commits, a push of that branch, and a PR. This replaces the ask-before-publishing rule in `CLAUDE.md` for this PR.
- `--force-with-lease` on that branch after a rebase.
- The test methods proof needs (run the app, drive the browser, take screenshots) without asking first. This does not bypass a harness approval prompt.

Not granted: merging, auto-merge, pushing the default branch, other branches, closing PRs, deleting data, production, anything outside the repo.

## Steps

1. Enter a worktree with `EnterWorktree`, named after the task. Confirm it branches from the latest `origin/<default-branch>`. Write the brief (the intent and what is out of scope, in one or two sentences) and the edge cases this conversation settled to `ship-pr-brief.md` in your scratchpad directory: the worktree sandbox refuses writes into the git directory, and git never tracks the scratchpad. Read the file again at steps 3, 6, and 9: it outlasts compaction, the scrollback does not. Agents you start get no history; give each the brief.
2. For a bug, reproduce it first and write a regression test at the seam where it shows; watch it fail. Read the failing assertion and its values before choosing a fix. A flake that fails only on slow CI runners goes red locally once you force its timing (seek the animations, pause the clock, throttle the CPU), not by repeating runs. Then make the smallest change that reaches the goal. Fix the case that happened and every instance of the same fault; list cases that only could happen as follow-ups.
3. For new behavior, hand the tests to the `test-writer` agent with the brief, the settled edge cases, and the entry points, as `CLAUDE.md` says.
4. Prove it and run the check command until it is green, as "Done" in `CLAUDE.md` says. CI repeats its scripts on the pushed head; it does not replace the local run.
5. Read `.claude/skills/no-comments/SKILL.md` and apply it to the diff. Report its open items in the PR as follow-ups.
6. `/code-review medium` the diff. Fix real findings in the case the brief intends; decline the rest with a reason and list them as follow-ups in the PR. A round whose findings you all declined ends the review. A round whose fixes changed code gets another round, given the findings declined so far so it does not report them again; at most three rounds. A finding still open when the rounds run out is not approved: report it.
7. Rename the branch with `git branch -m <type>/<slug>`: the Conventional Commit type of the change and a short kebab-case name for the task, such as `fix/flaky-motion-origin`. Rebase onto the latest default branch, then file the PR with `file-pr`.
8. Babysit it with `babysit-pr` until `pr-wait` exits 0. If the PR has no checks, `pr-wait` would wait forever: skip this step and say so in the report.
9. Report: PR link, head commit, proof, review outcome, each decision you made for the user, and what remains unverified. Then end your turn.

Stay active from step 1 to 9. Ending your turn while checks are pending ends the work.

## Ready gate

All of these hold on the latest commit: proof covers the whole diff, required checks are green, each review finding is fixed or answered with a reason, no human review requests changes, and the PR is neither BEHIND nor DIRTY.

## Asking

Ask with `AskUserQuestion`, putting the PR link, the blocker, and the options with your recommendation first in the question. Ask only when you cannot prove the change, the ready gate cannot pass without help, the next step is outside the grant, the goal is ambiguous in a way that changes the result, or another PR makes this one obsolete. Decide everything else and list it in the report.

If no answer comes, leave the PR open and start your final message with the question.
