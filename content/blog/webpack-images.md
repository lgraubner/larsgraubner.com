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

Images are a crucial part of any website. Mostly they make the most of the transferred bytes. Therefore it's important to optimize them as much as possible. Modern build tools such as [Webpack](https://webpack.js.org/) or [gulp](http://gulpjs.com/) offer all kind of plugins to optimize your images. In this post I'm going to have a closer look at webpack and image processing as it differs from gulp, [Grunt](https://gruntjs.com/) and similar tools.

## Migrating from gulp

When I started to migrate from gulp to webpack I struggled getting image processing to work as I used to do it before. Gulp handles images like this: Provide a folder with images, process them and output at the given location.

<pre class="language-javascript"><code>const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);</code></pre>

Webpack works different which can be confusing. Rather than handling direct image input webpack is looking for references of images in your source code. So if you include a background image defined in a stylesheet webpack is able to find it.

<pre class="language-css"><code>.button {
  display: block;
  width: 100px;
  height: 40px;
  background: url('/images/button.png') center center no-repeat;
}</code></pre>

But here comes the clue. Normally you specify the path with your final URL structure in mind. So the previous example would resolve to <code>http://example.com/images/button.png</code>. But if <code>/images/button.png</code> doesn't resolve to the image locally webpack will just ignore it and output as is.

Assuming our file structure looks like this:

<pre><code>|-- images
|   `-- button.png
|-- styles
|   `-- button.css
`-- webpack.conf.js
</code></pre>

we have to adjust our css:

<pre class="language-css"><code>.button {
  display: block;
  width: 100px;
  height: 40px;
  background: url('../images/button.png') center center no-repeat;
}</code></pre>

Now webpack can resolve the image url correctly. Note that this part is not relevant for the final output path anymore, we care about this later. Having the image we can now process it. Handling images like this has a big advantage: We can alter the filename, filepath and the image itself automatically in our build process. Things like filename hashes for cache busting and inlining images can be done easily.

## Optimize images

So let's skip to some code to make some basic image processing with webpack. We are using `url-loader` and `image-webpack-loader` for processing. If you are not familiar with webpack configuration [check out the docs](https://webpack.js.org/guides/get-started/).

<pre class="language-javascript"><code>const webpackConfig = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: '/images/[name]_[sha512:hash:base64:7].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 7,
              },
              gifcicle: {
                interlaced: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                quality: 65,
              },
            },
          },
        ],
      },
    ],
  },
};</code></pre>

## Conclusion

Using webpack for bundling and image processing might be confusing at first and take some more time compared to gulp and Grunt, but it's worth the hassle. It enables powerful techniques such as image inlining which can improve your websites performance. If you didn't check out webpack yet you should definately do so.
