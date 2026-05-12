"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportAsPack = exportAsPack;
exports.exportAsAddon = exportAsAddon;
const adm_zip_1 = __importDefault(require("adm-zip"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const util_1 = require("../util");
const util_2 = require("../../../util");
/**
 * Creates a ZIP archive of the given source directory and writes it to outputPath.
 * @param sourceDir The directory whose contents will be added to the archive.
 * @param outputPath The file path where the archive will be written.
 * @param prefix Optional folder prefix to use inside the archive.
 */
function createZip(sourceDir, outputPath, prefix = '') {
    const zip = new adm_zip_1.default();
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
async function exportAsPack(context) {
    const { arguments: args } = context;
    if (!args || args.length < 2) {
        throw new Error('wrong parameters: expected [packFolderUri, outputPath]');
    }
    const packFolderUri = String(args[0]);
    const outputPath = String(args[1]);
    const sourceDir = util_2.Fs.FromVscode(packFolderUri);
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
async function exportAsAddon(context) {
    const { arguments: args } = context;
    if (!args || args.length < 1) {
        throw new Error('wrong parameters: expected [outputPath]');
    }
    const outputPath = String(args[0]);
    const workspaceProcessor = (0, util_1.getWorkspace)(context);
    const workspaces = await workspaceProcessor.get();
    if (!workspaces || workspaces.length === 0) {
        throw new Error('No workspace folders found');
    }
    const packs = (await Promise.all(workspaces.map((ws) => workspaceProcessor.packs(ws)))).flat();
    if (packs.length === 0) {
        throw new Error('No packs found in workspace');
    }
    const zip = new adm_zip_1.default();
    for (const pack of packs) {
        const sourceDir = util_2.Fs.FromVscode(pack.folder);
        if (!fs.existsSync(sourceDir))
            continue;
        const packName = path.basename(sourceDir);
        zip.addLocalFolder(sourceDir, packName);
    }
    zip.writeZip(outputPath);
    return { success: true, path: outputPath };
}
//# sourceMappingURL=export-pack.js.map