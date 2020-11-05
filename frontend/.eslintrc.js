module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
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
  },
};
