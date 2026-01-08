import { Glob as SharedGlob } from 'bc-minecraft-bedrock-shared';
import { Fs, Vscode } from '../util';

/**
 * Glob utilities with VSCode URI handling
 */
export namespace Glob {
  /**
   * Filters out files that match the ignore patterns
   * @param source The list of file paths to filter
   * @param ignores The glob patterns to filter out
   * @returns The filtered list of file paths
   */
  export function excludes(source: string[], ignores: string[]): string[] {
    return SharedGlob.excludes(source, ignores);
  }

  /**
   * Checks if a source path matches any of the given patterns
   * @param source The file path to check
   * @param patterns The glob patterns to match against
   * @returns True if the source matches any pattern
   */
  export function isMatch(source: string, patterns: string[]): boolean {
    return SharedGlob.isMatch(source, patterns);
  }

  /**
   * Gets all files matching the given patterns, with VSCode URI conversion
   * @param source The glob pattern(s) to search for files
   * @param ignores The glob patterns to ignore (optional)
   * @param cwd The working directory (optional)
   * @param baseNameMatch Whether to match against the basename only (optional)
   * @returns An array of VSCode URIs
   */
  export function getFiles(
    source: string | string[],
    ignores: string[] | undefined = undefined,
    cwd: string | undefined = undefined,
    baseNameMatch: boolean | undefined = undefined,
  ): string[] {
    // Convert cwd from VSCode URI to file system path
    if (cwd) cwd = folderPath(cwd);

    const entries = SharedGlob.getFiles(source, ignores, cwd, baseNameMatch);

    // Convert file system paths back to VSCode URIs
    return entries.map(Vscode.fromFs);
  }

  /**
   * Normalizes a folder path from VSCode URI to file system path
   * @param folder The folder path to normalize
   * @returns The normalized folder path
   */
  export function folderPath(folder: string): string {
    return Fs.FromVscode(folder).replace(/\\/gi, '/');
  }

  /**
   * Ensures the source is glob friendly
   * @param source The source path or array of paths
   * @returns The normalized source
   */
  export function ensureSources(source: string | string[]): string | string[] {
    return SharedGlob.ensureSources(source);
  }

  /**
   * Ensures the source is glob friendly
   * @param source The source path
   * @returns The normalized source path
   */
  export function ensureSource(source: string): string {
    return SharedGlob.ensureSource(source);
  }
}
