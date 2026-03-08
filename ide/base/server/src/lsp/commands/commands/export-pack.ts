import * as fs from 'fs';
import * as path from 'path';
import { Context } from '../../context/context';
import { CommandContext } from '../context';
import { getWorkspace } from '../util';
import { Fs } from '../../../util';

// Minimal types for yazl (no official @types/yazl package available)
interface YazlZipFile {
  addFile(realPath: string, metadataPath: string): void;
  end(): void;
  outputStream: NodeJS.ReadableStream;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const yazl = require('yazl') as { ZipFile: new () => YazlZipFile };

/**
 * Recursively collects all file paths under the given directory using async I/O
 */
async function getAllFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...(await getAllFiles(fullPath)));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Creates a ZIP archive of the given source directory and writes it to outputPath.
 * @param sourceDir The directory whose contents will be added to the archive.
 * @param outputPath The file path where the archive will be written.
 * @param prefix Optional folder prefix to use inside the archive.
 */
async function createZip(sourceDir: string, outputPath: string, prefix: string = ''): Promise<void> {
  const files = await getAllFiles(sourceDir);

  return new Promise<void>((resolve, reject) => {
    const zip = new yazl.ZipFile();

    for (const file of files) {
      const relative = path.relative(sourceDir, file).replace(/\\/g, '/');
      const entryPath = prefix ? `${prefix}/${relative}` : relative;
      zip.addFile(file, entryPath);
    }

    zip.end();

    const output = fs.createWriteStream(outputPath);
    zip.outputStream.pipe(output);
    output.on('finish', resolve);
    output.on('error', reject);
    zip.outputStream.on('error', reject);
  });
}

/**
 * Exports a single behavior pack or resource pack as a .mcpack file.
 *
 * Expected arguments: [packFolderUri: string, outputPath: string]
 * - packFolderUri: the LSP/VSCode URI of the pack folder (e.g. file:///path/to/my_bp)
 * - outputPath:    the filesystem path where the .mcpack file will be written
 *
 * @see {Commands.Export.Pack}
 */
export async function exportAsPack(context: Context<CommandContext>): Promise<{ success: boolean; path: string }> {
  const { arguments: args } = context;

  if (!args || args.length < 2) {
    throw new Error('wrong parameters: expected [packFolderUri, outputPath]');
  }

  const packFolderUri = String(args[0]);
  const outputPath = String(args[1]);

  const sourceDir = Fs.FromVscode(packFolderUri);

  try {
    await fs.promises.access(sourceDir);
  } catch {
    throw new Error(`Pack folder does not exist: ${sourceDir}`);
  }

  await createZip(sourceDir, outputPath);

  return { success: true, path: outputPath };
}

/**
 * Exports the full add-on (all discovered packs) as a .mcaddon file.
 * Each pack is placed in a named sub-folder inside the archive.
 *
 * Expected arguments: [outputPath: string]
 * - outputPath: the filesystem path where the .mcaddon file will be written
 *
 * @see {Commands.Export.Addon}
 */
export async function exportAsAddon(context: Context<CommandContext>): Promise<{ success: boolean; path: string }> {
  const { arguments: args } = context;

  if (!args || args.length < 1) {
    throw new Error('wrong parameters: expected [outputPath]');
  }

  const outputPath = String(args[0]);

  const workspaceProcessor = getWorkspace(context);
  const workspaces = await workspaceProcessor.get();

  if (!workspaces || workspaces.length === 0) {
    throw new Error('No workspace folders found');
  }

  const packs = (await Promise.all(workspaces.map((ws) => workspaceProcessor.packs(ws)))).flat();

  if (packs.length === 0) {
    throw new Error('No packs found in workspace');
  }

  const zip = new yazl.ZipFile();

  for (const pack of packs) {
    const sourceDir = Fs.FromVscode(pack.folder);

    try {
      await fs.promises.access(sourceDir);
    } catch {
      continue;
    }

    const packName = path.basename(sourceDir);
    const files = await getAllFiles(sourceDir);

    for (const file of files) {
      const relative = path.relative(sourceDir, file).replace(/\\/g, '/');
      zip.addFile(file, `${packName}/${relative}`);
    }
  }

  await new Promise<void>((resolve, reject) => {
    zip.end();

    const output = fs.createWriteStream(outputPath);
    zip.outputStream.pipe(output);

    output.on('finish', resolve);
    output.on('error', reject);
    zip.outputStream.on('error', reject);
  });

  return { success: true, path: outputPath };
}
