const webpack = require("webpack");
const path = require("path");
const CircularDependencyPlugin = require("circular-dependency-plugin");
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
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      children: true,
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module) {
        return module.context && module.context.includes("node_modules");
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: "SEAS Committees",
      favicon: path.resolve(__dirname, "../public/favicon.ico"),
      inject: true,
      template: path.resolve(__dirname, "../public/index.html")
    })
  ]
};
