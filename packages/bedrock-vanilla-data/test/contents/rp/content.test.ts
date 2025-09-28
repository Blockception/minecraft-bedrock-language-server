import { assert } from "console";
import { Entity } from "../../../src/Lib/Types/ResourcePack/Entity";
import { MinecraftData } from "../../../src/main";
import { Check_Identifiable, Check_IsFunction, Test_Identifiable } from "../../identifiable";

describe("rp content", () => {
  it("animation controllers", () => {
    Check_Identifiable(MinecraftData.edu.ResourcePack.animation_controllers);
    Check_Identifiable(MinecraftData.vanilla.ResourcePack.animation_controllers);

    expect(MinecraftData.ResourcePack.getAnimationController("controller.animation.wolf.shaking")).toBeDefined();
  });

  it("animations", () => {
    Check_Identifiable(MinecraftData.edu.ResourcePack.animations);
    Check_Identifiable(MinecraftData.vanilla.ResourcePack.animations);
  });

  it("entities", () => {
    test_entity(MinecraftData.edu.ResourcePack.entities);
    test_entity(MinecraftData.vanilla.ResourcePack.entities);
  });

  it("fogs", () => {
    Check_Identifiable(MinecraftData.edu.ResourcePack.fogs);
    Check_Identifiable(MinecraftData.vanilla.ResourcePack.fogs);
  });

  it("materials", () => {
    Check_Identifiable(MinecraftData.edu.ResourcePack.materials);
    Check_Identifiable(MinecraftData.vanilla.ResourcePack.materials);
  });

  it("models", () => {
    Check_Identifiable(MinecraftData.edu.ResourcePack.models);
    Check_Identifiable(MinecraftData.vanilla.ResourcePack.models);
  });

  it("particles", () => {
    Check_Identifiable(MinecraftData.edu.ResourcePack.particles);
    Check_Identifiable(MinecraftData.vanilla.ResourcePack.particles);
  });

  it("render_controllers", () => {
    Check_Identifiable(MinecraftData.edu.ResourcePack.render_controllers);
    Check_Identifiable(MinecraftData.vanilla.ResourcePack.render_controllers);
  });

  it("sounds", () => {
    Check_Identifiable(MinecraftData.edu.ResourcePack.sounds);
    Check_Identifiable(MinecraftData.vanilla.ResourcePack.sounds);
  });

  it("textures", () => {
    Check_Identifiable(MinecraftData.edu.ResourcePack.textures);
    Check_Identifiable(MinecraftData.vanilla.ResourcePack.textures);
  });
});

function test_entity(Entities: Entity[]) {
  Check_Identifiable(Entities);
  Check_IsFunction(Entities, Entity.is);

  Entities.forEach((entity) => {
    Test_Identifiable(entity);

    entity.animations.forEach((animation) => {
      assert(animation.length > 0, `Animation is not of proper length ${entity.id}`);
    });
  });
}
