//@ts-check
'use strict';

const path = require('path');
const webpack = require('webpack');

/**
 * Server config (Node)
 */
export default {
  name: 'server',
  target: 'node', // bundle for Node.js
  entry: './src/server.ts',
  output: {
    path: path.resolve(__dirname, 'lsp'),
    filename: 'server.js',
    clean: true, // wipe old files each build
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode',
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' },
      { test: /\.json$/, type: 'javascript/auto', use: 'json-loader' },
    ],
  },
};
