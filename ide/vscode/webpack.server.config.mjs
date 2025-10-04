//@ts-check
'use strict';

import path from 'path';
import webpack from 'webpack';

export default {
  name: 'server',
  target: 'node', // bundle for Node.js
  entry: './src/server.ts',
  optimization: {},
  output: {
    path: path.resolve('./lsp'),
    filename: 'server.js',
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
