import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { installationFolder, eduInstallationFolder } from './minecraft';
import { Context } from '../classes/context';
import { execSync } from 'child_process';

// Directory paths
export const workFolder = path.join(process.cwd(), 'work');

function findFolder(source: string, find: string): string {
  let current = source;
  while (current.length > 0) {
    const item = path.join(current, find);
    if (fs.existsSync(item)) {
      return item;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  throw new Error(`Could not find folder '${find}' starting from '${source}'`);
}

export const sourceFolder = findFolder(workFolder, 'src');
export const outputFolder = path.join(sourceFolder, 'Lib');
export const outputEdu = path.join(outputFolder, 'Edu');
export const outputVanilla = path.join(outputFolder, 'Vanilla');
export const baseFolder = path.join(sourceFolder, 'Base');
export const baseEdu = path.join(baseFolder, 'Edu');
export const baseVanilla = path.join(baseFolder, 'Vanilla');

/**
 * Download file from URL
 */
export async function download(filepath: string, uri: string): Promise<void> {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }

  console.log('start\tdownloading: ' + uri);

  return new Promise((resolve, reject) => {
    const file = createWriteStream(filepath);

    const request = https.get(uri, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        download(filepath, response.headers.location!)
          .then(resolve)
          .catch(reject);
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('done\tdownloading: ' + uri);
        resolve();
      });
    });

    request.on('error', (err) => {
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

/**
 * Download and unpack a zip file
 */
export async function downloadUnpack(name: string, uri: string): Promise<string | null> {
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
      // Use unzip command for cross-platform compatibility
      try {
        fs.mkdirSync(folder, { recursive: true });
        execSync(`unzip -q "${filepath}" -d "${folder}"`);
      } catch (err) {
        console.error('Failed to unzip:', err);
        return null;
      }
    } else {
      console.log('Skipping unzipping: ' + uri);
    }

    return folder;
  }

  return null;
}

/**
 * Helper to add folder to list if it exists
 */
function existsIf(receiver: string[], folder: string, subFolder?: string): void {
  if (subFolder) {
    folder = path.join(folder, subFolder);
  }
  if (fs.existsSync(folder)) {
    receiver.push(folder);
  }
}

/**
 * Get folders for scraping
 */
export async function getFolders(): Promise<Context> {
  fs.mkdirSync(workFolder, { recursive: true });
  fs.mkdirSync(outputFolder, { recursive: true });

  const out = new Context();

  // Edu
  const eduInstall = eduInstallationFolder();
  if (eduInstall !== null) {
    const bps = path.join(eduInstall, 'data', 'behavior_packs', 'education');
    const rps = path.join(eduInstall, 'data', 'resource_packs', 'education');

    existsIf(out.eduBP, bps);
    existsIf(out.eduRP, rps);
  }

  // Vanilla
  const install = installationFolder();
  if (install !== null) {
    const bps = path.join(install, 'data', 'behavior_packs');
    const rps = path.join(install, 'data', 'resource_packs');

    existsIf(out.vanillaBP, bps, 'vanilla');
    existsIf(out.eduBP, bps, 'education');

    existsIf(out.vanillaRP, rps, 'vanilla');
    existsIf(out.eduRP, rps, 'education');
  }

  // Download from GitHub
  const df = await downloadUnpack('Samples', 'https://github.com/Mojang/bedrock-samples/archive/refs/heads/main.zip');
  if (df !== null) {
    const folder = path.join(df, 'bedrock-samples-main');
    existsIf(out.vanillaBP, folder, 'behavior_pack');
    existsIf(out.vanillaRP, folder, 'resource_pack');
    existsIf(out.metadataFolder, folder, 'metadata');

    out.githubFolder = folder;
  }

  return out;
}
