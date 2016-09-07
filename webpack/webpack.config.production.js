'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

baseConfig.output.filename = baseConfig.output.filename.replace(/\.js$/, '.min.js');

var config = Object.create(baseConfig);

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compressor: {
      warnings: false
    }
  })
];

module.exports = config;
