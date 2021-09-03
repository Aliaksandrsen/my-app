module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'import/prefer-default-export': 'off',
  },
};
