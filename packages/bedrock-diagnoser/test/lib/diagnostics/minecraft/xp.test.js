"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const xp_1 = require("../../../../src/diagnostics/minecraft/xp");
const diagnoser_1 = require("../../../diagnoser");
describe("XP", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, xp_1.minecraft_xp_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("123"), B);
        (0, xp_1.minecraft_xp_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("123L"), B);
        (0, xp_1.minecraft_xp_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("-1000L"), B);
        (0, xp_1.minecraft_xp_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("1000L"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, xp_1.minecraft_xp_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("123XP"), B);
        (0, xp_1.minecraft_xp_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("123LXP"), B);
        (0, xp_1.minecraft_xp_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("-1000LXP"), B);
        (0, xp_1.minecraft_xp_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("one"), B);
        B.expectAmount(4);
    });
});
//# sourceMappingURL=xp.test.js.map