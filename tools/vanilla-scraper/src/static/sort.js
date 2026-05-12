"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringSort = stringSort;
exports.namedSort = namedSort;
exports.idSort = idSort;
/**
 * String comparison function for sorting
 */
function stringSort(x, y) {
    return x.localeCompare(y);
}
/**
 * Sort comparison function for INamed objects
 */
function namedSort(x, y) {
    return stringSort(x.name, y.name);
}
/**
 * Sort comparison function for IIdentifier objects
 */
function idSort(x, y) {
    return stringSort(x.id, y.id);
}
//# sourceMappingURL=sort.js.map