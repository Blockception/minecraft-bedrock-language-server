import { assert } from "console";
import { Block } from "../../../src/Lib/Types/BehaviorPack";
import { Entity } from "../../../src/Lib/Types/BehaviorPack/Entity";
import { Item } from "../../../src/Lib/Types/BehaviorPack/Item";
import { MinecraftData } from "../../../src/main";
import { Check_Identifiable, Check_IsFunction, Test_Identifiable } from "../../identifiable";

describe("bp content", () => {
  it("blocks", () => {
    test_block(MinecraftData.edu.BehaviorPack.blocks);
    test_block(MinecraftData.vanilla.BehaviorPack.blocks);

    Check_IsFunction(MinecraftData.edu.BehaviorPack.blocks, Block.is);
    Check_IsFunction(MinecraftData.vanilla.BehaviorPack.blocks, Block.is);
  });

  it("entities", () => {
    test_entity(MinecraftData.edu.BehaviorPack.entities);
    test_entity(MinecraftData.vanilla.BehaviorPack.entities);

    Check_IsFunction(MinecraftData.edu.BehaviorPack.entities, Entity.is);
    Check_IsFunction(MinecraftData.vanilla.BehaviorPack.entities, Entity.is);
  });

  it("items", () => {
    test_item(MinecraftData.edu.BehaviorPack.items);
    test_item(MinecraftData.vanilla.BehaviorPack.items);

    Check_IsFunction(MinecraftData.edu.BehaviorPack.items, Item.is);
    Check_IsFunction(MinecraftData.vanilla.BehaviorPack.items, Item.is);
  });

  it("loot_tables", () => {
    Check_Identifiable(MinecraftData.edu.BehaviorPack.loot_tables);
    Check_Identifiable(MinecraftData.vanilla.BehaviorPack.loot_tables);
  });

  it("trading", () => {
    Check_Identifiable(MinecraftData.edu.BehaviorPack.trading);
    Check_Identifiable(MinecraftData.vanilla.BehaviorPack.trading);
  });
});

function test_block(Blocks: Block[]) {
  Check_Identifiable(Blocks);

  Blocks.forEach((block) => {
    Test_Identifiable(block);

    block.properties.forEach((property) => {
      assert(typeof property === "string", `${block.id} -> ${property} is not a string`);
    });
  });
}

function test_entity(Entities: Entity[]) {
  Check_Identifiable(Entities);

  Entities.forEach((entity) => {
    Test_Identifiable(entity);

    entity.events.forEach((event) => {
      assert(event.length > 0, `Event is not of proper length ${entity.id}`);
    });
  });
}

function test_item(Items: Item[]) {
  Check_Identifiable(Items);

  Items.forEach((item) => {
    Test_Identifiable(item);

    assert(item.max_damage >= 0, `Item max damage must be 0 or higher: ${item.max_damage}`);
  });
}
