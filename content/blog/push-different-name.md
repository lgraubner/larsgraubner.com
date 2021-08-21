---
categories: ["Git"]
title: "Push to a remote branch with a different name in Git"
date: 2021-03-30T12:00:00+02:00
description: "There is a special syntax to push to a remote branch with a different name. This shows how the syntax looks like."
url: "/blog/git/push-different-branch-name"
---

Recently a lot of projects switched their default branch name from `master` to `main` and Github did so for every new repository created. A project I was working with had a (for me) weird syntax for pushing branches:

```git
git push origin master:main
```

I had not seen this colon syntax before and was wondering what it meant. After a quick research I learned that this pushes from the local `master` branch to a differently named remote branch (`main` in this case).

Ideally you rename your local branch with the following command to avoid the hassle:

```git
git branch -m main
```

More information: https://git-scm.com/docs/git-push#Documentation/git-push.txt-codegitpushoriginHEADmastercode
