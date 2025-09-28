"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockState = void 0;
/** */
var BlockState;
(function (BlockState) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && typeof value.name === "string" && typeof value.type === "string") {
            if (typeof value.type === "string") {
                if (Array.isArray(value.values))
                    return true;
            }
        }
        return false;
    }
    BlockState.is = is;
    /**
     *
     * @param name
     * @param values
     * @returns
     */
    function create(name, values) {
        const f = typeof values[0];
        switch (f) {
            case "boolean":
                return {
                    name: name,
                    type: "bool",
                    values: values,
                };
            default:
            case "string":
                return {
                    name: name,
                    type: "string",
                    values: values,
                };
            case "number":
                return {
                    name: name,
                    type: "int",
                    values: values,
                };
        }
    }
    BlockState.create = create;
})(BlockState || (exports.BlockState = BlockState = {}));
//# sourceMappingURL=block-state.js.map