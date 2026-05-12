"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glob = void 0;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const util_1 = require("../util");
/**
 * Glob utilities with VSCode URI handling
 */
var Glob;
(function (Glob) {
    /**
     * Filters out files that match the ignore patterns
     * @param source The list of file paths to filter
     * @param ignores The glob patterns to filter out
     * @returns The filtered list of file paths
     */
    function excludes(source, ignores) {
        return bc_minecraft_bedrock_shared_1.Glob.excludes(source, ignores);
    }
    Glob.excludes = excludes;
    /**
     * Checks if a source path matches any of the given patterns
     * @param source The file path to check
     * @param patterns The glob patterns to match against
     * @returns True if the source matches any pattern
     */
    function isMatch(source, patterns) {
        return bc_minecraft_bedrock_shared_1.Glob.isMatch(source, patterns);
    }
    Glob.isMatch = isMatch;
    /**
     * Gets all files matching the given patterns, with VSCode URI conversion
     * @param source The glob pattern(s) to search for files
     * @param ignores The glob patterns to ignore (optional)
     * @param cwd The working directory (optional)
     * @param baseNameMatch Whether to match against the basename only (optional)
     * @returns An array of VSCode URIs
     */
    function getFiles(source, ignores = undefined, cwd = undefined, baseNameMatch = undefined) {
        // Convert cwd from VSCode URI to file system path
        if (cwd)
            cwd = folderPath(cwd);
        const entries = bc_minecraft_bedrock_shared_1.Glob.getFiles(source, ignores, cwd, baseNameMatch);
        // Convert file system paths back to VSCode URIs
        return entries.map(util_1.Vscode.fromFs);
    }
    Glob.getFiles = getFiles;
    /**
     * Normalizes a folder path from VSCode URI to file system path
     * @param folder The folder path to normalize
     * @returns The normalized folder path
     */
    function folderPath(folder) {
        return util_1.Fs.FromVscode(folder).replace(/\\/gi, '/');
    }
    Glob.folderPath = folderPath;
    /**
     * Ensures the source is glob friendly
     * @param source The source path or array of paths
     * @returns The normalized source
     */
    function ensureSources(source) {
        return bc_minecraft_bedrock_shared_1.Glob.ensureSources(source);
    }
    Glob.ensureSources = ensureSources;
    /**
     * Ensures the source is glob friendly
     * @param source The source path
     * @returns The normalized source path
     */
    function ensureSource(source) {
        return bc_minecraft_bedrock_shared_1.Glob.ensureSource(source);
    }
    Glob.ensureSource = ensureSource;
})(Glob || (exports.Glob = Glob = {}));
//# sourceMappingURL=glob.js.map