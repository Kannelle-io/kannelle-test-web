const { override, addWebpackResolve, useBabelRc, addLessLoader, addWebpackPlugin } = require('customize-cra');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  webpack: override(
    addWebpackResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    useBabelRc(),
    addLessLoader({
      // If you are using less-loader@5 please spread the lessOptions to options directly
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#3371FF', '@text-color-secondary': '#7E8AAA', '@info-color': '#1890ff' },
    }),
    !isDevelopment &&
      addWebpackPlugin(
        new SentryWebpackPlugin({
          authToken: process.env.REACT_APP_SENTRY_SOURCEMAP_TOKEN,
          release: process.env.REACT_APP_VERSION,
          org: process.env.REACT_APP_SENTRY_ORG,
          project: process.env.REACT_APP_SENTRY_PROJECT,
          include: '.',
          ignore: ['node_modules', 'config-overrides.js', 'commitlint.config.js'],
        })
      )
  ),
};
