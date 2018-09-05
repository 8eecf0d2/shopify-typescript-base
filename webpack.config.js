const path = require('path');
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = {
  entry: { bundle: './src/client/ts/index.ts' },
  devtool: 'source-map',
  mode: process.env.MODE || process.env.NODE_ENV,
  plugins: [],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
  },
  output: {
    path: path.resolve(__dirname),
    filename: './dist/[name].js',
  }
};

if(process.env.WEBPACK_SERVE) {
  module.exports.serve = {
    port: 2000,
    content: ['./src/client/html', './src/client'],
    add: (app, middleware, options) => {
      app.use(convert(history({})));
    }
  }
}
