module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-underscore-dangle": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "no-param-reassign": 0,
    "no-use-before-define": [2, { functions: false }],
    "react/state-in-constructor": 0,
    "no-alert": 0,
    "no-restricted-globals": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-case-declarations": 0,
    "react/require-default-props": 0,
    "react/jsx-wrap-multilines": 0,
    "react/jsx-props-no-spreading": 0,
  },
};
