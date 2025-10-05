#!/usr/bin/env node
import { build } from 'esbuild';
import path from 'path';

const root = path.resolve('./');
const outdir = path.resolve(root, 'lsp');

async function buildServer() {
  await build({
    entryPoints: ['./src/server.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: ['node24'],
    sourcemap: true,
    outfile: path.join(outdir, 'server.js'),
    external: ['vscode'],
    tsconfig: path.join(root, 'tsconfig.json'),
    logLevel: 'info',
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    treeShaking: true,
  });
}

async function buildClient() {
  await build({
    entryPoints: ['./src/client.ts'],
    bundle: true,
    platform: 'node', // keep node for commonjs compatibility
    format: 'cjs',
    target: ['node24'],
    sourcemap: true,
    outfile: path.join(outdir, 'client.js'),
    external: ['vscode'],
    tsconfig: path.join(root, 'tsconfig.json'),
    logLevel: 'info',
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    treeShaking: true,
  });
}

async function main() {
  try {
    await buildServer();
    await buildClient();
    // exit cleanly
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1] && process.argv[1].endsWith('esbuild.build.mjs')) {
  main();
}

export default { buildServer, buildClient };
