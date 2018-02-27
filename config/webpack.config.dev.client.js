const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.client");

module.exports = merge(common, {
  devtool: "cheap-module-source-map",
  mode: "development",
  output: {
    crossOriginLoading: "anonymous"
  },
  entry: [
    "react-hot-loader/patch",
    path.resolve(__dirname, "../src/client/index.js")
  ],
  serve: {
    host: "localhost",
    port: 3000,
    open: true,
    openPage: "app",
    proxy: {
      "/api": "http://localhost:3020",
      "/app/reports": "http://localhost:3020",
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
  }
});
