var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  devServer: {
   headers: { "Access-Control-Allow-Origin": "http://localhost:3009", "Access-Control-Allow-Credentials":"true" }
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8080/server/public/wp_bundle.js',
    'webpack/hot/only-dev-server',
    './client/index.js'
  ],
  output: {
    path: __dirname + "/server/public",
    filename: '/wp_bundle.js',
    publicPath: 'http://localhost:8080/server/public',
    crossOriginLoading: 'anonymous'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};
