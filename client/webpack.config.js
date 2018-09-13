const path = require("path");
const dotenvPlugin = require('webpack-dotenv-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = {
  target: "web",
  devtool: "source-map",
  mode: process.env.MODE,
  entry: { client: "./src/ts/index.ts" },
  resolve: { extensions: [ ".js", ".jsx", ".ts", ".tsx" ], },
  output: {
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  plugins: [
    new dotenvPlugin({
      sample: '../.env.example',
      path: '../.env',
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

if(process.env.WEBPACK_SERVE) {
  module.exports.serve = {
    port: 3000,
    content: ['./src/html', './src'],
    add: (app, middleware, options) => {
      app.use(convert(history({})));
    }
  }
}

