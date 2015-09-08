var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'dist');

var config = {
  devtool: 'eval',
  entry: ['./js/client.js'],
  output: {
    path: buildPath,
    filename: "bundle.js"
  },
  module: {

    preLoaders: [{
      test: /\.js$/, 
      loader: "eslint-loader", 
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],

  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules','js']
  },
  eslint: {
    configFile: '.eslintrc'
  }
};

module.exports = config;