import AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';
import { Context } from '../../context/context';
import { CommandContext } from '../context';
import { getWorkspace } from '../util';
import { Fs } from '../../../util';

/**
 * Creates a ZIP archive of the given source directory and writes it to outputPath.
 * @param sourceDir The directory whose contents will be added to the archive.
 * @param outputPath The file path where the archive will be written.
 * @param prefix Optional folder prefix to use inside the archive.
 */
function createZip(sourceDir: string, outputPath: string, prefix: string = ''): void {
  const zip = new AdmZip();
  zip.addLocalFolder(sourceDir, prefix);
  zip.writeZip(outputPath);
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

  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Pack folder does not exist: ${sourceDir}`);
  }

  createZip(sourceDir, outputPath);

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

  const zip = new AdmZip();

  for (const pack of packs) {
    const sourceDir = Fs.FromVscode(pack.folder);

    if (!fs.existsSync(sourceDir)) continue;

    const packName = path.basename(sourceDir);
    zip.addLocalFolder(sourceDir, packName);
  }

  zip.writeZip(outputPath);

  return { success: true, path: outputPath };
}

