module.exports = {
  extends: 'airbnb',
  globals: {
    jQuery: false,
    document: false,
    window: false,
    Image: false,
  },
  rules: {
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
  }
}
