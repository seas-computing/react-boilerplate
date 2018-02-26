const path = require("path");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.server");

module.exports = merge(common, {
  bail: true,
  // devtool: "source-map",
  entry: [path.resolve(__dirname, "../src/server/index.js")],
  externals: [nodeExternals()]
});
