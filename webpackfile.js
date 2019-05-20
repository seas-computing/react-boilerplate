const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const client = {
  name: 'client',
  entry: ['./src/client/index.js'],
  output: {
    path: resolve(__dirname, 'build/static'),
    filename: 'app.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
      },
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Docker App',
      template: 'index.html',
    }),
  ],
};

const server = {
  name: 'server',
  entry: [
    './src/server/index.ts',
  ],
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', 'tsx', '.js'],
  },
  target: 'node',
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
      },
    },
    ],
  },
  node: {
    __dirname: false,
  },
};

module.exports = [client, server];
