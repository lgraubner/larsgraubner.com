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
    // markdownTemplateEngine: false,
    dataTemplateEngine: false,
    dir: {
      input: 'src',
    },
  };
};
