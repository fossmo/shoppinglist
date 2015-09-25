var path = require('path');
var webpack = require('webpack');
//var less = require('less-loader');

module.exports = {
  devtool: 'source-map',
  //devServer: {
  // headers: { "Access-Control-Allow-Origin": "http://localhost:3009", "Access-Control-Allow-Credentials":"true" }
  //},
  entry: [
    'webpack-dev-server/client?http://localhost:8080/wp_bundle.js',
    'webpack/hot/only-dev-server',
    './client/index2.js'
  ],
  output: {
    path: __dirname + "/server/public",
    filename: '/wp_bundle.js',
    publicPath: 'http://localhost:8080/',
    crossOriginLoading: 'anonymous'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    },
    { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
    {
      test: /\.jsx$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    }
  ]
  }
};
