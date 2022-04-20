module.exports = {
  env: { node: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js', 'jest.config.js', 'tsup.config.js', 'dist/'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'jest', 'prettier'],
  overrides: [
    {
      files: ['**/*.spec.*', '**/*.test.*'],
      plugins: ['jest'],
      rules: {
        // turn the original rule off for test files
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
    },
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 2,
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowTernary: true },
    ],
    '@typescript-eslint/no-floating-promises': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '_', varsIgnorePattern: '_' },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/restrict-template-expressions': ['off'],
    '@typescript-eslint/unbound-method': 'error',
    'comma-dangle': ['error', 'only-multiline'],
    'function-paren-newline': 'off',
    'generator-star-spacing': 'off',
    'global-require': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': ['off'],
    'import/prefer-default-export': 'off',
    'jest/expect-expect': ['error', { assertFunctionNames: ['expect*'] }],
    'jest/no-mocks-import': 'off',
    'max-params': 2,
    'no-alert': 'error',
    'no-console': 'error',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'prefer-destructuring': ['error', { array: false, object: true }],
    'prettier/prettier': ['error'],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': ['error', { declaration: 'ignore' }],
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': [2, { ignoreFunctionalComponents: true }],
    'react/static-property-placement': ['error', 'static public field'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
