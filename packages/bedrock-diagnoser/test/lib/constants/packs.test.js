"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const packs_1 = require("../../../src/constants/packs");
describe('packs', () => {
    describe('packTypeToString', () => {
        it('returns "resourcepack" for resource_pack', () => {
            expect((0, packs_1.packTypeToString)(bc_minecraft_bedrock_project_1.PackType.resource_pack)).toBe('resourcepack');
        });
        it('returns "behaviorpack" for behavior_pack', () => {
            expect((0, packs_1.packTypeToString)(bc_minecraft_bedrock_project_1.PackType.behavior_pack)).toBe('behaviorpack');
        });
        it('returns "skinpack" for skin_pack', () => {
            expect((0, packs_1.packTypeToString)(bc_minecraft_bedrock_project_1.PackType.skin_pack)).toBe('skinpack');
        });
        it('returns "world" for world', () => {
            expect((0, packs_1.packTypeToString)(bc_minecraft_bedrock_project_1.PackType.world)).toBe('world');
        });
        it('returns "unknown" for unknown', () => {
            expect((0, packs_1.packTypeToString)(bc_minecraft_bedrock_project_1.PackType.unknown)).toBe('unknown');
        });
    });
});
//# sourceMappingURL=packs.test.js.map