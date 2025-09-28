"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCulling = void 0;
/**
 * Namespace for Block Culling functionality.
 */
var BlockCulling;
(function (BlockCulling) {
    /**
     * Type guard function to check if a value is of type BlockCulling.
     * @param value - The value to check.
     * @returns True if the value is of type BlockCulling, false otherwise.
     */
    function is(value) {
        if (typeof value === "object") {
            const rules = value["minecraft:block_culling_rules"];
            if (typeof rules === "object") {
                return true;
            }
        }
        return false;
    }
    BlockCulling.is = is;
})(BlockCulling || (exports.BlockCulling = BlockCulling = {}));
//# sourceMappingURL=block-culling.js.map