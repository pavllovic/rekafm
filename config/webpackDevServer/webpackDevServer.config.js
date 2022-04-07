const webpackDevServerConfig = {
  hot: true,
  // liveReload: true,
  open: true,
  port: 8080,
  client: {
    logging: 'info',
    progress: true,
    overlay: {
      errors: true,
      // warnings: true,
    },
  },
}

module.exports = webpackDevServerConfig;