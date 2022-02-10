---
title: How to checkout a remote Git branch
date: 2021-11-09
description: Small cheatsheet about how to checkout a remote branch with Git and track it locally.
tags:
    - git
---

This is just small reminder about how to checkout remote branches with Git. I tend to forget the syntax every time. The important bits are:

1. Add the `--track` option to "link" the local branch to the remote one
2. Prepend `origin/` to the branch name

The full command will look something like this:

```
git checkout --track origin/my-branch
```

Nothing fancy or difficult happening here, but easy to forget when not used daily. At least for me. :)
