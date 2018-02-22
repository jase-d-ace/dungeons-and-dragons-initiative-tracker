const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        use: 'babel-loader',
        test: /\.js$/
      },
      {
        use: ExtractTextWebpackPlugin.extract({
          use: 'css-loader'
        }),
        test: /\.css$/
      },
      {
        use: {
          loader: 'file-loader',
          options: {
            name: '/images/[name].[ext]'
          }
        },
        test: /.*\.(gif|png|jpe?g|svg)$/i
      },
    ] //end of rules array. actually put all loaders here.
  }, //end of module object.
  plugins: [
        new ExtractTextWebpackPlugin('style.css')
  ]
} //end of config object

module.exports = config;
