
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/main.js",
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  optimization: {
    minimize: false,
  },
  module: {
    rules: [],
  },
};