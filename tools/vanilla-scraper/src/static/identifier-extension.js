"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasId = hasId;
exports.cleanIdentifiers = cleanIdentifiers;
exports.cleanStrings = cleanStrings;
exports.duplicateWithoutNamespace = duplicateWithoutNamespace;
const sort_1 = require("./sort");
/**
 * Check if array has an item with the given ID
 */
function hasId(data, findId, startIndex = 0) {
    for (let i = startIndex; i < data.length; i++) {
        if (data[i].id === findId) {
            return true;
        }
    }
    return false;
}
/**
 * Clean and deduplicate IIdentifier list, keeping last occurrence of each ID
 */
function cleanIdentifiers(data, excluded) {
    const out = [];
    if (data.length === 0)
        return out;
    // Walk backwards to keep last occurrence
    for (let i = data.length - 1; i >= 0; i--) {
        const item = data[i];
        const id = item.id;
        if (typeof item === "string")
            throw new Error("string[] has been passed in");
        if (item === undefined || item.id === undefined) {
            continue;
        }
        // Skip if excluded or already in output
        if (excluded && hasId(excluded, id)) {
            continue;
        }
        if (hasId(out, id)) {
            continue;
        }
        out.push(item);
    }
    out.sort(sort_1.idSort);
    return out;
}
/**
 * Clean and deduplicate string list
 */
function cleanStrings(data) {
    const unique = [...new Set(data)];
    unique.sort(sort_1.stringSort);
    return unique;
}
/**
 * Duplicate list with items without minecraft: prefix
 */
function duplicateWithoutNamespace(items) {
    const result = [...items];
    for (const item of items) {
        if (item.startsWith('minecraft:')) {
            result.push(item.substring(10));
        }
    }
    return result;
}
//# sourceMappingURL=identifier-extension.js.map