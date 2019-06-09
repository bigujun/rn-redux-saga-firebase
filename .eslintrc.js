module.exports = {
  extends: "imbudhiraja/react-native",
  rules: {
    camelcase: "off",
    "class-methods-use-this": "off",
    "filenames/match-exported": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "ignore" }
    ]
  }
};
