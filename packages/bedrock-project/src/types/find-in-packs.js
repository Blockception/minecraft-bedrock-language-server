"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findInPacks = findInPacks;
/**
 * Iterates over `packs` and returns the first non-undefined result returned by `fn`.
 * @param packs The array of packs to iterate over.
 * @param fn The function to call for each pack.
 * @returns The first non-undefined result, or `undefined` if none was found.
 */
function findInPacks(packs, fn) {
    for (const pack of packs) {
        const result = fn(pack);
        if (result !== undefined)
            return result;
    }
    return undefined;
}
//# sourceMappingURL=find-in-packs.js.map