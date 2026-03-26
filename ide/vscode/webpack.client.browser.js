//@ts-check
'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/
const config = {
  context: path.join(__dirname),
  mode: 'none',
  target: 'webworker', // web extensions run in a webworker context

  entry: './src/client.browser.ts',
  output: {
    path: path.resolve(__dirname, 'lsp'),
    filename: 'client.browser.js',
    libraryTarget: 'commonjs',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  devtool: 'nosources-source-map',
  externals: {
    vscode: 'commonjs vscode',
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.ts', '.js'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, use: [{ loader: 'ts-loader' }] },
    ],
  },
  performance: {
    hints: false,
  },
};
module.exports = config;
