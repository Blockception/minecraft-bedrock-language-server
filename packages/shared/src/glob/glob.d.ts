/**
 * Glob utilities for file pattern matching and searching
 */
export declare namespace Glob {
    /**
     * Filters out files that match the ignore patterns
     * @param source The list of file paths to filter
     * @param ignores The glob patterns to filter out
     * @returns The filtered list of file paths
     */
    function excludes(source: string[], ignores: string[]): string[];
    /**
     * Checks if a source path matches any of the given patterns
     * @param source The file path to check
     * @param patterns The glob patterns to match against
     * @returns True if the source matches any pattern
     */
    function isMatch(source: string, patterns: string[]): boolean;
    /**
     * Gets all files matching the given patterns
     * @param source The glob pattern(s) to search for files
     * @param ignores The glob patterns to ignore (optional)
     * @param cwd The working directory (optional)
     * @param baseNameMatch Whether to match against the basename only (optional)
     * @returns An array of absolute file paths
     */
    function getFiles(source: string | string[], ignores?: string[] | undefined, cwd?: string | undefined, baseNameMatch?: boolean | undefined): string[];
    /**
     * Normalizes a folder path to use forward slashes
     * @param folder The folder path to normalize
     * @returns The normalized folder path
     */
    function folderPath(folder: string): string;
    /**
     * Ensures the source is glob friendly
     * @param source The source path or array of paths
     * @returns The normalized source
     */
    function ensureSources(source: string | string[]): string | string[];
    /**
     * Ensures the source is glob friendly
     * @param source The source path
     * @returns The normalized source path
     */
    function ensureSource(source: string): string;
}
//# sourceMappingURL=glob.d.ts.map