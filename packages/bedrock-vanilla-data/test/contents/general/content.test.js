"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
describe('Lib', () => {
    it('entity 1', () => {
        const entity = src_1.MinecraftData.BehaviorPack.getEntity('minecraft:creeper');
        if (!entity) {
            throw new Error('Expected an entity object');
        }
    });
    it('entity edu', () => {
        const entity = src_1.MinecraftData.BehaviorPack.getEntity('minecraft:agent', true);
        if (!entity) {
            throw new Error('Expected an entity object');
        }
    });
    //This is expected to fail
    it('entity edu fail', () => {
        const entity = src_1.MinecraftData.BehaviorPack.getEntity('minecraft:agent', false);
        if (entity) {
            throw new Error('Expected not an entity object');
        }
    });
});
//# sourceMappingURL=content.test.js.map