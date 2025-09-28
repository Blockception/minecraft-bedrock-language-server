"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolangParameter = exports.MolangFunction = void 0;
/**
 *
 */
var MolangFunction;
(function (MolangFunction) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object") {
            if (typeof value.id === "string")
                return true;
        }
        return false;
    }
    MolangFunction.is = is;
})(MolangFunction || (exports.MolangFunction = MolangFunction = {}));
/**
 *
 */
var MolangParameter;
(function (MolangParameter) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object") {
            if (typeof value.id === "string")
                return true;
        }
        return false;
    }
    MolangParameter.is = is;
})(MolangParameter || (exports.MolangParameter = MolangParameter = {}));
//# sourceMappingURL=molang-function.js.map