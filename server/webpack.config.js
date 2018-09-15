const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  target: "node",
  devtool: "source-map",
  mode: process.env.MODE,
  entry: Object.keys(slsw.lib.entries).length > 0 ? slsw.lib.entries : "./src/index.ts",
  resolve: { extensions: [".js", ".ts"] },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }]
  }
};
