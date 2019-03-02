// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = {
  entry: "./src/index.ts",

  output: {
    filename: "./dist/bundle.js"
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "awesome-typescript-loader"
      }
    ]
  },

  plugins: [new CheckerPlugin(), new webpack.HotModuleReplacementPlugin()]
};
