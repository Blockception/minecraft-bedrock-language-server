/**
 * Iterates over `packs` and returns the first non-undefined result returned by `fn`.
 * @param packs The array of packs to iterate over.
 * @param fn The function to call for each pack.
 * @returns The first non-undefined result, or `undefined` if none was found.
 */
export declare function findInPacks<T, U>(packs: U[], fn: (pack: U) => T | undefined): T | undefined;
//# sourceMappingURL=find-in-packs.d.ts.map