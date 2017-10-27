module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/flowtype', 'prettier/react'],
  plugins: ['flowtype'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'react/no-danger': 0,
    'react/prop-types': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        specialLink: ['to']
      }
    ]
  },
  globals: {
    graphql: false,
    __PATH_PREFIX__: false,
    __PREFIX_PATHS__: false
  }
}
