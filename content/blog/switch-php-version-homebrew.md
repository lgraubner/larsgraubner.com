---
categories: ['PHP']
date: 2021-09-20T22:00:00+02:00
description: ''
title: 'Quickly switch between PHP Versions with Homebrew on Mac'
url: '/blog/php/switch-php-version-homebrew'
draft: true
---

Under some circumstances you might need to use different PHP versions locally.

```bash
brew install php

brew install php@7.4

brew tap exolnet/homebrew-deprecated

brew install php@5.6

brew link --overwrite php@5.6

brew unlink php && brew link php
```
