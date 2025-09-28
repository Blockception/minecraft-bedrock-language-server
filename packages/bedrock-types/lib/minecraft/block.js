"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = exports.BlockState = void 0;
const types_1 = require("../types");
/**TODO add documentation
 *
 */
var BlockState;
(function (BlockState) {
    /**TODO add documentation
     *
     * @param data
     * @returns
     */
    function parse(data) {
        const index = data.indexOf("=");
        if (index > -1) {
            const k = data.slice(0, index);
            const v = data.slice(index + 1);
            return { property: k, value: v };
        }
        return undefined;
    }
    BlockState.parse = parse;
    /**TODO add documentation
     *
     * @param property
     * @param value
     * @returns
     */
    function create(property, value) {
        return {
            property: property,
            value: value,
        };
    }
    BlockState.create = create;
})(BlockState || (exports.BlockState = BlockState = {}));
/**TODO add documentation
 *
 */
var Block;
(function (Block) {
    /**TODO add documentation
     *
     * @param id
     * @param Location
     * @returns
     */
    function create(id, Location) {
        return {
            id: id,
            states: [],
            location: Location,
        };
    }
    Block.create = create;
    /**TODO add documentation
     *
     * @param blockDescription
     * @returns
     */
    function getId(blockDescription) {
        const index = blockDescription.indexOf("[");
        if (index > -1) {
            return blockDescription.slice(0, index);
        }
        return blockDescription;
    }
    Block.getId = getId;
    /**TODO add documentation
     *
     * @param blockDescription
     * @returns
     */
    function getStates(blockDescription) {
        const out = [];
        let startIndex = blockDescription.indexOf("[");
        if (startIndex > -1) {
            startIndex++;
            let endIndex = blockDescription.indexOf("]", startIndex + 1);
            if (endIndex < startIndex)
                endIndex = blockDescription.length;
            const parts = blockDescription.slice(startIndex, endIndex).split(",");
            for (let I = 0; I < parts.length; I++) {
                const b = BlockState.parse(parts[I]);
                if (b)
                    out.push(b);
            }
        }
        return out;
    }
    Block.getStates = getStates;
    /**TODO add documentation
     *
     * @param blockDescription
     */
    function fromBlockDescriptor(blockDescription, Loc = undefined) {
        if (!Loc)
            Loc = types_1.Location.empty();
        const out = [];
        let id;
        let startIndex = blockDescription.indexOf("[");
        if (startIndex > -1) {
            id = blockDescription.slice(0, startIndex);
            startIndex++;
            let endIndex = blockDescription.indexOf("]", startIndex + 1);
            if (endIndex < startIndex)
                endIndex = blockDescription.length;
            const parts = blockDescription.slice(startIndex, endIndex).split(",");
            for (let I = 0; I < parts.length; I++) {
                const b = BlockState.parse(parts[I]);
                if (b)
                    out.push(b);
            }
        }
        else {
            id = blockDescription;
        }
        const block = Block.create(id, Loc);
        block.states = out;
        return block;
    }
    Block.fromBlockDescriptor = fromBlockDescriptor;
})(Block || (exports.Block = Block = {}));
//# sourceMappingURL=block.js.map