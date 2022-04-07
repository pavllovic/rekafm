const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  plugins: [
    'postcss-import',
    ['postcss-preset-env', { 
        stage: 2,
        features: {
          'focus-visible-pseudo-class': false,
          'prefers-color-scheme-query': false,
          'focus-within-pseudo-class': false
        },
        preserve: true
      }
    ],
    (() => {
      if(!isDev) return 'cssnano';
    })(),
  ],
};