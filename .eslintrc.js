module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential",
    'plugin:vue/recommended'],
  rules: {
    //"prettier/prettier": "error",
    //"no-mixed-spaces-and-tabs": 0, // disable rule
    //"no-tabs": 0, // disable rule
    //indent: 0, // disable rule
    //"vue/html-indent": 0, // disable rule
    //"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    //"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
