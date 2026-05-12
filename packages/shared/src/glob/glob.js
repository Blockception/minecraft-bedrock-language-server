"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glob = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const picomatch_1 = __importDefault(require("picomatch"));
/**
 * Glob utilities for file pattern matching and searching
 */
var Glob;
(function (Glob) {
    const opt = {
        contains: true,
    };
    /**
     * Filters out files that match the ignore patterns
     * @param source The list of file paths to filter
     * @param ignores The glob patterns to filter out
     * @returns The filtered list of file paths
     */
    function excludes(source, ignores) {
        return source.filter((x) => !picomatch_1.default.isMatch(x, ignores, opt));
    }
    Glob.excludes = excludes;
    /**
     * Checks if a source path matches any of the given patterns
     * @param source The file path to check
     * @param patterns The glob patterns to match against
     * @returns True if the source matches any pattern
     */
    function isMatch(source, patterns) {
        return picomatch_1.default.isMatch(source, patterns, opt);
    }
    Glob.isMatch = isMatch;
    /**
     * Gets all files matching the given patterns
     * @param source The glob pattern(s) to search for files
     * @param ignores The glob patterns to ignore (optional)
     * @param cwd The working directory (optional)
     * @param baseNameMatch Whether to match against the basename only (optional)
     * @returns An array of absolute file paths
     */
    function getFiles(source, ignores = undefined, cwd = undefined, baseNameMatch = undefined) {
        if (cwd)
            cwd = folderPath(cwd);
        const options = { onlyFiles: true, absolute: true, cwd: cwd, baseNameMatch: baseNameMatch };
        let entries = fast_glob_1.default.sync(source, options);
        if (ignores && ignores.length > 0)
            entries = excludes(entries, ignores);
        return entries;
    }
    Glob.getFiles = getFiles;
    /**
     * Normalizes a folder path to use forward slashes
     * @param folder The folder path to normalize
     * @returns The normalized folder path
     */
    function folderPath(folder) {
        return folder.replace(/\\/gi, '/');
    }
    Glob.folderPath = folderPath;
    /**
     * Ensures the source is glob friendly
     * @param source The source path or array of paths
     * @returns The normalized source
     */
    function ensureSources(source) {
        if (typeof source === 'string') {
            return internalEnsureSource(source);
        }
        return source.map(internalEnsureSource);
    }
    Glob.ensureSources = ensureSources;
    /**
     * Ensures the source is glob friendly
     * @param source The source path
     * @returns The normalized source path
     */
    function ensureSource(source) {
        return internalEnsureSource(source);
    }
    Glob.ensureSource = ensureSource;
    function internalEnsureSource(source) {
        source = decodeURI(source);
        source = source.replace(/%3A/gi, ':');
        source = source.replace(/\\/gi, '/');
        if (source.startsWith('file:///'))
            source = source.substring(8);
        else if (source.startsWith('file://'))
            source = source.substring(7);
        return source;
    }
})(Glob || (exports.Glob = Glob = {}));
//# sourceMappingURL=glob.js.map