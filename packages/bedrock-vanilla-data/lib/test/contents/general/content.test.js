"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../../src/main");
describe("Lib", () => {
    it("entity 1", () => {
        const entity = main_1.MinecraftData.BehaviorPack.getEntity("minecraft:creeper");
        if (!entity) {
            throw new Error("Expected an entity object");
        }
    });
    it("entity edu", () => {
        const entity = main_1.MinecraftData.BehaviorPack.getEntity("minecraft:agent", true);
        if (!entity) {
            throw new Error("Expected an entity object");
        }
    });
    //This is expected to fail
    it("entity edu fail", () => {
        const entity = main_1.MinecraftData.BehaviorPack.getEntity("minecraft:agent", false);
        if (entity) {
            throw new Error("Expected not an entity object");
        }
    });
});
//# sourceMappingURL=content.test.js.map