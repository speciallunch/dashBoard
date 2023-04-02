const {
  override,
  addWebpackAlias,
  addWebpackModuleRule,
  babelExclude,
} = require("customize-cra");
const path = require("path");

// https://github.com/arackaf/customize-cra/blob/master/api.md
module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  }),
  addWebpackModuleRule({
    test: /\.s[ac]ss$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader" },
      { loader: "sass-loader" },
    ],
  }),
  babelExclude([/node_modules/])
);
