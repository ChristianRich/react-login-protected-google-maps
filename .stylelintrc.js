module.exports = {
  extends: 'stylelint-config-recommended-scss',
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    'unit-blacklist': ['rem', 'em', 'pt', 'cm', 'ex', 'in', 'mm', 'pc'],
    'plugin/no-unsupported-browser-features': [
      true,
      { severity: 'warning' },
      {
        browsers: ['> 0.5%', 'ie 11'],
      },
    ],
  },
}
