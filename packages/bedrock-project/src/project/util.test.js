"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_project_1 = require("bc-minecraft-project");
const behavior_pack_1 = require("./behavior-pack/behavior-pack");
const pack_type_1 = require("./pack-type");
const resource_pack_1 = require("./resource-pack");
const util_1 = require("./util");
const world_1 = require("./world");
const emptyProject = bc_minecraft_project_1.MCProject.createEmpty();
const emptyManifest = {};
describe('Util', () => {
    const bp = new behavior_pack_1.BehaviorPack('c:\\bp', emptyProject, emptyManifest);
    const rp = new resource_pack_1.ResourcePack('c:\\rp', emptyProject, emptyManifest);
    const wp = new world_1.WorldPack('c:\\wp', emptyProject, emptyManifest);
    describe('GetPackType', () => {
        it('returns behavior_pack for a BehaviorPack', () => {
            expect(util_1.Util.GetPackType(bp)).toBe(pack_type_1.PackType.behavior_pack);
        });
        it('returns resource_pack for a ResourcePack', () => {
            expect(util_1.Util.GetPackType(rp)).toBe(pack_type_1.PackType.resource_pack);
        });
        it('returns world for a WorldPack', () => {
            expect(util_1.Util.GetPackType(wp)).toBe(pack_type_1.PackType.world);
        });
    });
    describe('IsResourcePack', () => {
        it('returns true for a ResourcePack', () => {
            expect(util_1.Util.IsResourcePack(rp)).toBe(true);
        });
        it('returns false for a BehaviorPack', () => {
            expect(util_1.Util.IsResourcePack(bp)).toBe(false);
        });
        it('returns false for a WorldPack', () => {
            expect(util_1.Util.IsResourcePack(wp)).toBe(false);
        });
    });
    describe('IsBehaviorPack', () => {
        it('returns true for a BehaviorPack', () => {
            expect(util_1.Util.IsBehaviorPack(bp)).toBe(true);
        });
        it('returns false for a ResourcePack', () => {
            expect(util_1.Util.IsBehaviorPack(rp)).toBe(false);
        });
        it('returns false for a WorldPack', () => {
            expect(util_1.Util.IsBehaviorPack(wp)).toBe(false);
        });
    });
    describe('IsWorldPack', () => {
        it('returns true for a WorldPack', () => {
            expect(util_1.Util.IsWorldPack(wp)).toBe(true);
        });
        it('returns false for a BehaviorPack', () => {
            expect(util_1.Util.IsWorldPack(bp)).toBe(false);
        });
        it('returns false for a ResourcePack', () => {
            expect(util_1.Util.IsWorldPack(rp)).toBe(false);
        });
    });
});
//# sourceMappingURL=util.test.js.map