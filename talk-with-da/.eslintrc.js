module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "no-use-before-define": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "no-unused-vars": "off",
    "no-new": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/semi": ["error", "never"],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
        "printWidth": 100,
        "semi": false,
        "singleQuote": true,
        "trailingComma": "es5"
      }
    ],
  },
};
