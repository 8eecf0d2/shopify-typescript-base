const path = require('path');
const webpack = require('webpack');

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
