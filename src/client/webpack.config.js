const { resolve: _resolve, sep } = require('path');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  src: _resolve(__dirname) + sep,
  dist: {
    rootDir: _resolve(__dirname, '..', '..', 'build'),
    app: _resolve(__dirname, '..', '..', 'build', 'static'),
  },
};

/**
 * Client webpack build configuration.
 *
 * This webpack config produces a bundle for the client-side application only.
 *
 * @param {object} env Webpack `env` object. See https://v4.webpack.js.org/api/cli/#environment-options
 * @param {object} argv Webpack `argv` object. See https://v4.webpack.js.org/configuration/configuration-types/#exporting-a-function
 */
const config = (env, { mode = 'none' }) => ({
  name: 'client',
  target: 'web',
  mode,
  entry: `${paths.src}/index.ts`,
  output: {
    path: paths.dist.app,
    filename: 'app.js',
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
      title: env.APP_NAME,
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
