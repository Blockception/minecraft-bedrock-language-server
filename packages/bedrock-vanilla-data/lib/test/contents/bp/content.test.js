"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const BehaviorPack_1 = require("../../../src/Lib/Types/BehaviorPack");
const Entity_1 = require("../../../src/Lib/Types/BehaviorPack/Entity");
const Item_1 = require("../../../src/Lib/Types/BehaviorPack/Item");
const main_1 = require("../../../src/main");
const identifiable_1 = require("../../identifiable");
describe("bp content", () => {
    it("blocks", () => {
        test_block(main_1.MinecraftData.edu.BehaviorPack.blocks);
        test_block(main_1.MinecraftData.vanilla.BehaviorPack.blocks);
        (0, identifiable_1.Check_IsFunction)(main_1.MinecraftData.edu.BehaviorPack.blocks, BehaviorPack_1.Block.is);
        (0, identifiable_1.Check_IsFunction)(main_1.MinecraftData.vanilla.BehaviorPack.blocks, BehaviorPack_1.Block.is);
    });
    it("entities", () => {
        test_entity(main_1.MinecraftData.edu.BehaviorPack.entities);
        test_entity(main_1.MinecraftData.vanilla.BehaviorPack.entities);
        (0, identifiable_1.Check_IsFunction)(main_1.MinecraftData.edu.BehaviorPack.entities, Entity_1.Entity.is);
        (0, identifiable_1.Check_IsFunction)(main_1.MinecraftData.vanilla.BehaviorPack.entities, Entity_1.Entity.is);
    });
    it("items", () => {
        test_item(main_1.MinecraftData.edu.BehaviorPack.items);
        test_item(main_1.MinecraftData.vanilla.BehaviorPack.items);
        (0, identifiable_1.Check_IsFunction)(main_1.MinecraftData.edu.BehaviorPack.items, Item_1.Item.is);
        (0, identifiable_1.Check_IsFunction)(main_1.MinecraftData.vanilla.BehaviorPack.items, Item_1.Item.is);
    });
    it("loot_tables", () => {
        (0, identifiable_1.Check_Identifiable)(main_1.MinecraftData.edu.BehaviorPack.loot_tables);
        (0, identifiable_1.Check_Identifiable)(main_1.MinecraftData.vanilla.BehaviorPack.loot_tables);
    });
    it("trading", () => {
        (0, identifiable_1.Check_Identifiable)(main_1.MinecraftData.edu.BehaviorPack.trading);
        (0, identifiable_1.Check_Identifiable)(main_1.MinecraftData.vanilla.BehaviorPack.trading);
    });
});
function test_block(Blocks) {
    (0, identifiable_1.Check_Identifiable)(Blocks);
    Blocks.forEach((block) => {
        (0, identifiable_1.Test_Identifiable)(block);
        block.properties.forEach((property) => {
            (0, console_1.assert)(typeof property === "string", `${block.id} -> ${property} is not a string`);
        });
    });
}
function test_entity(Entities) {
    (0, identifiable_1.Check_Identifiable)(Entities);
    Entities.forEach((entity) => {
        (0, identifiable_1.Test_Identifiable)(entity);
        entity.events.forEach((event) => {
            (0, console_1.assert)(event.length > 0, `Event is not of proper length ${entity.id}`);
        });
    });
}
function test_item(Items) {
    (0, identifiable_1.Check_Identifiable)(Items);
    Items.forEach((item) => {
        (0, identifiable_1.Test_Identifiable)(item);
        (0, console_1.assert)(item.max_damage >= 0, `Item max damage must be 0 or higher: ${item.max_damage}`);
    });
}
//# sourceMappingURL=content.test.js.map