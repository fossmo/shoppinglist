var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080/public',
    'webpack/hot/only-dev-server',
    './client/index.js'
  ],
  output: {
    path: __dirname + '/server/public',
    filename: 'wp_bundle.js',
    publicPath: 'http://localhost:8080/public'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
   extensions: ['', '.js', '.jsx']
 },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};
