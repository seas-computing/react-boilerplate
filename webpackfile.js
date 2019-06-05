const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
/**
 * NestJs uses a custom wrapper around require() for allows it to show a
 * warning when some extra package needs to be installed. This causes problems
 * with webpack, so we're blacklisting packages we're not using with the
 * IgnorePlugin below.
 *
 * To de-blacklist a package, just remove it from this array.
 */
const nestBlacklist = [
  '^class-validator$',
  '^class-transformer$',
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

const client = {
  name: 'client',
  mode: 'none',
  entry: ['./src/client/index.ts'],
  output: {
    path: resolve(__dirname, 'build/static'),
    filename: 'app.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TSConfigPathsPlugin(),
    ],
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: resolve(__dirname, 'src/client'),
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      name: true,
      cacheGroups: {
        assets: {
          test: /node_modules/,
          filename: '[name].app.js',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: process.env.APP_NAME,
    }),
    new HtmlWebpackRootPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};

const server = {
  name: 'server',
  mode: 'none',
  entry: ['./src/server/index.ts'],
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TSConfigPathsPlugin(),
    ],
  },
  externals: [
  ],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: resolve(__dirname, 'src/server'),
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      name: true,
      cacheGroups: {
        assets: {
          test: /node_modules/,
          chunks: 'all',
          filename: '[name].server.js',
        },
      },
    },
  },
  plugins: [
    new webpack.IgnorePlugin({
      contextRegExp: /@nestjs/,
      resourceRegExp: new RegExp(nestBlacklist.join('|')),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  node: {
    __dirname: false,
  },
};

module.exports = [client, server];
