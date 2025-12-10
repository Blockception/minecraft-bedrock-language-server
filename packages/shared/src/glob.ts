import FastGlob from 'fast-glob';
import pm from 'picomatch';

/**
 * Glob utilities for file pattern matching and searching
 */
export namespace Glob {
  const opt: pm.PicomatchOptions = {
    contains: true,
  };

  /**
   * Filters out files that match the ignore patterns
   * @param source The list of file paths to filter
   * @param ignores The glob patterns to filter out
   * @returns The filtered list of file paths
   */
  export function excludes(source: string[], ignores: string[]): string[] {
    return source.filter((x) => !pm.isMatch(x, ignores, opt));
  }

  /**
   * Checks if a source path matches any of the given patterns
   * @param source The file path to check
   * @param patterns The glob patterns to match against
   * @returns True if the source matches any pattern
   */
  export function isMatch(source: string, patterns: string[]): boolean {
    return pm.isMatch(source, patterns, opt);
  }

  /**
   * Gets all files matching the given patterns
   * @param source The glob pattern(s) to search for files
   * @param ignores The glob patterns to ignore (optional)
   * @param cwd The working directory (optional)
   * @param baseNameMatch Whether to match against the basename only (optional)
   * @returns An array of absolute file paths
   */
  export function getFiles(
    source: string | string[],
    ignores: string[] | undefined = undefined,
    cwd: string | undefined = undefined,
    baseNameMatch: boolean | undefined = undefined,
  ): string[] {
    if (cwd) cwd = folderPath(cwd);

    const options: FastGlob.Options = { onlyFiles: true, absolute: true, cwd: cwd, baseNameMatch: baseNameMatch };
    let entries = FastGlob.sync(source, options);

    if (ignores && ignores.length > 0) entries = excludes(entries, ignores);

    return entries;
  }

  /**
   * Normalizes a folder path to use forward slashes
   * @param folder The folder path to normalize
   * @returns The normalized folder path
   */
  export function folderPath(folder: string): string {
    return folder.replace(/\\/gi, '/');
  }

  /**
   * Ensures the source is glob friendly
   * @param source The source path or array of paths
   * @returns The normalized source
   */
  export function ensureSources(source: string | string[]): string | string[] {
    if (typeof source == 'string') {
      return internalEnsureSource(source);
    }

    return source.map(internalEnsureSource);
  }

  /**
   * Ensures the source is glob friendly
   * @param source The source path
   * @returns The normalized source path
   */
  export function ensureSource(source: string): string {
    return internalEnsureSource(source);
  }

  function internalEnsureSource(source: string): string {
    source = decodeURI(source);
    source = source.replace(/%3A/gi, ':');
    source = source.replace(/\\/gi, '/');

    if (source.startsWith('file:///')) source = source.substring(8);
    else if (source.startsWith('file://')) source = source.substring(7);

    return source;
  }
}
