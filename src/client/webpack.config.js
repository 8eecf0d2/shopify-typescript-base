const path = require("path");
const spaPlugin = require("webpack-serve-spa-plugin");
const dotenvPlugin = require("webpack-dotenv-plugin");

module.exports = {
  target: "web",
  devtool: "source-map",
  mode: process.env.MODE,
  entry: { client: path.join(__dirname, "./ts/index.ts") },
  resolve: { extensions: [ ".js", ".jsx", ".ts", ".tsx" ], },
  output: {
    path: path.join(__dirname, "../../.webpack"),
    filename: "[name].js"
  },
  plugins: [
    new dotenvPlugin({
      sample: ".env.example",
      path: ".env",
    })
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }]
  }
}

if(process.env.WEBPACK_SERVE) {
  module.exports.serve = {
    port: 3000,
    content: [path.join(__dirname, "./html")],
    add: (app) => spaPlugin(app),
  }
}
