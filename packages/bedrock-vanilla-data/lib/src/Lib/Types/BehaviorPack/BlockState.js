"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockState = void 0;
/**
 *
 */
var BlockState;
(function (BlockState) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value) {
            if (typeof value.name === "string" && typeof value.type === "string" && Array.isArray(value.values))
                return true;
        }
        return false;
    }
    BlockState.is = is;
    function isInt(value) {
        if (value) {
            if (value.type === "int")
                return true;
        }
        return false;
    }
    BlockState.isInt = isInt;
    function isBool(value) {
        if (value) {
            if (value.type === "bool")
                return true;
        }
        return false;
    }
    BlockState.isBool = isBool;
    function isString(value) {
        if (value) {
            if (value.type === "string")
                return true;
        }
        return false;
    }
    BlockState.isString = isString;
})(BlockState || (exports.BlockState = BlockState = {}));
//# sourceMappingURL=BlockState.js.map