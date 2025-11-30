import * as fs from 'fs';
import * as path from 'path';

export interface JsonDocumentOptions {
  allowTrailingCommas?: boolean;
  skipComments?: boolean;
}

const defaultReadOptions: JsonDocumentOptions = {
  allowTrailingCommas: true,
  skipComments: true,
};

/**
 * Load and parse a JSON file
 */
export function load<T>(filepath: string): T | null {
  if (!fs.existsSync(filepath)) {
    return null;
  }

  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    // Remove comments and trailing commas for lenient JSON parsing
    const cleaned = removeCommentsAndTrailingCommas(data);
    const result = JSON.parse(cleaned) as T;

    if (Array.isArray(result) && result.length > 0) {
      const item = result[0];
      if (typeof item === 'string') {
        return result.map((i) => {
          return { id: i };
        }) as T;
      }
    }

    return result;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

/**
 * Load and parse a JSON file, returning a new instance if file doesn't exist
 */
export function loadEnsure<T>(filepath: string): T[] {
  return load<T[]>(filepath) ?? ([] as Array<T>);
}

/**
 * Save data to a JSON file
 */
export function save<T>(data: T, filepath: string): void {
  try {
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(filepath, content, 'utf-8');
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * Parse a JSON document from a file
 */
export function getDoc(filepath: string): object | null {
  if (!fs.existsSync(filepath)) {
    return null;
  }

  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    const cleaned = removeCommentsAndTrailingCommas(data);
    return JSON.parse(cleaned);
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

/**
 * Remove C-style comments and trailing commas from JSON string
 */
function removeCommentsAndTrailingCommas(json: string): string {
  // Remove single-line comments
  let result = json.replace(/\/\/.*$/gm, '');
  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove trailing commas before ] or }
  result = result.replace(/,(\s*[}\]])/g, '$1');
  return result;
}
