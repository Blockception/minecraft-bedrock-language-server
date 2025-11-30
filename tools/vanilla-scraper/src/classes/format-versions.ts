import * as path from 'path';
import { load } from '../static/json';
import { saveSingle } from '../static/typescript';
import { Context } from './context';

/**
 * Format version data
 */
interface FormatVersion {
  version: string;
}

/**
 * Output format version data
 */
interface OutputFormatVersion {
  latest: string;
  versions: string[];
}

/**
 * Get format versions from metadata
 */
export function getVersions(context: Context, output: string): void {
  const filepath = path.join(context.githubFolder, 'version.json');

  const versions = load<Record<string, FormatVersion>>(filepath);
  if (!versions) return;

  const latest = versions['latest'];
  delete versions['latest'];

  const result: OutputFormatVersion = {
    latest: latest.version,
    versions: Object.keys(versions),
  };

  saveSingle('FormatVersionData', './general', 'Versions', result, path.join(output, 'versions.ts'));
}
