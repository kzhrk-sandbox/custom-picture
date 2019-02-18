const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    main: './src/webpack/main.js'
  },

  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name].js'
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

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000
  },

  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',

  mode: process.env.NODE_ENV
};
