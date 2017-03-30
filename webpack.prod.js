const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const forEach = require('lodash.foreach');

const config = require('./src/config');

const outputPath = path.join(__dirname, config.output.path);

const assetsPluginProcessOutput = function process(assets) {
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
    filename: 'scripts/[name]_[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: {
          loader: 'eslint-loader',
          options: {
            failOnWarning: false,
            failOnError: true,
          },
        },
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          cacheDirectory: true,
        },
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loader: [
          {
            loader: 'file-loader',
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
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/[name]_[hash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new AssetsPlugin({
      path: './data',
      filename: 'assets.json',
      fullPath: false,
      processOutput: assetsPluginProcessOutput,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
  ],
  target: 'web',
  devtool: 'cheap-module-source-map',
};

module.exports = webpackConfig;
