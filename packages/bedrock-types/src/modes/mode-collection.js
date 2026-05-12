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
    /**
     * Checks if a given value exists as a mode name in the collection.
     * @param Collection The mode collection to search
     * @param value The mode name to look for
     * @returns True if the value exists as a mode name, false otherwise
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
    /**
     * Retrieves a mode from the collection by name or index.
     * @param Collection The mode collection to search
     * @param index The mode name (string) or array index (number) to retrieve
     * @returns The Mode object if found, undefined otherwise
     */
    function get(Collection, index) {
        if (typeof index === 'string') {
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
    /**
     * Type guard to check if a value is a valid Mode object.
     * @param value The value to check
     * @returns True if the value is a Mode with name and documentation strings, false otherwise
     */
    function is(value) {
        if (typeof value === 'object' && typeof value.name === 'string' && typeof value.documentation === 'string') {
            return true;
        }
        return false;
    }
    Mode.is = is;
})(Mode || (exports.Mode = Mode = {}));
//# sourceMappingURL=mode-collection.js.map