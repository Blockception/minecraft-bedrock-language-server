"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("bc-minecraft-bedrock-project/lib/src/project/general/types");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_2 = require("bc-minecraft-bedrock-types/lib/types");
const tag_1 = require("../../../../src/lib/diagnostics/minecraft/tag");
const diagnoser_1 = require("../../../diagnoser");
describe("Tag", () => {
    it("diagnose no errors", () => {
        const B = diagnoser_1.TestDiagnoser.create();
        const data = B.context.getProjectData().projectData;
        data.general.tags.set([
            types_1.GeneralInfo.create("init", types_2.Location.create(""), "main tickingarea"),
            types_1.GeneralInfo.create("Flying", types_2.Location.create(""), "main tickingarea"),
            types_1.GeneralInfo.create("Follow", types_2.Location.create(""), "main tickingarea"),
            types_1.GeneralInfo.create("Attack", types_2.Location.create(""), "main tickingarea"),
        ]);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("init"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("Flying"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("Follow"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("Attack"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create(""), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("main"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("calc"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("spawn"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("Spawn"), B);
        B.expectAmount(4);
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        const objectivesData = B.context.getProjectData().projectData.general.tags;
        const tags = ["te/st", "test!example", "Test@Example", "Test#Example"];
        tags.forEach((t) => objectivesData.set(types_1.GeneralInfo.create(t, types_2.Location.create(""))));
        tags.forEach((t) => (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create(t), B));
        B.expectAmount(4);
    });
});
//# sourceMappingURL=tag.test.js.map