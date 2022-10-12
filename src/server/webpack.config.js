const { resolve: _resolve, sep } = require('path');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { IgnorePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const paths = {
  src: _resolve(__dirname) + sep,
  dist: _resolve(__dirname, '..', '..', 'build'),
};

/**
 * NestJs uses a custom wrapper around require() that allows it to show a
 * warning when some extra package needs to be installed. This causes problems
 * with webpack, so we're ignoring packages we're not using with the
 * IgnorePlugin below.
 *
 * To de-ignore a package, just remove it from this array.
 */
const nestIgnore = [
  '^cache-manager$',
  '^@nestjs/microservices$',
  // packages below are required from microservices
  '^amqp-connection-manager$',
  '^amqplib$',
  '^grpc$',
  '^mqtt$',
  '^nats$',
  '^redis$',
];

/**
 * Server webpack build configuration.
 *
 * This webpack config produces a bundle for the server-side application only.
 *
 * @param {object} webpackEnv Webpack env object (basically any/all options passed in via the CLI)
 * @param {object} [processEnv] Process env object (environment variables from process.env)
 */
const config = ({ mode = 'none' }, processEnv = {}) => ({
  name: 'server',
  mode,
  target: 'node',
  entry: paths.src + 'index.ts',
  devtool: 'source-map',
  externals: [nodeExternals()],
  output: {
    path: paths.dist,
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TSConfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
  },
  context: paths.src,
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin({
      sourceMap: true,
    })],
    noEmitOnErrors: true,
    nodeEnv: 'production',
    occurrenceOrder: true,
    providedExports: true,
    usedExports: true,
    sideEffects: true,
  },
  module: {
    rules: [
      {
        test: /\.xml$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts?$/,
        include: paths.src,
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
    new IgnorePlugin({
      contextRegExp: /@nestjs/,
      resourceRegExp: new RegExp(nestIgnore.join('|')),
    }),
  ],
  node: {
    __dirname: false,
  },
});

module.exports = {
  config,
  paths,
};
