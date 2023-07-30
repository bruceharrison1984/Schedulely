module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'turbo',
    'prettier',
  ],
  plugins: ['sort-imports-es6-autofix', '@typescript-eslint', 'unused-imports'],
  rules: {
    'react/jsx-key': 'off',
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
};
