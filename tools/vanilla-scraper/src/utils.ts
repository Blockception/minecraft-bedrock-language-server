import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import extract from 'extract-zip';
import * as jsonc from 'jsonc-parser';

/**
 * Download a file from a URL
 */
export async function download(filepath: string, uri: string): Promise<void> {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }

  console.log('start\tdownloading: ' + uri);

  return new Promise((resolve, reject) => {
    https.get(uri, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        download(filepath, response.headers.location!).then(resolve).catch(reject);
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('done\tdownloading: ' + uri);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlinkSync(filepath);
        reject(err);
      });
    }).on('error', reject);
  });
}

/**
 * Download and unpack a zip file
 */
export async function downloadUnpack(name: string, uri: string, workFolder: string): Promise<string> {
  const filepath = path.join(workFolder, `${name}.zip`);

  if (!fs.existsSync(filepath)) {
    await download(filepath, uri);
  } else {
    console.log('Skipping downloading: ' + uri);
  }

  if (fs.existsSync(filepath)) {
    const folder = path.join(workFolder, name);

    if (!fs.existsSync(folder)) {
      console.log('Unzipping: ' + uri);
      await extract(filepath, { dir: path.resolve(folder) });
    } else {
      console.log('Skipping unzipping: ' + uri);
    }

    return folder;
  }

  throw new Error('Failed to download: ' + uri);
}

/**
 * Check if directory exists and add to list
 */
export function existsIf(receiver: string[], folder: string, subFolder?: string): void {
  const targetFolder = subFolder ? path.join(folder, subFolder) : folder;
  if (fs.existsSync(targetFolder)) {
    receiver.push(targetFolder);
  }
}

/**
 * Recursively find all JSON files in a directory
 */
export function findJsonFiles(directory: string): string[] {
  const results: string[] = [];

  if (!fs.existsSync(directory)) {
    return results;
  }

  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filepath = path.join(directory, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      results.push(...findJsonFiles(filepath));
    } else if (file.endsWith('.json')) {
      results.push(filepath);
    }
  }

  return results;
}

/**
 * Read and parse a JSON file (supports JSON with comments and trailing commas)
 */
export function readJsonFile<T = any>(filepath: string): T | null {
  try {
    if (!fs.existsSync(filepath)) {
      return null;
    }
    const content = fs.readFileSync(filepath, 'utf-8');
    // Use jsonc-parser to handle comments and trailing commas
    const errors: jsonc.ParseError[] = [];
    const result = jsonc.parse(content, errors, { allowTrailingComma: true });
    
    if (errors.length > 0) {
      // If there are parsing errors, log them but continue
      for (const error of errors) {
        console.error(`Error parsing ${filepath}:`, jsonc.printParseErrorCode(error.error));
      }
      return null;
    }
    
    return result as T;
  } catch (error) {
    console.error(`Error reading ${filepath}:`, error);
    return null;
  }
}

/**
 * Find folder by traversing up the directory tree
 */
export function findFolder(source: string, find: string): string {
  let current = source;

  while (current.length > 0) {
    const item = path.join(current, find);
    if (fs.existsSync(item)) {
      return item;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }

  throw new Error(`Could not find folder: ${find}`);
}
