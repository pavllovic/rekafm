const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const HtmlWebpackSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlagin = require('html-webpack-plugin');
const HtmlBeautifierPlugin = require('html-beautifier-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');

const miniCssExtractPlugin = (isDev) => {
  return new MiniCssExtractPlugin({
    filename: isDev ? 'asset/css/[name].css' : 'asset/css/[name].css',
    chunkFilename: isDev ? 'asset/css/[id].css' : 'asset/css/[id].css'
  });
};

const mediaQueryPlugin = () => {
  return new MediaQueryPlugin({
    include: [
      'common'
    ],
    queries: {
      '(min-width: 992px)': 'resize',
    }
  });
};

const copyWebpackPlugin = (isDev) => {
  const pathToCopy = 'asset/lib';
  let patterns = [];
  if(isDev) {
    patterns = [
      // {from: 'node_modules/bootstrap/dist/', to: `${pathToCopy}/bootstrap/`},
      {from: './asset/lib/ownCarousel/', to: `asset/lib/ownCarousel/`},
      // {from: 'node_modules/owl.carousel/dist/', to: `${pathToCopy}/owl.carousel/`},
      // {from: 'node_modules/jquery/dist/', to: `${pathToCopy}/jquery/`},
      // {from: 'node_modules/imask/dist/', to: `${pathToCopy}/imask/`},
      // {from: './asset/fonts/iconmoon-16.woff', to: 'asset/fonts/'},
      // {from: './asset/fonts/iconmoon-24.woff', to: 'asset/fonts/'},
      // {from: './asset/fonts/iconmoon-32.woff', to: 'asset/fonts/'},
      // {from: './asset/fonts/iconmoon-72.woff', to: 'asset/fonts/'},
      // {from: './asset/fonts/iconmoon-btn.woff', to: 'asset/fonts/'},
      {from: './asset/images/build/1/thumb/1.jpg', to: 'asset/images/build/1/thumb/1.jpg'},
    ]
  } else {
    patterns = [
      // {from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: `${pathToCopy}/bootstrap/css/bootstrap.min.css`},
      // {from: 'node_modules/owl.carousel/dist/owl.carousel.min.js', to: `${pathToCopy}/owl.carousel/owl.carousel.min.js`},
      // {from: 'node_modules/owl.carousel/dist/assets/owl.carousel.min.css', to: `${pathToCopy}/owl.carousel/assets/owl.carousel.min.css`},
      // {from: 'node_modules/jquery/dist/jquery.min.js', to: `${pathToCopy}/jquery/jquery.min.js`},
      // {from: 'node_modules/imask/dist/imask.min.js', to: `${pathToCopy}/imask/imask.min.js`},
      // {from: './asset/fonts/icon-font.woff', to: 'asset/fonts/'}
      {from: './asset/lib/ownCarousel/', to: `asset/lib/ownCarousel/`},
      {from: './asset/images/build/1/thumb/1.jpg', to: 'asset/images/build/1/thumb/1.jpg'},
    ]
  }
  return new CopyWebpackPlugin({
    patterns: patterns
  });
};

const htmlWebpackTagsPlugin = (isDev) => {
  const pathToCopy = 'asset/lib';
  return [
    // new HtmlWebpackTagsPlugin({
    //   links: [
    //     `${pathToCopy}/owl.carousel/assets/owl.carousel.min.css`
    //   ],
    //   scripts: [
    //     `${pathToCopy}/jquery/jquery.min.js`,
    //     `${pathToCopy}/owl.carousel/owl.carousel.min.js`,
    //     `${pathToCopy}/imask/imask.min.js`,
    //   ],
    //   files: isDev ? ['_html/profile.html'] : ['profile.html'],
    //   append: false
    // }),
    new HtmlWebpackTagsPlugin({
      // files: ['_html/index.html', '_html/build.html'],
      // files: ['_html/index.html'],
      // links: [
      //   `${pathToCopy}/ownCarousel/ownCarousel.css`, 
      // ],
      scripts: [
        `${pathToCopy}/ownCarousel/ownCarousel.js`
      ],
      append: false
    })
  ]
};

const ignoreEmitPlugin = () => {
  return new IgnoreEmitPlugin([
    /(uikit)\.style\.js$/, /(uikit|management|service|_404|privacy)\.js$/
  ]);
};

const htmlWebpackSkipAssetsPlugin = () => {
  return new HtmlWebpackSkipAssetsPlugin({
    excludeAssets: [
      /(uikit)\.style\.js$/, /(uikit|management|service|_404|privacy)\.js$/
    ]
  });
};

const htmlWebpackPlagin = (isDev) => {
  const pages = [
    {name: 'index', title: 'рекафм', chunks: ['common', 'index']},
    {name: 'fire_safety', title: 'рекафм | пожарная безопасность', chunks: ['common']},
    {name: 'audit', title: 'рекафм | технический аудит недвижимости', chunks: ['common', 'audit']},
    {name: 'service', title: 'рекафм | эксплуатация и техническое обслуживание недвижимости', chunks: ['common', 'service']},
    {name: 'management', title: 'рекафм | управление недвижимостью', chunks: ['common', 'management']},
    {name: 'femida', title: 'рекафм | юридическое сопровождение', chunks: ['common']},
    {name: 'emergency', title: 'рекафм | аварийно-диспетчерская служба', chunks: ['common', 'emergency']},
    {name: 'accaunting_and_hr', title: 'рекафм | клининг', chunks: ['common']},
    {name: 'cleaning', title: 'рекафм | клининг', chunks: ['common']},
    {name: '_404', title: 'рекафм | 404', chunks: ['common', '_404']},
    {name: 'privacy', title: 'рекафм | политика конфиденциальности', chunks: ['common', 'privacy']},
    {name: 'news_list', title: 'рекафм | новости', chunks: ['common', 'news_list']},
    {name: 'news', title: 'рекафм | новости', chunks: ['common', 'news']},
    {name: 'commerce', title: 'рекафм | продажа и аренда', chunks: ['common', 'commerce']},
    {name: 'build', title: 'рекафм | помещение', chunks: ['common', 'build']},
    {name: 'uikit', title: 'рекафм | uikit', chunks: ['uikit', 'common']},
  ];

  return pages.map((page) => {
    return new HtmlWebpackPlagin({
      title: page.title,
      filename: isDev ? `_html/${page.name}.html` : `${page.name}.html`,
      template: `./asset/template/${page.name}.pug`,
      // inject: 'body',
      inject: false,
      chunks: page.chunks,
      minify: {
        collapseWhitespace: !isDev,
        collapseInlineTagWhitespace: !isDev,
        removeComments: !isDev,
        minifyCSS: !isDev,
        minifyJS: !isDev,
      },
    });
  });
};

const htmlBeautifierPlugin = () => {
  return new HtmlBeautifierPlugin({
    html: {
      inline: [] 
    }
  });
};

const stylelintPlugin = () => {
  return new StylelintPlugin({
    configFile: path.resolve(__dirname, '../stylelint.config.js'),
    files: ['asset/components/**/*.css', 'asset/styles/**/*.css'],
    fix: true
  });
};

const eslintPlugin = () => {
  return new ESLintPlugin({
    files: 'asset/**/*.js',
    overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js'),
    lintDirtyModulesOnly: true
  });
};

const cleanWebpackPlugin = () => {
  return new CleanWebpackPlugin();
};

const compressionPlugin = () => {
  return new CompressionPlugin({
    test: [/\.js$/i, /\.css$/i]
  });
}; 

module.exports = (isDev, env) => {
  let webpackPluginsConfig = [
    miniCssExtractPlugin(isDev),
    // mediaQueryPlugin(),
    copyWebpackPlugin(isDev),
    ...htmlWebpackPlagin(isDev),
    ...htmlWebpackTagsPlugin(isDev),
    stylelintPlugin(),
    eslintPlugin(),
    cleanWebpackPlugin(),
  ]

  if(isDev) {
    webpackPluginsConfig = webpackPluginsConfig.concat([
      htmlBeautifierPlugin(),
    ])
  }

  if(!isDev || env.WEBPACK_BUILD) {
    webpackPluginsConfig = webpackPluginsConfig.concat([
      ignoreEmitPlugin(),
      htmlWebpackSkipAssetsPlugin()
    ])
  }

  if(!isDev) {
    webpackPluginsConfig = webpackPluginsConfig.concat([
      compressionPlugin()
    ])
  }

  return webpackPluginsConfig;
};