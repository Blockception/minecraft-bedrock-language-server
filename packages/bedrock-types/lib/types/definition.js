"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
/**The namespace that provides functionallity to definitions*/
var Definition;
(function (Definition) {
    /**
     * Counts the number of definitions in the given object
     * @param data The object to count the definitions in
     * @returns The number of definitions
     */
    function count(data) {
        return Object.getOwnPropertyNames(data).length;
    }
    Definition.count = count;
    /**Returns the idenfitication used
     * @param data The data to look through
     * @param index The index of the definition
     * @returns*/
    function getId(data, index) {
        const key = Object.getOwnPropertyNames(data)[index];
        return data[key];
    }
    Definition.getId = getId;
    /**Returns the idenfitication used
     * @param data The data to look through
     * @returns*/
    function getIds(data) {
        const out = [];
        const keys = Object.getOwnPropertyNames(data);
        for (let I = 0; I < keys.length; I++) {
            const k = keys[I];
            const value = data[k];
            if (typeof value === "string")
                out.push(value);
        }
        return out;
    }
    Definition.getIds = getIds;
    /**
     * @param data The data to look through
     * @param index The index of the definition
     * @returns
     */
    function getReference(data, index) {
        return Object.getOwnPropertyNames(data)[index];
    }
    Definition.getReference = getReference;
    /**
     * @param data The data to look through
     * @returns
     */
    function getReferences(data) {
        return Object.getOwnPropertyNames(data);
    }
    Definition.getReferences = getReferences;
    /**
     *
     * @param data
     * @param callbackfn
     * @returns
     */
    function forEach(data, callbackfn) {
        if (!data)
            return;
        const keys = Object.getOwnPropertyNames(data);
        keys.forEach((reference, index) => {
            callbackfn(reference, data[reference], index, data);
        });
    }
    Definition.forEach = forEach;
})(Definition || (exports.Definition = Definition = {}));
//# sourceMappingURL=definition.js.map