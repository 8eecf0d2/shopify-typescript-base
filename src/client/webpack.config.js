const path = require("path");
const dotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  target: "web",
  devtool: "source-map",
  mode: process.env.MODE,
  entry: { client: "./src/client/ts/index.ts" },
  resolve: { extensions: [ ".js", ".jsx", ".ts", ".tsx" ], },
  output: {
    path: path.resolve(__dirname, "../../.webpack"),
    filename: "[name].js"
  },
  plugins: [
    new dotenvPlugin({
      sample: '.env.example',
      path: '.env',
    })
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }]
  }
};
