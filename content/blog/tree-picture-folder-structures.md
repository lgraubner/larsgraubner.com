---
categories: ["Tools"]
date: 2016-10-09T12:00:00+02:00
description: "This article explains how to easily picture your projects folder structure using the command line programm tree for unix systems."
title: "Using tree to picture folder structures"
url: "/blog/tools/tree-picture-folder-structures"
---

A couple days ago I was documenting the architecture of a website and wanted to write down the folder structure on a wiki page. After struggling with writing it down by hand which was not quite readable I searched for other solutions and found the handy tool tree.

`tree` is a simple cli tool for unix systems to print folder structures recursively to the console. It can be installed on macOS via [homebrew][1] and is also available for all common Linux distributions.

```
$ brew install tree
```

For my case I had to print out all folders, ignoring certain folders such as `node_modules` as those are generic. To achieve this I used the following command:

```
$ tree -d -I node_modules
```

Which outputs the following folder structure:

```
.
|-- assets
|   |-- images
|   |-- scripts
|   |   |-- helpers
|   |   `-- modules
|   `-- styles
|       |-- base
|       |-- components
|       |-- layout
|       |-- pages
|       |-- themes
|       |-- utils
|       `-- vendor
|-- dist
|   |-- scripts
|   `-- styles
|-- lib
`-- templates

18 directories
```

For a lot more options you can checkout the [ubuntuusers Wiki][2] or type `man tree` after installation to find out more.

## Conclusion

`tree` is a simple to use tool to quickly document folder structures. I clearly recommend this for readable directory listings in documentations. I'm regularly using it.

[1]: http://brew.sh/
[2]: https://wiki.ubuntuusers.de/tree/
