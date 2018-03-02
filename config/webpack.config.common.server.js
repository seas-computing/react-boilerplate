const webpack = require("webpack");
const path = require("path");

module.exports = {
  name: "server",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "server.js",
    publicPath: "/"
  },
  target: "node",
  node: {
    //treat these globals as relative to the **built** file
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "../src/server")],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: ["transform-object-rest-spread"]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
