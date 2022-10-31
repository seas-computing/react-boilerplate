const client = require('./src/client/webpack.config');
const server = require('./src/server/webpack.config');
const { HotModuleReplacementPlugin } = require('webpack');

const {
  SERVER_PORT = 3000,
} = process.env;

/**
 * Watch settings are the same between client and server, so we're keeping them
 * here for consistency
 */
const watchConfig = {
  watchOptions: {
    ignored: /node_modules/,
  },
};

/**
* Webpack Dev Server Config
*
* This webpack configuration somewhat mimics `webpack.config.js`, but also
* provides live reloading for the client side code and hot module replacement
* for the server-side code
*
* @param {object} env Webpack `env` object
*/
module.exports = ({ mode = 'development' } = {}) => ([
  {
    ...client.config({ mode }, process.env),
    ...watchConfig,
    devtool: 'cheap-eval-source-map',
    entry: [
      'react-hot-loader/patch',
      client.config({ mode }, process.env).entry,
    ],
    devServer: {
      staticOptions: {
        directory: client.paths.dist.app,
      },
      overlay: {
        errors: true,
        warnings: true,
      },
      historyApiFallback: {
        rewrites: [
          { from: /./, to: '/index.html' },
        ],
      },
      port: 8000,
      host: '0.0.0.0',
      hot: true,
      hotOnly: true,
      serveIndex: false,
      proxy: {
        '/api': `http://localhost:${SERVER_PORT}`,
      },
      disableHostCheck: true,
    },
  },
  {
    ...server.config({ mode }, process.env),
    ...watchConfig,
    plugins: [
      ...server.config({ mode }, process.env).plugins,
      new HotModuleReplacementPlugin(),
    ],
  },
]);
