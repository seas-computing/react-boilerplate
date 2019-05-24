const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');

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
  mode: 'production',
  entry: ['./src/client/index.ts'],
  output: {
    path: resolve(__dirname, 'dist/static'),
    filename: 'app.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
      },
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: process.env.APP_NAME,
    }),
    new HtmlWebpackRootPlugin(),
  ],
};

const server = {
  name: 'server',
  mode: 'production',
  entry: ['./src/server/index.ts'],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  externals: [
  ],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      contextRegExp: /@nestjs/,
      resourceRegExp: new RegExp(nestBlacklist.join('|')),
    }),
  ],
  node: {
    __dirname: false,
  },
};

module.exports = [client, server];
