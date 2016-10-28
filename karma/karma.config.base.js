'use strict';

var path = require('path');

module.exports = {
  basePath: '../',
  autoWatch: false,
  singleRun: true,
  colors: true,
  frameworks: ['jasmine'],
  browsers: ['Chrome', 'Firefox', 'PhantomJS'],
  files: ['./test/constants.spec.js'],
  preprocessors: {
    './test/constants.spec.js': ['webpack']
  },
  webpack: {
    module: {
      noParse: /node_modules\/json-schema\/lib\/validate\.js/,
      loaders: [{
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      }, {
        test: /\.js$/,
        loader: 'babel?cacheDirectory',
        exclude: /node_modules/
      }]
    },
    modulesDirectories: ['node_modules'],
    resolve: {
      root: path.resolve(__dirname),
      extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    resolveLoader: {
      root: path.resolve('node_modules')
    },
    node: {
      fs: 'empty'
    }
  },
  webpackMiddleware: {
    stats: {
      chunks: false,
      errors: false,
      colors: true,
      modules: false,
      noInfo: true,
      warnings: false
    }
  }
}
