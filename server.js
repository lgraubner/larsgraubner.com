/* eslint import/no-extraneous-dependencies:0, global-require:0, no-console:0 */
const http = require('http');
const webpack = require('webpack');
const express = require('express');
const path = require('path');

// create app
const app = express();

const port = 1314;
app.set('port', port);

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.dev.js');

const compiler = webpack(webpackConfig);

const middleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
});

// enable hot reloading
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// create server
const server = http.createServer(app);

// log
server.on('listening', () => {
  console.log(`Server is listening on port ${port}!`);
});

// start server
server.listen(port);
