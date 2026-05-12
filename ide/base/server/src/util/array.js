"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicate = removeDuplicate;
exports.DupeCheckAdd = DupeCheckAdd;
/**
 *
 * @param items
 * @returns
 */
function removeDuplicate(items) {
    const length = items.length;
    const result = [];
    for (let I = 0; I < length; I++) {
        const current = items[I];
        if (!result.includes(current)) {
            result.push(current);
        }
    }
    return result;
}
/**
 *
 * @param items
 * @param item
 */
function DupeCheckAdd(items, item) {
    if (!items.includes(item))
        items.push(item);
}
//# sourceMappingURL=array.js.map