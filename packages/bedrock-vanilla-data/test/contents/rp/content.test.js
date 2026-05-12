"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const resourcepack_1 = require("../../../src/lib/types/resourcepack");
const src_1 = require("../../../src");
const identifiable_1 = require("../../identifiable");
describe('rp content', () => {
    it('animation controllers', () => {
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.edu.ResourcePack.animationControllers);
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.vanilla.ResourcePack.animationControllers);
        expect(src_1.MinecraftData.ResourcePack.getAnimationController('controller.animation.wolf.shaking')).toBeDefined();
    });
    it('animations', () => {
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.edu.ResourcePack.animations);
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.vanilla.ResourcePack.animations);
    });
    it('entities', () => {
        test_entity(src_1.MinecraftData.edu.ResourcePack.entities);
        test_entity(src_1.MinecraftData.vanilla.ResourcePack.entities);
    });
    it('fogs', () => {
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.edu.ResourcePack.fogs);
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.vanilla.ResourcePack.fogs);
    });
    it('materials', () => {
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.edu.ResourcePack.materials);
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.vanilla.ResourcePack.materials);
    });
    it('models', () => {
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.edu.ResourcePack.models);
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.vanilla.ResourcePack.models);
    });
    it('particles', () => {
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.edu.ResourcePack.particles);
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.vanilla.ResourcePack.particles);
    });
    it('render_controllers', () => {
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.edu.ResourcePack.renderControllers);
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.vanilla.ResourcePack.renderControllers);
    });
    it('sounds', () => {
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.edu.ResourcePack.sounds);
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.vanilla.ResourcePack.sounds);
    });
    it('textures', () => {
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.edu.ResourcePack.textures);
        (0, identifiable_1.Check_Identifiable)(src_1.MinecraftData.vanilla.ResourcePack.textures);
    });
});
function test_entity(Entities) {
    (0, identifiable_1.Check_Identifiable)(Entities);
    (0, identifiable_1.Check_IsFunction)(Entities, resourcepack_1.Entity.is);
    Entities.forEach((entity) => {
        (0, identifiable_1.Test_Identifiable)(entity);
        entity.animations.forEach((animation) => {
            (0, console_1.assert)(animation.length > 0, `Animation is not of proper length ${entity.id}`);
        });
    });
}
//# sourceMappingURL=content.test.js.map