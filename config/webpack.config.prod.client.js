const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.client");

module.exports = merge(common, {
  bail: true,
  devtool: "source-map",
  mode: "production",
  entry: {
    client: [path.resolve(__dirname, "../src/client/index.js")]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true
    })
  ]
});
