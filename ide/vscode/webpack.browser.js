//@ts-check
'use strict';

const path = require('path');

/**
 * @param {{ entry: string, filename: string, libraryTarget: string, library?: string }} opts
 * @returns {import('webpack').Configuration}
 */
function makeBrowserConfig({ entry, filename, libraryTarget, library }) {
  return {
    context: path.join(__dirname),
    mode: 'none',
    target: 'webworker', // web extensions run in a webworker context

    entry,
    output: {
      path: path.resolve(__dirname, 'lsp'),
      filename,
      libraryTarget,
      ...(library ? { library } : {}),
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
}

module.exports = [
  makeBrowserConfig({
    entry: './src/client.browser.ts',
    filename: 'client.browser.js',
    libraryTarget: 'commonjs',
  }),
  makeBrowserConfig({
    entry: './src/server.browser.ts',
    filename: 'server.browser.js',
    libraryTarget: 'var',
    library: 'serverExportVar',
  }),
];
