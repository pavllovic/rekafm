module.exports = (isDev) => {
  const optimization = {
    minimize: isDev ? false : true,
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       name: 'vendors',
    //       test: /[\\/]node_modules[\\/]/,
    //       chunks: 'all',
    //       enforce: true,
    //     },
    //   },
    // },
  }

  return optimization;
}