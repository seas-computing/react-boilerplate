const { resolve: _resolve, sep } = require('path');
const webpack = require('webpack');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  src: _resolve(__dirname) + sep,
  dist: {
    rootDir: _resolve(__dirname, '..', '..', 'build'),
    app: _resolve(__dirname, '..', '..', 'build', 'static'),
    static: 'static',
  },
};

/**
 * Client webpack build configuration.
 *
 * This webpack config produces a bundle for the client-side application only.
 *
 * @param {object} webpackEnv Webpack env object (basically any/all options passed in via the CLI)
 * @param {object} [processEnv] Process env object (environment variables from process.env)
 */
const config = ({ mode = 'none' }, processEnv = {}) => ({
  name: 'client',
  target: 'web',
  mode,
  entry: `${paths.src}/index.ts`,
  output: {
    path: paths.dist.app,
    filename: 'app.js',
    publicPath: `/${paths.dist.static}/`,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      sourceMap: true,
    })],
    noEmitOnErrors: true,
    nodeEnv: 'production',
    occurrenceOrder: true,
    providedExports: true,
    usedExports: true,
    sideEffects: true,
    splitChunks: {
      chunks: 'all',
      name: true,
      minSize: 1,
      minChunks: 1,
      cacheGroups: {
        assets: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          reuseExistingChunk: true,
          filename: '[name][hash].js',
        },
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TSConfigPathsPlugin(),
    ],
  },
  context: paths.src,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.src,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: processEnv.APP_NAME,
    }),
    new HtmlWebpackRootPlugin(),
  ],
  node: {
    __dirname: false,
  },
});

module.exports = {
  config,
  paths,
};
