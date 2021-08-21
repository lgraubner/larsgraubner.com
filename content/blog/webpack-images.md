---
categories: ["Tools"]
date: 2017-06-09T12:00:00+02:00
description: "Images should be optimized as good as possible. This post describes image processing with webpack and how it differs from gulp, Grunt and similar tools."
title: "Process images with webpack"
url: "/blog/tools/webpack-images"
---

Images are a crucial part of any website. Often they make the most of the transferred bytes. Therefore it's important to optimize them as good as possible. Modern build tools such as [Webpack](https://webpack.js.org/) or [gulp](http://gulpjs.com/) offer all kind of plugins to optimize your images. In this post I'm going to have a closer look at image processing with webpack and how it differs from gulp, [Grunt](https://gruntjs.com/) and similar tools.

_This post is assuming webpack v2. Loader syntaxes might vary in other versions._

## Migrating from gulp

When I started to migrate from gulp to webpack I struggled getting image processing to work as I used to do it before. Gulp handles images like this: Provide a folder with images, process them and output at the given location.

```javascript
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')

gulp.task('default', () =>
  gulp.src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'))
)
```

Webpack works different which can be confusing. Rather than handling direct image input webpack is looking for references of images in your source code. So if you include a background image defined in a stylesheet webpack is able to pick it up.

```css
.button {
  display: block;
  width: 100px;
  height: 40px;
  background-image: url('/images/button.png');
}
```

But here comes the clue. Normally you specify the path with your final URL structure in mind. So the previous example would resolve to `http://example.com/images/button.png`. But if `/images/button.png` doesn't resolve to the image locally webpack will just ignore it and output the path as is.

Assuming our file structure looks like this:

```
|-- images
|   `-- button.png
|-- styles
|   `-- button.css
`-- webpack.conf.js
```

we have to adjust our css as follows:

```css
.button {
  display: block;
  width: 100px;
  height: 40px;
  background-image: url('../images/button.png');
}
```

Now webpack can resolve the image url correctly. This also works for any kind of file type (js, html) as long they are handled by a loader. Note that this part is not relevant for the final output path anymore, we care about this later. Having the image we can now process it. Handling images like this has a big advantage: We can alter the filename, filepath and the image itself automatically in our build process. Things like filename hashes for cache busting and inlining images can be done easily.

A very basic webpack config loading images could look like the following. If you are not familiar with webpack configuration [check out the docs](https://webpack.js.org/guides/get-started/).

```javascript
const webpackConfig = {
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
            loader: 'file-loader'
          }
        ]
      }
    ]
  }
}
```

## Loaders

Webpack is using loaders to process different filetypes. We want to optimize our images to reduce file sizes and make them load as fast as possible. The following loaders help us to achieve this task.

### file-loader

The [file-loader](https://github.com/webpack-contrib/file-loader) is a simple loader which does not touch the file itself. The main purpose is to alter the filename and path for public use.

```javascript
{
  test: /.*\.(gif|png|jpe?g|svg)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '/images/[name]_[hash:7].[ext]',
      }
    },
  ]
}
```

This will pick up all images with the given extension and copy it to the output path defined in your webpack config. Also the file names are changed by the defined pattern `/images/[name]_[hash:7].[ext]`. This basically translates to: Put file in folder `images`, rename image to the original name followed by the first seven characters of it's hash and the original extension. The path in your output is formatted accordingly.

Without much effort we enabled [cache busting](https://www.keycdn.com/support/what-is-cache-busting/). Every time an image changes the hash in the filename differs and forces website visitors to redownload the image.

### url-loader

Another performance optimization technique is to inline small images. Inlining images is saving network requests and can make your page faster. For this purpose [url-loader](https://github.com/webpack-contrib/url-loader) was created.

```javascript
{
  test: /.*\.(gif|png|jpe?g)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8000,
      },
    },
  ]
}
```

The only important option is `limit`. All images below the byte limit are inlined to the source file as data URL. Note: SVG files should not be processed with url-loader ([issue](https://github.com/webpack-contrib/url-loader/issues/6#issuecomment-63182275)). The right byte limit is up to you. You have to evaluate your resulting stylesheet filesize and saved network requests.

<div class="notice"><p>Heads up: url-loader is a wrapper for file-loader. If the file is too big it will fall back to file-loader. Therefore you can omit the file-loader. All options are passed through.</p></div>

### image-webpack-loader

One final and essential task provides the [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader). It compresses the images with suitable libraries for each file type.

```javascript
{
  test: /.*\.(gif|png|jpe?g)$/i,
  use: [
    {
      loader: 'image-webpack-loader',
      options: {...},
    }
  ]
}
```

The loader accepts fine grained [options](https://github.com/tcoopman/image-webpack-loader#usage) for the underlying minifiers. This is a must have to avoid serving images with large file sizes.

## Conclusion

Using webpack for bundling and image processing might be confusing at first and take initially some more time compared to gulp and Grunt, but it's worth the hassle. The presented loaders provide a solid starting point for optimized images. It enables useful techniques such as image inlining and cache busting. A full example webpack configuration can be found on [GitHub](https://gist.github.com/lgraubner/809b9c806c82366af34193ade5cfeb57). If you didn't check out webpack yet you should definitely do so.
