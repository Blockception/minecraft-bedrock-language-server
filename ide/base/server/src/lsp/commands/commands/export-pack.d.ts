import { Context } from '../../context/context';
import { CommandContext } from '../context';
/**
 * Exports a single behavior pack or resource pack as a .mcpack file.
 *
 * Expected arguments: [packFolderUri: string, outputPath: string]
 * - packFolderUri: the LSP/VSCode URI of the pack folder (e.g. file:///path/to/my_bp)
 * - outputPath:    the filesystem path where the .mcpack file will be written
 *
 * @see {Commands.Export.Pack}
 */
export declare function exportAsPack(context: Context<CommandContext>): Promise<{
    success: boolean;
    path: string;
}>;
/**
 * Exports the full add-on (all discovered packs) as a .mcaddon file.
 * Each pack is placed in a named sub-folder inside the archive.
 *
 * Expected arguments: [outputPath: string]
 * - outputPath: the filesystem path where the .mcaddon file will be written
 *
 * @see {Commands.Export.Addon}
 */
export declare function exportAsAddon(context: Context<CommandContext>): Promise<{
    success: boolean;
    path: string;
}>;
//# sourceMappingURL=export-pack.d.ts.map