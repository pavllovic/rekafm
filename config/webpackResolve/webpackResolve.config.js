const path = require('path');

const webpackResolveConfig = {
  alias: {
    Components: path.resolve(__dirname, '../../asset/components/'),
    Images: path.resolve(__dirname, '../../asset/images/'),
    Lib: path.resolve(__dirname, '../../asset/lib/'),
    Fonts: path.resolve(__dirname, '../../asset/fonts/'),
    BD: path.resolve(__dirname, '../../asset/data/'),
    Styles: path.resolve(__dirname, '../../asset/styles')
  }
}

module.exports = webpackResolveConfig;