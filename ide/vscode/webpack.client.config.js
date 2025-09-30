//@ts-check
'use strict';

const path = require('path');
const webpack = require('webpack');

export default {
  name: 'client',
  target: 'node', // bundle for the browser
  entry: './src/client.ts',
  output: {
    path: path.resolve(__dirname, 'lsp'),
    filename: 'client.js',
    clean: true,
    libraryTarget: 'commonjs2', // vscode requires CJS exports
  },
  devtool: 'source-map',
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [{ test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' }],
  },
  externals: {
    vscode: 'commonjs vscode',
  },
  optimization: {
    usedExports: true,
    concatenateModules: true,
    splitChunks: false,
    minimize: true,
  },
};
