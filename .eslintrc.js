module.exports = {
  env: {
    browser: false,
    es6: true,
    node: false,
    "react-native/react-native": true
  },
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "eslint-config-prettier"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier", "react", "react-native"],
  parser: "babel-eslint",
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,
    "react/forbid-prop-types": "off",
    "react/require-default-props": "off",
    "react/destructuring-assignment": "off",
    "import/prefer-default-export": "off"
  }
};
