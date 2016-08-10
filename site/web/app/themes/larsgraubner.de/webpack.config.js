const webpack = require('webpack');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const qs = require('qs');
const autoprefixer = require('autoprefixer');
const Clean = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

// Internal dependencies
const config = require('./assets/config');

// Internal variables
const scriptsFilename = (argv.p) ? 'scripts/[name]_[hash].js' : 'scripts/[name].js';
const stylesFilename = (argv.p) ? 'styles/[name]_[hash].css' : 'styles/[name].css';
const sourceMapQueryStr = (argv.p) ? '-sourceMap' : '+sourceMap';

const jsLoader = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  loaders: ['babel?presets[]=es2015&cacheDirectory'],
};

if (argv.watch) { // '--watch' to add monkey-hot
  jsLoader.loaders.unshift('monkey-hot');
}

/**
 * Process AssetsPlugin output and format it
 * for Sage: {"[name].[ext]":"[name]_[hash].[ext]"}
 * @param  {Object} assets passed by processOutput
 * @return {String}        JSON
 */
const assetsPluginProcessOutput = function (assets) {
  let name;
  let ext;
  let filename;
  const results = {};

  for (name in assets) {
    if (assets.hasOwnProperty(name)) {
      for (ext in assets[name]) {
        if (assets[name].hasOwnProperty(ext)) {
          filename = `${name}.${ext}`;
          results[filename] = path.basename(assets[name][ext]);
        }
      }
    }
  }
  return JSON.stringify(results);
};

/**
 * Loop through webpack entry
 * and add the hot middleware
 * @param  {Object} entry webpack entry
 * @return {Object}       entry with hot middleware
 */
const addHotMiddleware = function (entry) {
  let name;
  const results = {};
  // eslint-disable-next-line
  const hotMiddlewareScript = 'webpack-hot-middleware/client?' + qs.stringify({
    timeout: 20000,
    reload: true,
  });

  for (name in entry) {
    if (entry.hasOwnProperty(name)) {
      if (entry[name] instanceof Array !== true) {
        results[name] = [entry[name]];
      } else {
        results[name] = entry[name].slice(0);
      }
      results[name].push(hotMiddlewareScript);
    }
  }
  return results;
};

const webpackConfig = {
  context: path.resolve(config.context),
  entry: config.entry,
  output: {
    path: path.join(__dirname, config.output.path),
    publicPath: config.output.publicPath,
    filename: scriptsFilename,
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint',
      },
    ],
    loaders: [
      jsLoader,
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', [
          `css?${sourceMapQueryStr}`,
          'postcss',
        ]),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', [
          `css?${sourceMapQueryStr}`,
          'postcss',
          `resolve-url?${sourceMapQueryStr}`,
          `sass?${sourceMapQueryStr}`,
        ]),
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
        loaders: [
          // eslint-disable-next-line
          'file?' + qs.stringify({
            name: '[path][name].[ext]',
          }),
          // eslint-disable-next-line
          'image-webpack?' + JSON.stringify({
            bypassOnDebug: true,
            progressive: true,
            optimizationLevel: 7,
            interlaced: true,
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
            svgo: {
              removeUnknownsAndDefaults: false,
              cleanupIDs: false,
            },
          }),
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?.*)?$/,
        // eslint-disable-next-line
        loader: 'file?' + qs.stringify({
          name: '[path][name].[ext]',
        }),
      },
      {
        test: /\.woff(2)?(\?.*)?$/,
        // eslint-disable-next-line
        loader: 'url?' + qs.stringify({
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '[path][name].[ext]',
        }),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      'bower_components',
    ],
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new Clean([config.output.path]),
    new ExtractTextPlugin(stylesFilename, {
      allChunks: true,
      disable: (argv.watch === true),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  postcss: [
    autoprefixer({
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12',
      ],
    }),
  ],
  eslint: {
    failOnWarning: false,
    failOnError: true,
  },
  stats: {
    colors: true,
  },
};

// '--watch' to push additional plugins to webpackConfig
if (argv.watch) {
  webpackConfig.entry = addHotMiddleware(webpackConfig.entry);
  webpackConfig.output.pathinfo = true;
  webpackConfig.debug = true;
  webpackConfig.devtool = '#cheap-module-source-map';
  webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
}

if (argv.p) {
  webpackConfig.plugins.push(new AssetsPlugin({
    path: path.join(__dirname, config.output.path),
    filename: 'assets.json',
    fullPath: false,
    processOutput: assetsPluginProcessOutput,
  }));
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_debugger: true,
    },
  }));
  webpackConfig.plugins.push(new OptimizeCssAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true,
  }));
}

module.exports = webpackConfig;
