const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  name: "client",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "static/js/[name].js"
  },
  target: "web",
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.\.\./
        ],
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "../src/client")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["react"],
            plugins: [
              "transform-object-rest-spread",
              "transform-decorators-legacy",
              "transform-class-properties"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      title: "SEAS Committees",
      favicon: path.resolve(__dirname, "../public/favicon.ico"),
      inject: true,
      template: path.resolve(__dirname, "../public/index.html")
    })
  ]
};
