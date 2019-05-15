const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const client = {
  name: 'client',
  entry: ['./src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build/static'),
    filename: 'app.js',
    publicPath: '/static/',
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
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
    './src/server/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
  },
  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    ],
  },
  node: {
    __dirname: false,
  },
};

module.exports = [client, server];
