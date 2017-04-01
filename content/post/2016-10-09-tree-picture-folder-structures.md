---
title: Using tree to picture folder structures
type: post
description: "This article explains how to easily picture your projects folder structure using the command line programm tree for unix systems."
date: 2016-10-09T08:00:06+00:00
url: /tree-picture-folder-structures/
categories:
  - Tooling
tags:
  - Shell
  - Tool

---
A couple days ago I was documenting the architecture of a website and wanted to write down the folder structure on a wiki page. After struggling with writing it down by hand which was not quite readable I searched for other solutions and found the handy tool tree.

<!--more-->

`tree` is a simple cli tool for unix systems to print folder structures recursively to the console. It can be installed on macOS via <a href="http://brew.sh/" target="_blank">homebrew</a> and is also available for all common Linux distributions.

<pre><code class="language-clike">$ brew install tree</code></pre>

For my case I had to print out all folders, ignoring certain folders such as `node_modules` as those are generic. To achieve this I used the following command:

<pre><code class="language-clike">$ tree -d -I node_modules</code></pre>

Which outputs the following folder structure:

<pre><code class="language-clike">.
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

18 directories</code></pre>

For a lot more options you can checkout the [ubuntuusers Wiki][1] or type `man tree` after installation to find out more.

## Conclusion

`tree` is a simple to use tool to quickly document folder structures. I clearly recommend this for readable directory listings in documentations. I&#8217;m regularly using it.

 [1]: https://wiki.ubuntuusers.de/tree/
