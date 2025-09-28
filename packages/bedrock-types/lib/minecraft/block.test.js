"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("./block");
const location_1 = require("../types/location");
const blockDescription = "minecraft:log[direction=west,stripped=true,half=top]";
const blockID = "minecraft:log";
const blockStates = [
    { property: "direction", value: "west" },
    { property: "stripped", value: "true" },
    { property: "half", value: "top" },
];
describe("Block", () => {
    it("get id works", () => {
        const id = block_1.Block.getId(blockDescription);
        expect(id).toEqual(blockID);
    });
    it("get states", () => {
        const states = block_1.Block.getStates(blockDescription);
        expect(states).toEqual(expect.arrayContaining(blockStates));
    });
    it("parse", () => {
        const block = block_1.Block.fromBlockDescriptor(blockDescription, location_1.Location.create("", 0));
        expect(block.id).toEqual(blockID);
        expect(block.states).toEqual(expect.arrayContaining(blockStates));
    });
});
//# sourceMappingURL=block.test.js.map