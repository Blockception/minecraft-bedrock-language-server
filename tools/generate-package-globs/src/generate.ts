/**
 * Generates (or validates) the `jsonValidation` section of
 * `ide/vscode/package.json` from the typed config in `schema-mappings.ts`.
 *
 * Usage:
 *   tsx ./src/generate.ts           – write generated output to package.json
 *   tsx ./src/generate.ts --check   – exit non-zero if output is stale
 *
 * The script is also exposed as npm scripts in this package:
 *   npm run generate -w generate-package-globs
 *   npm run check    -w generate-package-globs
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCHEMA_MAPPINGS, PackEntry, SchemaMappingEntry } from './schema-mappings.js';

// ── Pack prefix tables ────────────────────────────────────────────────────────

const RP_PREFIXES = [
  'resource_packs/*',
  '*resource*pack*',
  '*Resource*Pack*',
  '*RP*',
  '*rp*',
] as const;

const RP_PREFIXES_NO_SUBFOLDER = [
  'resource_packs',
  '*resource*pack*',
  '*Resource*Pack*',
  '*RP*',
  '*rp*',
] as const;

const BP_PREFIXES = [
  'behavior_packs/*',
  '*behavior*pack*',
  '*Behavior*Pack*',
  '*BP*',
  '*bp*',
] as const;

const BP_PREFIXES_NO_SUBFOLDER = [
  'behavior_packs',
  '*behavior*pack*',
  '*Behavior*Pack*',
  '*BP*',
  '*bp*',
] as const;

// ── fileMatch expansion ───────────────────────────────────────────────────────

/**
 * Expands a PackEntry into its full fileMatch array by applying each pack
 * prefix to the shallow (and optionally deep) path, then appending any extra
 * and negate patterns.
 */
function expandPackEntry(entry: PackEntry): string[] {
  const useSubfolder = entry.packSubfolder !== false;

  const prefixes: readonly string[] =
    entry.pack === 'rp'
      ? useSubfolder
        ? RP_PREFIXES
        : RP_PREFIXES_NO_SUBFOLDER
      : useSubfolder
        ? BP_PREFIXES
        : BP_PREFIXES_NO_SUBFOLDER;

  const patterns: string[] = [];

  for (const prefix of prefixes) {
    patterns.push(`${prefix}/${entry.shallowPath}`);
  }

  if (entry.deepPath !== undefined) {
    for (const prefix of prefixes) {
      patterns.push(`${prefix}/${entry.deepPath}`);
    }
  }

  if (entry.extra) {
    patterns.push(...entry.extra);
  }

  if (entry.negate) {
    patterns.push(...entry.negate);
  }

  return patterns;
}

/** Converts a single SchemaMappingEntry into a jsonValidation object. */
function toJsonValidation(entry: SchemaMappingEntry): { fileMatch: string[]; url: string } {
  if (entry.type === 'simple') {
    return { fileMatch: [...entry.fileMatch], url: entry.url };
  }
  return { fileMatch: expandPackEntry(entry), url: entry.url };
}

/** Generates the full jsonValidation array from the schema mappings. */
function generateJsonValidation(): { fileMatch: string[]; url: string }[] {
  return SCHEMA_MAPPINGS.map(toJsonValidation);
}

// ── File I/O ──────────────────────────────────────────────────────────────────

const PACKAGE_JSON_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../ide/vscode/package.json',
);

interface PackageJson {
  contributes?: {
    jsonValidation?: unknown[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

function readPackageJson(): PackageJson {
  const raw = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
  return JSON.parse(raw) as PackageJson;
}

function serialise(data: unknown): string {
  // Match the 2-space indentation used by the rest of package.json and append
  // a trailing newline to satisfy editors that require it.
  return JSON.stringify(data, null, 2) + '\n';
}

// ── Main ──────────────────────────────────────────────────────────────────────

const CHECK_MODE = process.argv.includes('--check');

const generated = generateJsonValidation();
const pkg = readPackageJson();

// Ensure the contributes section exists.
if (!pkg.contributes) {
  pkg.contributes = {};
}
pkg.contributes.jsonValidation = generated;

const newContent = serialise(pkg);

if (CHECK_MODE) {
  const currentContent = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
  if (currentContent !== newContent) {
    console.error(
      'ERROR: ide/vscode/package.json jsonValidation is out of date.\n' +
        'Run `npm run generate -w generate-package-globs` to regenerate it.',
    );
    process.exit(1);
  }
  console.log('OK: ide/vscode/package.json jsonValidation is up to date.');
} else {
  fs.writeFileSync(PACKAGE_JSON_PATH, newContent, 'utf8');
  console.log(`Written ${generated.length} jsonValidation entries to ${PACKAGE_JSON_PATH}`);
}
