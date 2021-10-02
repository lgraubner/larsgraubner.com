---
categories: ['Tools']
date: 2021-10-02T16:00:00+02:00
description: 'How to install different PHP Versions with Homebrew on macOS and switch between them.'
title: 'Manage PHP Versions with Homebrew on macOS'
url: '/blog/tools/manage-php-versions-homebrew'
---

I mostly work with Docker, but sometimes it's useful to have PHP installed locally for some CLI action. To install a specific PHP Version I'm using [Homebrew](https://brew.sh/index_de) for macOS. Mac provides a preinstalled PHP Version, but this is mostly outdated.

To install the latest PHP Version you can run the following command:

```bash
brew install php
```

It's also possible to install older versions like this:

```bash
brew install php@7.4
```

Homebrew does only maintain not depcrecatd versions. If you have to use a deprecated version for some reason you can do the following:

```bash
brew tap exolnet/homebrew-deprecated

brew install php@5.6
```

If you need to switch between PHP versions you have to first unlink the currently linked PHP version and link the desired one:

```
brew unlink php

brew link php@7.4 --force --overwrite
```

This is not the most efficient handling of switching versions compared to [Node Version Manager](https://github.com/nvm-sh/nvm) or [rbenv](https://github.com/rbenv/rbenv) for Ruby, but should be sufficient as this probably won't happen too much.
