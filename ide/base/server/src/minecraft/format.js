"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinecraftFormat = void 0;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const glob_1 = require("../files/glob");
var MinecraftFormat;
(function (MinecraftFormat) {
    /**
     * Gets the manifest files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     * @returns
     */
    function GetManifests(folder, ignores) {
        return glob_1.Glob.getFiles(['manifest.json', '**/manifest.json'], ignores, folder, true);
    }
    MinecraftFormat.GetManifests = GetManifests;
    /**
     * Gets the behaviorpack files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     * @returns
     */
    function GetBehaviorPackFiles(folder, ignores) {
        return glob_1.Glob.getFiles(['**/*.{json,jsonc,json5}', '*.{json,jsonc,json5}', '*.mcfunction', '**/*.mcfunction', '**/*.lang', '*.lang'], ignores, folder);
    }
    MinecraftFormat.GetBehaviorPackFiles = GetBehaviorPackFiles;
    /**
     * Gets the resourcepack files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     * @returns
     */
    function GetResourcePackFiles(folder, ignores) {
        return glob_1.Glob.getFiles(['**/*.{json,jsonc,json5}', '*.{json,jsonc,json5}', '**/*.lang', '*.lang'], ignores, folder);
    }
    MinecraftFormat.GetResourcePackFiles = GetResourcePackFiles;
    /**
     * Retrieves the relevant files located inside the folder of the pack
     * @param pack The pack to get the files from
     * @returns A list of files
     */
    function GetPackFiles(pack) {
        const ignores = pack.context.ignores.patterns;
        const folder = pack.folder;
        let files;
        if (bc_minecraft_bedrock_project_1.Util.IsBehaviorPack(pack)) {
            files = MinecraftFormat.GetBehaviorPackFiles(folder, ignores);
        }
        else if (bc_minecraft_bedrock_project_1.Util.IsResourcePack(pack)) {
            files = MinecraftFormat.GetResourcePackFiles(folder, ignores);
        }
        else {
            files = MinecraftFormat.GetBehaviorPackFiles(folder, ignores);
        }
        return files;
    }
    MinecraftFormat.GetPackFiles = GetPackFiles;
    /**
     * Gets the minecraft audio files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     */
    function GetAudioFiles(folder, ignores) {
        return glob_1.Glob.getFiles(['sounds/**/*.ogg', 'sounds/*.ogg', 'sounds/**/*.fsb', 'sounds/*.fsb'], ignores, folder);
    }
    MinecraftFormat.GetAudioFiles = GetAudioFiles;
    /**
     * Gets the minecraft texture files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     */
    function GetTextureFiles(folder, ignores) {
        return glob_1.Glob.getFiles(['textures/**/*.png', 'textures/*.png', 'textures/**/*.tga', 'textures/*.tga'], ignores, folder);
    }
    MinecraftFormat.GetTextureFiles = GetTextureFiles;
    /**
     * Gets the minecraft structure files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     */
    function GetStructureFiles(folder, ignores) {
        return glob_1.Glob.getFiles(['**/*.mcstructure', '*.mcstructure'], ignores, folder);
    }
    MinecraftFormat.GetStructureFiles = GetStructureFiles;
})(MinecraftFormat || (exports.MinecraftFormat = MinecraftFormat = {}));
//# sourceMappingURL=format.js.map