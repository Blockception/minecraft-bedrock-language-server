"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Documentated = void 0;
/**The namespace for the documentated object*/
var Documentated;
(function (Documentated) {
    /**Checks if the given object implements Documentated interface
     * @param value The value to examinate
     * @returns*/
    function is(value) {
        if (value && typeof value.documentation === "string") {
            return true;
        }
        return false;
    }
    Documentated.is = is;
    /**Gets the documentation from either the carrier or creates new on and stores it in the carrier
     * @param data The data carrier.
     * @param create The function that creates a documentation*/
    function getOrCreate(data, create) {
        if (typeof data.documentation === "string") {
            return data.documentation;
        }
        const doc = create(data);
        data.documentation = doc;
        return doc;
    }
    Documentated.getOrCreate = getOrCreate;
})(Documentated || (exports.Documentated = Documentated = {}));
//# sourceMappingURL=documentated.js.map