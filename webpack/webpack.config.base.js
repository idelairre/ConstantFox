'use strict';

var path = require('path');
var libraryName = require('../package.json').name;
var outputFile = libraryName + '.js';

module.exports = {
  entry: './src/constants.js',
  target: 'node',
  devtool: 'cheap-module-source-map',
  output: {
    path: './lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    preLoaders: [{
      test: /\.json$/,
      loader: 'json-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel?cacheDirectory',
      exclude: /node_modules/
    }]
  },
  modulesDirectories: ['node_modules'],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  resolveLoader: {
    root: path.resolve('node_modules')
  },
  node: {
    fs: 'empty'
  }
};
