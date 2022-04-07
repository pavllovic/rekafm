const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MediaQueryPlugin = require('media-query-plugin');

const miniCssExtractPluginLoader = () => {
  return {
    loader: MiniCssExtractPlugin.loader
  }
};

const mediaQueryPlugin = () => {
  return {
    loader: MediaQueryPlugin.loader
  }
};

const jsLoader = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        configFile: path.resolve(__dirname, '../babel.config.js')
      }
    }
  }
};

const cssLoader = (isDev, env) => {
  return {
    loader: 'css-loader',
    options: {
      modules: false,
      importLoaders: 1,
      sourceMap: (!isDev || env.WEBPACK_BUILD) ? false : true
    }
  }
};

const postcssLoader = (isDev, env) => {
  return {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: path.resolve(__dirname, '../postcss.config.js')
      },
      sourceMap: (!isDev || env.WEBPACK_BUILD) ? false : true
    }
  }
};

// const sassLoader = () => {
//   return {
//     loader: 'sass-loader',
//     options: {
//       sourceMap: true,
//       // sassOptions: {
//       //   fiber: false,
//       // },
//     }
//   }
// };

const stylesLoaders = (isDev, env) => {
  return {
    test: /\.(sa|sc|c)ss$/,
    use: [
      miniCssExtractPluginLoader(),
      cssLoader(isDev, env),
      mediaQueryPlugin(),
      postcssLoader(isDev, env),
      // sassLoader()
    ]
  }
};

const pugLoader = () => {
  return {
    test: /\.pug$/,
    loader: 'pug3-loader',
    options: {
      pretty: true,
    }
  }
};

module.exports = (isDev, env) => {
  let webpackLoadersConfig = [
    stylesLoaders(isDev, env),
    jsLoader(),
    pugLoader(),
  ];

  return webpackLoadersConfig; 
}