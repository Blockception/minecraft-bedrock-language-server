"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_project_1 = require("bc-minecraft-project");
const resource_pack_1 = require("../resource-pack");
describe("Resourcepack", () => {
    describe("sanity check", () => {
        const RP = new resource_pack_1.ResourcePack("c:\\test", bc_minecraft_project_1.MCProject.createEmpty(), {});
        it("animation controllers", () => {
            expect(typeof RP.animation_controllers === "object").toBeTruthy();
        });
        it("animations", () => {
            expect(typeof RP.animations === "object").toBeTruthy();
        });
        it("attachables", () => {
            expect(typeof RP.attachables === "object").toBeTruthy();
        });
        it("block_culling", () => {
            expect(typeof RP.block_culling_rules === "object").toBeTruthy();
        });
        it("context", () => {
            expect(typeof RP.context === "object").toBeTruthy();
        });
        it("entities", () => {
            expect(typeof RP.entities === "object").toBeTruthy();
        });
        it("folder", () => {
            expect(typeof RP.folder === "string").toBeTruthy();
        });
        it("materials", () => {
            expect(typeof RP.materials === "object").toBeTruthy();
        });
        it("models", () => {
            expect(typeof RP.models === "object").toBeTruthy();
        });
        it("particles", () => {
            expect(typeof RP.particles === "object").toBeTruthy();
        });
        it("sounds", () => {
            expect(typeof RP.sounds === "object").toBeTruthy();
        });
        it("textures", () => {
            expect(typeof RP.textures === "object").toBeTruthy();
        });
    });
    describe("is", () => {
        const RP = new resource_pack_1.ResourcePack("c:\\test", bc_minecraft_project_1.MCProject.createEmpty(), {});
        it("Is resourcepack", () => {
            expect(resource_pack_1.ResourcePack.is(RP)).toBeTruthy();
        });
    });
});
//# sourceMappingURL=resource-pack.test.js.map