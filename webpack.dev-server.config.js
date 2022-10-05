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
* Development Webpack Build File
*
* This webpack configuration extends `webpack.config.js` and builds on it to
* provide hot module replacement, watch moide and a dev server for the
* client-side code
*
* Other dev tools such as watching, hot module reloading etc. has been split
* out into other config files
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
