const path = require("path");
const webpack = require("webpack");
const uglifyJSPlugin = require("uglifyjs-webpack-plugin");
const bundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: { bundle: "./src/client/ts/index.ts" },
  devtool: "source-map",
  mode: process.env.MODE || process.env.NODE_ENV,
  plugins: [
    new bundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "./dist/webpack-report.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ]
  },
  optimization: {
    minimizer: [
      new uglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          output: { ascii_only: true }
        }
      })
    ]
  },
  resolve: {
    extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
  },
  output: {
    path: path.resolve(__dirname, "../../"),
    filename: "./dist/[name].js",
  }
};
