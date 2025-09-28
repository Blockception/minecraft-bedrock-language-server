"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const effect_1 = require("../../../../src/lib/diagnostics/minecraft/effect");
const diagnoser_1 = require("../../../diagnoser");
describe("Effect", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Loop over all vanilla versions
        bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Effects.forEach((effect) => (0, effect_1.minecraft_effect_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create(effect), B));
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Random words
        (0, effect_1.minecraft_effect_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("main"), B);
        (0, effect_1.minecraft_effect_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("calc"), B);
        (0, effect_1.minecraft_effect_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("spawn"), B);
        (0, effect_1.minecraft_effect_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("Spawn"), B);
        B.expectAmount(4);
    });
});
//# sourceMappingURL=effect.test.js.map