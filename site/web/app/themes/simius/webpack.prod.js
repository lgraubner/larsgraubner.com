const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const forEach = require('lodash.foreach');

const config = require('./assets/config');

const outputPath = path.join(__dirname, config.output.path);

const assetsPluginProcessOutput = function (assets) {
  const results = {};

  forEach(assets, (chunk, key) => {
    forEach(chunk, (filename, ext) => {
      results[`${key}.${ext}`] = path.basename(filename);
    });
  });

  return JSON.stringify(results);
};

const webpackConfig = {
  context: path.resolve(config.context),
  entry: config.entry,
  output: {
    path: outputPath,
    publicPath: config.output.publicPath,
    filename: 'scripts/[name]_[chunkhash].js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', [
          'css?-sourceMap',
          'postcss',
        ]),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
        loaders: [
          'file?name=[path][name].[ext]',
          `image-webpack?${JSON.stringify({
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
          })}`,
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?.*)?$/,
        loader: 'file?name=[path][name].[ext]',
      },
      {
        test: /\.woff(2)?(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]',
      },
    ],
  },
  resolve: {
    root: [
      path.resolve('./assets/scripts'),
      path.resolve('./assets/styles'),
    ],
    extensions: ['', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
    ],
  },
  plugins: [
    new CleanPlugin([outputPath]),
    new ExtractTextPlugin('styles/[name]_[hash].css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new AssetsPlugin({
      path: outputPath,
      filename: 'assets.json',
      fullPath: false,
      processOutput: assetsPluginProcessOutput,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
  target: 'web',
  devTool: 'cheap-module-source-map',
};

module.exports = webpackConfig;
