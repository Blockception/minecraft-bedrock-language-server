import * as fs from 'fs';
import * as path from 'path';

const _exclude = ['manifest.json', 'behavior_trees', 'contents.json'];

/**
 * Generate GitHub links file from scraped files
 */
export function githubLinks(githubFolder: string, outputFolder: string): void {
  const files = getAllJsonFiles(githubFolder);
  const items: string[] = [];

  for (const file of files) {
    if (isExcluded(file)) continue;

    const type = packType(file);
    if (type === null) continue;

    // Transform filepath to github raw link
    const link = file.replace(githubFolder, '').replace(/\\/g, '/');
    items.push(link);
  }

  items.sort();

  const filepath = path.join(outputFolder, 'Vanilla', 'sources.ts');
  let content = 'export const GithubFiles = {\n';
  content += '  source: "https://raw.githubusercontent.com/Mojang/bedrock-samples/main/",\n';
  content += '  files: [\n';

  for (const link of items) {
    content += `    "${link.replace(/^\//, '')}",\n`;
  }

  content += ']};\n';

  fs.writeFileSync(filepath, content, 'utf-8');
}

/**
 * Check if path should be excluded
 */
function isExcluded(filePath: string): boolean {
  for (const exclude of _exclude) {
    if (filePath.includes(exclude)) {
      return true;
    }
  }
  return false;
}

/**
 * Get pack type from path
 */
function packType(filePath: string): string | null {
  if (filePath.includes('behavior_pack')) {
    return 'behavior_pack';
  }
  if (filePath.includes('resource_pack')) {
    return 'resource_pack';
  }
  return null;
}

/**
 * Recursively get all JSON files in a folder
 */
function getAllJsonFiles(folder: string): string[] {
  const results: string[] = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        results.push(fullPath);
      }
    }
  }

  walk(folder);
  return results;
}
