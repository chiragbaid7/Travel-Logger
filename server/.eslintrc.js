module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: { 
  "linebreak-style": 0,
  "eslint linebreak-style": [0, "error", "windows"],
  "no-console": "off",
  },
};
