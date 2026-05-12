"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEach = forEach;
/**
 * Iterates over the given data
 * @param data A Using, Defined, or an array of T
 * @param callback The callback to call
 * @returns void
 * @example forEach(Using.create(["a", "b", "c"]), (v)=>console.log(v));
 */
function forEach(data, callback) {
    if (data === undefined)
        return;
    if (Array.isArray(data)) {
        return data.forEach((v) => callback(v));
    }
    if (Array.isArray(data.using)) {
        data.using.forEach((v) => callback(v));
    }
    if (Array.isArray(data.defined)) {
        data.defined.forEach((v) => callback(v));
    }
}
//# sourceMappingURL=references.js.map