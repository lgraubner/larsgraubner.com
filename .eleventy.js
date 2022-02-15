const { format } = require('date-fns');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHiglight = require('@11ty/eleventy-plugin-syntaxhighlight');
const htmlmin = require('html-minifier');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHiglight);

  eleventyConfig.addWatchTarget('./src/css/app.css');

  eleventyConfig.addFilter('htmlDateString', (date) => {
    return format(date, 'yyyy-LL-dd');
  });

  eleventyConfig.addFilter('readableDate', (date) => {
    return format(date, 'LLL dd, yyyy');
  });

  eleventyConfig.addPassthroughCopy({ static: '/' });

  eleventyConfig.addCollection('post', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/posts/**/*.md');
  });

  let getSimilarTags = function (tagsA = [], tagsB = []) {
    return tagsA.filter(Set.prototype.has, new Set(tagsB)).length;
  };

  eleventyConfig.addFilter('similarPosts', (collection, path, tags) => {
    if (!tags) {
      return [];
    }

    return collection
      .filter((post) => {
        return (
          getSimilarTags(post.data.tags, tags) >= 1 &&
          post.data.page.inputPath !== path
        );
      })
      .sort((a, b) => {
        return (
          getSimilarTags(b.data.tags, tags) - getSimilarTags(a.data.tags, tags)
        );
      });
  });

  eleventyConfig.addTransform('htmlmin', function (content) {
    if (this.outputPath && this.outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }

    return content;
  });

  return {
    templateFormats: ['md', 'njk'],
    pathPrefix: '/',
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: false,
    dir: {
      input: 'src',
    },
  };
};
