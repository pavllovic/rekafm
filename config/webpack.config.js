const path = require('path');
const webpackAssetsConfig = require('./webpackAssets/webpackAssets.config.js');
const webpackLoadersConfig = require('./webpackLoaders/webpackLoaders.config.js');
const webpackPluginsConfig = require('./webpackPlugins/webpackPlugins.config.js');
const webpackDevServerConfig = require('./webpackDevServer/webpackDevServer.config.js');
const webpackResolveConfig = require('./webpackResolve/webpackResolve.config.js');
const optimization = require('./webpackOptimization/optimization.config');

const entry = {
  common: './asset/common.js',
  index: './asset/index.js',
  audit_emergency_management: './asset/audit.emergency.management.js',
  _404: './asset/_404.js',
  privacy: './asset/privacy.js',
  service: './asset/service.js',
  news_list: './asset/news_list.js',
  news: './asset/news.js',
  commerce: './asset/commerce.js',
  build: './asset/build.js',
}

const devOutput = {
  path: path.resolve(__dirname, '../build'),
  chunkFilename: 'asset/js/[name].js',
  filename: 'asset/js/[name].js',
  assetModuleFilename: '[file]'
}

const prodOutput = {
  path: path.resolve(__dirname, '../dist'),
  clean: true,
  chunkFilename: 'asset/js/[name].js',
  filename: 'asset/js/[name].js',
  assetModuleFilename: '[path]/[name][ext]'
}

module.exports = (env) => {
  const isDev = process.env.NODE_ENV === 'development';
  return {
    mode: isDev ? 'development' : 'production',
    entry: entry,
    output: isDev ? devOutput : prodOutput,
    module: {
      rules: [
        ...webpackAssetsConfig,
        ...webpackLoadersConfig(isDev, env)
      ]
    },
    plugins: [
      ...webpackPluginsConfig(isDev, env)
    ],
    devServer: webpackDevServerConfig,
    resolve: webpackResolveConfig,
    devtool: (!isDev || env.WEBPACK_BUILD) ? false : 'source-map',
    cache: isDev ? true : false,
    optimization: optimization(isDev),
  }
}