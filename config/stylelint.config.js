module.exports = {
  "extends": [
    "stylelint-config-standard-scss",
    'stylelint-config-idiomatic-order'
  ],
  plugins: [],
  rules: {
    'color-function-notation': 'legacy',
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'declaration-block-no-redundant-longhand-properties': null
  }
}