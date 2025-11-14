import * as fs from 'fs';
import * as path from 'path';
import { Context } from './context.js';

const EXCLUDE = ['manifest.json', 'behavior_trees', 'contents.json'];

/**
 * Generate GitHub links file
 */
export function generateGithubLinks(context: Context, outputFolder: string): void {
  const folder = context.githubFolder;
  const files = findJsonFilesRecursive(folder);
  const items: string[] = [];

  for (const file of files) {
    if (isExcluded(file)) continue;

    const type = getPackType(file);
    if (!type) continue;

    // Transform filepath to github raw link
    const link = file.replace(folder, '').replace(/\\/g, '/');
    items.push(link);
  }

  items.sort();

  const filepath = path.join(outputFolder, 'Vanilla', 'sources.ts');
  const lines: string[] = [];

  lines.push('export const GithubFiles = {');
  lines.push('  source: "https://raw.githubusercontent.com/Mojang/bedrock-samples/main/",');
  lines.push('  files: [');

  for (const link of items) {
    lines.push(`    "${link.replace(/^\//, '')}",`);
  }

  lines.push(']};');

  fs.writeFileSync(filepath, lines.join('\n'), 'utf-8');
}

function findJsonFilesRecursive(directory: string): string[] {
  const results: string[] = [];

  if (!fs.existsSync(directory)) {
    return results;
  }

  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filepath = path.join(directory, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      results.push(...findJsonFilesRecursive(filepath));
    } else if (file.endsWith('.json')) {
      results.push(filepath);
    }
  }

  return results;
}

function isExcluded(filepath: string): boolean {
  for (const exclude of EXCLUDE) {
    if (filepath.includes(exclude)) {
      return true;
    }
  }
  return false;
}

function getPackType(filepath: string): string | null {
  if (filepath.includes('behavior_pack')) {
    return 'behavior_pack';
  }

  if (filepath.includes('resource_pack')) {
    return 'resource_pack';
  }

  return null;
}
