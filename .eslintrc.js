module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'spaced-comment':0,
    'comma-spacing':0,
    'quote-props':0,
    'indent':0,
    'keyword-spacing':0,
    'vue/no-unused-vars':0,
    'no-useless-return':0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
