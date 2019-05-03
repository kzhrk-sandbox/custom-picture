const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: 'CustomPicture',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer:
      process.env.NODE_ENV === 'production'
        ? [
            new UglifyJsPlugin({
              uglifyOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        : []
  },

  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',

  mode: process.env.NODE_ENV
};
