const webpack = require("webpack");
const path = require("path");
const StartServerPlugin = require("start-server-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.server");

module.exports = merge(common, {
  devtool: "eval-source-map",
  mode: "development",
  entry: [
    "webpack/hot/poll?1000",
    path.resolve(__dirname, "../src/server/index.js")
  ],
  watch: true,
  watchOptions: {
    poll: true,
    aggregateTimeout: 300,
    ignored: /node_modules/
  },
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?1000"]
    })
  ],
  plugins: [
    new StartServerPlugin("server.js"),
    new webpack.HotModuleReplacementPlugin()
  ]
});
