"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = exports.BlockState = void 0;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
/**
 * Namespace containing utility functions for working with BlockState objects.
 */
var BlockState;
(function (BlockState) {
    /**
     * Parses a string representation of a block state into a BlockState object.
     * Expected format is "property=value".
     * @param data The string to parse (e.g., "facing=north")
     * @returns A BlockState object if parsing succeeds, undefined otherwise
     */
    function parse(data) {
        const index = data.indexOf('=');
        if (index > -1) {
            const k = data.slice(0, index);
            const v = data.slice(index + 1);
            return { property: k, value: v };
        }
        return undefined;
    }
    BlockState.parse = parse;
    /**
     * Creates a new BlockState object from a property name and value.
     * @param property The name of the block state property
     * @param value The value of the block state property
     * @returns A new BlockState object
     */
    function create(property, value) {
        return {
            property: property,
            value: value,
        };
    }
    BlockState.create = create;
})(BlockState || (exports.BlockState = BlockState = {}));
/**
 * Namespace containing utility functions for working with Block objects.
 */
var Block;
(function (Block) {
    /**
     * Creates a new Block object with the given identifier and location.
     * @param id The block identifier (e.g., "minecraft:stone")
     * @param Location The location where this block is referenced
     * @returns A new Block object with an empty states array
     */
    function create(id, Location) {
        return {
            id: id,
            states: [],
            location: Location,
        };
    }
    Block.create = create;
    /**
     * Extracts the block identifier from a block description string.
     * If the description contains block states (indicated by '['), returns only the ID portion.
     * @param blockDescription A block description string (e.g., "minecraft:stone[variant=granite]")
     * @returns The block identifier without states (e.g., "minecraft:stone")
     */
    function getId(blockDescription) {
        const index = blockDescription.indexOf('[');
        if (index > -1) {
            return blockDescription.slice(0, index);
        }
        return blockDescription;
    }
    Block.getId = getId;
    /**
     * Extracts all block states from a block description string.
     * Parses the content between '[' and ']' and splits by comma.
     * @param blockDescription A block description string (e.g., "minecraft:stone[variant=granite,smooth=true]")
     * @returns An array of BlockState objects parsed from the description
     */
    function getStates(blockDescription) {
        const out = [];
        let startIndex = blockDescription.indexOf('[');
        if (startIndex > -1) {
            startIndex++;
            let endIndex = blockDescription.indexOf(']', startIndex + 1);
            if (endIndex < startIndex)
                endIndex = blockDescription.length;
            const parts = blockDescription.slice(startIndex, endIndex).split(',');
            for (let I = 0; I < parts.length; I++) {
                const b = BlockState.parse(parts[I]);
                if (b)
                    out.push(b);
            }
        }
        return out;
    }
    Block.getStates = getStates;
    /**
     * Creates a Block object from a complete block descriptor string.
     * Parses both the block identifier and any block states from the descriptor.
     * @param blockDescription A complete block descriptor (e.g., "minecraft:stone[variant=granite,smooth=true]")
     * @param Loc Optional location for the block; if not provided, creates an empty location
     * @returns A new Block object with the parsed id and states
     */
    function fromBlockDescriptor(blockDescription, Loc = undefined) {
        if (!Loc)
            Loc = bc_minecraft_bedrock_shared_1.Location.empty();
        const out = [];
        let id;
        let startIndex = blockDescription.indexOf('[');
        if (startIndex > -1) {
            id = blockDescription.slice(0, startIndex);
            startIndex++;
            let endIndex = blockDescription.indexOf(']', startIndex + 1);
            if (endIndex < startIndex)
                endIndex = blockDescription.length;
            const parts = blockDescription.slice(startIndex, endIndex).split(',');
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