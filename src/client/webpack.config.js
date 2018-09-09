const path = require("path");
const webpack = require("webpack");
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = [{
  entry: { bundle: "./src/client/ts/index.ts" },
  devtool: "source-map",
  mode: process.env.MODE || process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin([
      {
        from: './src/client/css/highlight.css',
        to: 'dist/highlight.css',
        toType: 'file',
        transform (content, path) {
          const text = Buffer.from(content)
            .toString('utf8')
            // replace comments, new lines, tabs
            .replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "")
            // replace left hand spaces
            .replace(/ {2,}/g, " ")
            // replace spaces "{ prop:value; } {"
            .replace(/ ([{:}]) /g, "$1")
            // replace spaces "prop:value; prop:"
            .replace(/([;,]) /g, "$1")
            // replace spaces "prop: value"
            .replace(/([:,]) /g, "$1")

          return Buffer.from(text)
        }
      }
    ])
  ],
  resolve: {
    extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
  },
  output: {
    path: path.resolve(__dirname, "../../"),
    filename: "./dist/[name].js",
  }
}];
