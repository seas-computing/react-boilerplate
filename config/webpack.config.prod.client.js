const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.client");

module.exports = merge(common, {
  bail: true,
  devtool: "source-map",
  entry: {
    client: [path.resolve(__dirname, "../src/client/index.js")]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("static/css/[name].css"),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      cache: true,
      uglifyOptions: {
        compress: {
          comparisons: false
        },
        sourceMap: true
      }
    })
  ]
});
