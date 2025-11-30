import * as fs from 'fs';
import * as path from 'path';
import * as json from './json';

/**
 * Delegate type for converting JSON document to output items
 */
export type ConvertJson<T> = (doc: object, receiver: T[]) => void;

/**
 * Delegate type for converting file to output items
 */
export type ConvertFile<T> = (filepath: string, receiver: T[]) => void;

/**
 * Process all JSON files in a folder with a JSON converter
 */
export function fromFolderJson<T>(func: ConvertJson<T> | null, receiver: T[], folder: string): void {
  if (func === null || !fs.existsSync(folder)) {
    return;
  }

  const files = getJsonFilesRecursively(folder);

  for (const filepath of files) {
    fromFileJson(func, receiver, filepath);
  }
}

/**
 * Process all JSON files in a folder with a file converter
 */
export function fromFolderFile<T>(func: ConvertFile<T> | null, receiver: T[], folder: string): void {
  if (func === null || !fs.existsSync(folder)) {
    return;
  }

  console.log('::group::' + folder);
  const files = getJsonFilesRecursively(folder);

  for (const filepath of files) {
    try {
      func(filepath, receiver);
    } catch (ex) {
      console.error(`::error file=${filepath},line=0,col=0,endColumn=0::${ex}`);
    }
  }

  console.log('::endgroup::' + folder);
}

/**
 * Process a single file with a file converter
 */
export function fromFileFile<T>(func: ConvertFile<T> | null, receiver: T[], filepath: string): void {
  try {
    if (func !== null && fs.existsSync(filepath)) {
      func(filepath, receiver);
    }
  } catch (ex) {
    console.error(`::error file=${filepath},line=0,col=0,endColumn=0::${ex}`);
  }
}

/**
 * Process a single file with a JSON converter
 */
export function fromFileJson<T>(func: ConvertJson<T>, receiver: T[], filepath: string): void {
  try {
    const doc = json.getDoc(filepath);
    if (doc !== null) {
      func(doc, receiver);
    }
  } catch (ex) {
    console.error(`::error file=${filepath},line=0,col=0,endColumn=0::${ex}`);
  }
}

/**
 * Get all JSON files recursively from a folder
 */
function getJsonFilesRecursively(folder: string): string[] {
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
