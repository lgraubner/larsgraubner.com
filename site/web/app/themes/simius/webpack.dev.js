/* eslint import/no-extraneous-dependencies:0 */
const webpack = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
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
    filename: 'scripts/[name].js',
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
        loaders: [
          'css?+sourceMap',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'sass',
        ],
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
    new BrowserSyncPlugin({
      host: 'localhost',
      port: config.devPort,
      proxy: {
        target: config.devUrl,
      },
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
  devTool: 'eval',
};

module.exports = webpackConfig;
