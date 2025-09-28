"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
/**The namespace that provides functions for blocks*/
var Block;
(function (Block) {
    /**Checks if the given object implements the block interface
     * @param value The object to check
     * @returns true or false if the object implements Block
     */
    function is(value) {
        if (value) {
            if (typeof value.id === "string" && Array.isArray(value.properties))
                return true;
        }
        return false;
    }
    Block.is = is;
})(Block || (exports.Block = Block = {}));
//# sourceMappingURL=Block.js.map