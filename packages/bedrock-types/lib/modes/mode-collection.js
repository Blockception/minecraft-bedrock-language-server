"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = exports.ModeCollection = void 0;
/** */
var ModeCollection;
(function (ModeCollection) {
    /**Checks if the given object is implements ModeCollection
     * @param value
     * @returns
     */
    function is(value) {
        if (value) {
            const temp = value;
            if (temp.name && temp.modes && Array.isArray(value.modes))
                return true;
        }
        return false;
    }
    ModeCollection.is = is;
    /**TODO add documentation
     *
     */
    function isValue(Collection, value) {
        const M = Collection.modes;
        for (let I = 0; I < M.length; I++) {
            const elem = M[I];
            if (elem.name === value)
                return true;
        }
        return false;
    }
    ModeCollection.isValue = isValue;
    /**TODO add documentation
     *
     * @param Collection
     * @param index
     * @returns
     */
    function get(Collection, index) {
        if (typeof index === "string") {
            const M = Collection.modes;
            for (let I = 0; I < M.length; I++) {
                const elem = M[I];
                if (elem.name === index)
                    return elem;
            }
        }
        else {
            return Collection.modes[index];
        }
        return undefined;
    }
    ModeCollection.get = get;
})(ModeCollection || (exports.ModeCollection = ModeCollection = {}));
/** */
var Mode;
(function (Mode) {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.name === "string" && typeof value.documentation === "string") {
            return true;
        }
        return false;
    }
    Mode.is = is;
})(Mode || (exports.Mode = Mode = {}));
//# sourceMappingURL=mode-collection.js.map