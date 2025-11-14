import * as fs from 'fs';
import * as path from 'path';
import { Context } from './context.js';
import { readJsonFile } from './utils.js';

interface FormatVersion {
  version: string;
}

interface OutputFormatVersion {
  latest: string;
  versions: string[];
}

/**
 * Extract format versions from version.json
 */
export function getFormatVersions(context: Context, outputFolder: string): void {
  const filepath = path.join(context.githubFolder, 'version.json');

  if (!fs.existsSync(filepath)) {
    console.log('version.json not found, skipping format versions');
    return;
  }

  const data = readJsonFile<Record<string, FormatVersion>>(filepath);
  if (!data) return;

  const latest = data.latest;
  delete data.latest;

  const result: OutputFormatVersion = {
    latest: latest.version,
    versions: Object.keys(data).sort(),
  };

  const outputPath = path.join(outputFolder, 'versions.ts');
  const lines: string[] = [];

  lines.push('/** Notice: Auto generated file, do not edit */\n');
  lines.push(`import { FormatVersionData } from './general';\n\n`);
  lines.push(`export const Versions: FormatVersionData = `);
  lines.push(JSON.stringify(result, null, 2));

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
}
