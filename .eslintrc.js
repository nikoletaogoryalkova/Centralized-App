module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
      "modules": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-console": 0,
    "disallowMultipleVarDecl": 0,
    "maximumLineLength": 90,
    "indent": [
      "warn", 2, { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "react/jsx-pascal-case": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/href-no-hash": "off",
    "no-unused-vars": "warn"
  }
}