import * as path from 'path';
import * as fs from 'fs';
import { downloadUnpack, existsIf, getMinecraftInstallationFolder } from './utils.js';

export interface Context {
  vanillaRP: string[];
  eduRP: string[];
  vanillaBP: string[];
  eduBP: string[];
  metadataFolder: string[];
  githubFolder: string;
}

export async function getFolders(workFolder: string): Promise<Context> {
  // Create work directory
  if (!fs.existsSync(workFolder)) {
    fs.mkdirSync(workFolder, { recursive: true });
  }

  const context: Context = {
    vanillaRP: [],
    eduRP: [],
    vanillaBP: [],
    eduBP: [],
    metadataFolder: [],
    githubFolder: '',
  };

  // Try to get installation folder (Windows-specific in C# version)
  const install = getMinecraftInstallationFolder();
  if (install) {
    const bps = path.join(install, 'data', 'behavior_packs');
    const rps = path.join(install, 'data', 'resource_packs');

    existsIf(context.vanillaBP, bps, 'vanilla');
    existsIf(context.eduBP, bps, 'education');

    existsIf(context.vanillaRP, rps, 'vanilla');
    existsIf(context.eduRP, rps, 'education');
  }

  // Download samples from GitHub
  const samplesFolder = await downloadUnpack(
    'Samples',
    'https://github.com/Mojang/bedrock-samples/archive/refs/heads/main.zip',
    workFolder
  );

  const folder = path.join(samplesFolder, 'bedrock-samples-main');
  existsIf(context.vanillaBP, folder, 'behavior_pack');
  existsIf(context.vanillaRP, folder, 'resource_pack');
  existsIf(context.metadataFolder, folder, 'metadata');

  context.githubFolder = folder;

  return context;
}
