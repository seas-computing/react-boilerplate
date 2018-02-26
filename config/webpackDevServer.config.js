// const config = require("./webpack.config.dev.client");
const path = require("path");
const protocol = process.env.HTTPS === "true" ? "https" : "http";
const host = process.env.HOST || "localhost";

module.exports = {
  compress: true,
  noLevel: true,
  contentBase: path.resolve(__dirname, "../build"),
  watchContentBase: true,
  hot: true,
  publicPath: "/",
  quiet: true,
  stats: {
    colors: true
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
    ignored: /node_modules/
  },
  https: protocol === "https",
  host: host,
  overlay: false,
  historyApiFallback: {
    disableDotRule: true
  },
  index: "index.html",
  serverSideRender: true
};
