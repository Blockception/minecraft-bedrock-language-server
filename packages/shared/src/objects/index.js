"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeObjectKeys = safeObjectKeys;
exports.safeObjectEntries = safeObjectEntries;
exports.safeObjectValues = safeObjectValues;
/**
 * Safely gets the keys of an object, returning an empty array if the value is null/undefined.
 * @param obj The object to get keys from
 * @returns Array of keys, or empty array if obj is null/undefined
 */
function safeObjectKeys(obj) {
    if (obj == null)
        return [];
    return Object.keys(obj);
}
/**
 * Safely gets the entries of an object, returning an empty array if the value is null/undefined.
 * @param obj The object to get entries from
 * @returns Array of [key, value] tuples, or empty array if obj is null/undefined
 */
function safeObjectEntries(obj) {
    if (obj == null)
        return [];
    return Object.entries(obj);
}
/**
 * Safely gets the values of an object, returning an empty array if the value is null/undefined.
 * @param obj The object to get values from
 * @returns Array of values, or empty array if obj is null/undefined
 */
function safeObjectValues(obj) {
    if (obj == null)
        return [];
    return Object.values(obj);
}
//# sourceMappingURL=index.js.map