---
categories:
  - Tooling
  - JavaScript
date: 2017-05-24T17:41:26+02:00
description: ""
draft: true
title: Processing images with webpack
type: "post"
url: /webpack-images/
---

Images are a crucial part of any website. They make the most of the transferred bytes. Therefore it's important to optimize them as much as possible. Modern build tools such as Webpack or Gulp offer all kind of plugins to optimize your images. In this post I'm going to have a close look at webpack and image processing as it differs from Gulp and Grunt.

Gulp and Grunt handle images like this: Provide a folder with images, process them and output at the given location. Webpack works different which is sometimes confusing. Rather than handling direct image input webpack is looking for references of images in you source code.

## Use relative paths

To be able to process images with webpack it's important to reference images relative from it's origin. 
