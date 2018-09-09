const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: { database: "./src/database/ts/index.ts" },
  devtool: "source-map",
  mode: process.env.MODE || process.env.NODE_ENV,
  target: "node",
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [ ".ts", ".js" ],
  },
  output: {
    path: path.resolve(__dirname, "../../"),
    filename: "./dist/[name].js",
  }
};
