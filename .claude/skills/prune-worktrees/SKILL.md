---
name: prune-worktrees
description: Prune agent worktrees whose PR merged, with their local branches. Use when the user asks to clean up worktrees.
---

# Prune worktrees

Run `scripts/prune-worktrees` from this skill's directory, by its absolute path, from inside the repository. It needs an authenticated `gh` and `python3`. The script decides: it removes a worktree under `.claude/worktrees/` and deletes its branch only when the branch's PR merged at the worktree's HEAD and the worktree is clean, and it keeps every other one with the reason.

Report each removed worktree, and each kept one with its reason. A kept worktree holds work that has not landed; what happens to it is the user's call.
