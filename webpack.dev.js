const webpack = require('webpack');
const path = require('path');

const config = require('./src/config');

const webpackConfig = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './src/scripts/main.js'),
    path.join(__dirname, './src/styles/main.scss'),
  ],
  output: {
    publicPath: config.output.publicPath,
    filename: 'scripts/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  target: 'web',
  devtool: 'eval-source-map',
};

module.exports = webpackConfig;
