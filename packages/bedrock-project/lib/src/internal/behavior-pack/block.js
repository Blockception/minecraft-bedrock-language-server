"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
/** */
var Block;
(function (Block) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && typeof value.format_version === "string" && typeof value["minecraft:block"] === "object") {
            const b = value["minecraft:block"];
            if (typeof b.description === "object" &&
                typeof b.description.identifier === "string" &&
                typeof b.components === "object") {
                return true;
            }
        }
        return false;
    }
    Block.is = is;
})(Block || (exports.Block = Block = {}));
//# sourceMappingURL=block.js.map