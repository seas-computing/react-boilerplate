const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.client");

module.exports = merge(common, {
  devtool: "eval-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3000",
    path.resolve(__dirname, "../src/client/index.js")
  ],
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    openPage: "app",
    hotOnly: true,
    proxy: {
      "/api": "http://localhost:3090",
      "/app/reports": "http://localhost:3090",
      "/app": {
        target: "http://localhost:3000/index.html",
        pathRewrite: { "/app": "" }
      }
    }
  },
  watch: true,
  watchOptions: {
    poll: true,
    aggregateTimeout: 300,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
