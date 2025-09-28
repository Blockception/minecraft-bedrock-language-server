"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverse = traverse;
const functions_1 = require("./functions");
/**
 * Traverses the object and returns all the molang strings
 * @param obj The object to traverse
 * @param callbackfn The callback to call when a molang string is found
 */
function traverse(obj, callbackfn, path = "$") {
    if (!path.endsWith("/"))
        path += "/";
    switch (typeof obj) {
        default:
            return;
        case "string":
            return StringCheck(obj, callbackfn, path);
        case "object":
            if (Array.isArray(obj)) {
                for (let I = 0; I < obj.length; I++) {
                    traverse(obj[I], callbackfn, path + I);
                }
            }
            else {
                const keys = Object.getOwnPropertyNames(obj);
                for (let I = 0; I < keys.length; I++) {
                    const k = keys[I];
                    traverse(obj[k], callbackfn, path + k);
                }
            }
    }
}
/** */
function StringCheck(data, callbackfn, path = "") {
    const type = (0, functions_1.isMolangType)(data);
    if (type !== functions_1.MolangType.unknown)
        callbackfn(data, type, path);
}
//# sourceMappingURL=traverse.js.map