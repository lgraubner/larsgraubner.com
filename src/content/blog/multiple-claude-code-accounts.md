---
title: "Running multiple Claude Code accounts side by side"
description: "Use CLAUDE_CONFIG_DIR and direnv to pick a Claude Code account per project, without logging in and out."
pubDate: 2026-10-17
---

At my day job I currently use two Claude accounts for different projects. Switching between them with `/login` every time got old quickly, so I looked for a way to stay logged in to both. This post covers Claude Code in the terminal. I haven't tested any of it with Claude Desktop.

I tried [clauth](https://github.com/uwuclxdy/clauth), a ready-made tool for the same problem. It does a lot more than I need, and I kept having to log in again. I'm not sure whether that was the tool or my setup, but a plain environment variable turned out to be enough.

## One config directory per account

Claude Code reads the environment variable `CLAUDE_CONFIG_DIR` to decide where it keeps its configuration, including your login. Point it to a different directory and you get a separate session with its own account. Each directory stays logged in, so you can run both accounts at the same time.

```sh
# The first start creates ~/.claude-project-a.
# Run /login once. After that, Claude Code works as usual.
CLAUDE_CONFIG_DIR="$HOME/.claude-project-a" claude

# A second account in its own directory
CLAUDE_CONFIG_DIR="$HOME/.claude-project-b" claude
```

Use `$HOME` instead of `~` here. The shell doesn't expand `~` inside quotes, so `"~/.claude-project-a"` would not end up in your home directory.

A new config directory starts empty. Claude Code copies nothing from the default `~/.claude`, so you have to set up your settings, skills and MCP servers again or copy them over. With the same account, this lets you keep a different set of skills or MCP servers per project.

To save typing, put the commands in your `~/.zshrc` as aliases:

```sh
alias claude-project-a='CLAUDE_CONFIG_DIR="$HOME/.claude-project-a" claude'
alias claude-project-b='CLAUDE_CONFIG_DIR="$HOME/.claude-project-b" claude'
```

## Pick the account per project with direnv

Aliases still make you remember which account belongs to which project. [direnv](https://direnv.net) removes that step. It loads a `.envrc` file whenever you `cd` into a folder and unloads it when you leave. With `CLAUDE_CONFIG_DIR` set in that file, you only run `claude`, and the project picks the account. In folders without a `.envrc`, Claude Code falls back to the default `~/.claude`.

If you don't use direnv yet, install it and add its hook to your shell. On macOS with Homebrew and zsh:

```sh
brew install direnv

# ~/.zshrc
eval "$(direnv hook zsh)"
```

The `.envrc` is your personal setup and doesn't belong in the project's repository. Add it to your global Git ignore file once, so you can't commit it by accident. Git reads `~/.config/git/ignore` by default. If you have set `core.excludesFile`, use that file instead.

```sh
# ~/.config/git/ignore
.envrc
```

Then create the `.envrc` in your project:

```sh
# path/to/project/.envrc
export CLAUDE_CONFIG_DIR="$HOME/.claude-project-a"
```

The `export` matters. direnv only passes exported variables on to your shell.

Finally, allow the file and start Claude Code:

```sh
cd path/to/project
direnv allow
claude
```

direnv asks for `direnv allow` the first time and again whenever the `.envrc` changes. After that, `claude` in that folder always uses the right account.

## A small script for the setup

I wrote a script that does these steps for the current folder: [claude-env](https://github.com/lgraubner/.dotfiles/blob/main/bin/.local/bin/claude-env). Run it with a name, for example `claude-env project-a`. It creates `~/.claude-project-a`, writes the `export` line to the `.envrc`, offers to add `.envrc` to your global Git ignore file and runs `direnv allow`.

## Things to know

Session history and project memory live in the config directory too. If you move a project to another account, `claude --resume` doesn't find your earlier sessions, and the memory Claude Code built for the project starts empty.

direnv only works where your shell loads it. If you start Claude Code from somewhere that doesn't load the `.envrc`, like an IDE integration or a terminal without the direnv hook, `CLAUDE_CONFIG_DIR` isn't set. Claude Code then falls back to the default `~/.claude` without telling you.

## Show the active account in the status line

To avoid using the wrong account by accident, show the email address of the active account in the Claude Code status line. Run `/statusline` in Claude Code and ask for it. Make sure the script reads `.oauthAccount.emailAddress` from `.claude.json`.

That file is in your home directory for the default setup and inside the config directory with `CLAUDE_CONFIG_DIR`. Check that the script looks in `${CLAUDE_CONFIG_DIR:-$HOME}/.claude.json`, otherwise it shows the default account everywhere. The status line setting is part of the config directory as well, so run `/statusline` once per account.
