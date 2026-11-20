---
name: file-pr
description: File a concise pull request. Use when the user asks to file, open, or create a PR.
license: MIT, adapted from tstack by Theo Browne; see .claude/LICENSE-tstack
---

# File PR

Check whether a PR for this branch already exists. Diff against the base branch and confirm the contents match the goal.

Title: a Conventional Commit, as `CLAUDE.md` sets. Say why the change matters, not the mechanism:

- ❌ `perf(server): negotiate permessage-deflate on the websocket`
- ✅ `perf(server): cut websocket frame size by 70% with compression`

Description: open with the problem in the user's terms, then the fix in one or two sentences. No inventory of changed files and functions. Add the evidence "Done" in `CLAUDE.md` asks for (the command and its output, or a screenshot) and each deliberate shortcut with its limit.

Check the title and description for secrets and private details. Open a real PR, not a draft, so CI and review bots run.
