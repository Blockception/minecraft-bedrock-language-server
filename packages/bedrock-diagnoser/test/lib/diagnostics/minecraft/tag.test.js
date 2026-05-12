"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("bc-minecraft-bedrock-project/src/project/general/types");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const tag_1 = require("../../../../src/diagnostics/minecraft/tag");
const diagnoser_1 = require("../../../diagnoser");
describe("Tag", () => {
    it("diagnose no errors", () => {
        const B = diagnoser_1.TestDiagnoser.create();
        const data = B.context.getProjectData().projectData;
        data.general.tags.set([
            types_1.GeneralInfo.create("init", bc_minecraft_bedrock_shared_1.Location.create(""), "main tickingarea"),
            types_1.GeneralInfo.create("Flying", bc_minecraft_bedrock_shared_1.Location.create(""), "main tickingarea"),
            types_1.GeneralInfo.create("Follow", bc_minecraft_bedrock_shared_1.Location.create(""), "main tickingarea"),
            types_1.GeneralInfo.create("Attack", bc_minecraft_bedrock_shared_1.Location.create(""), "main tickingarea"),
        ]);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("init"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("Flying"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("Follow"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("Attack"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create(""), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create('""'), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("main"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("calc"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("spawn"), B);
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("Spawn"), B);
        B.expectAmount(4);
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        const objectivesData = B.context.getProjectData().projectData.general.tags;
        const tags = ["te/st", "test!example", "Test@Example", "Test#Example"];
        tags.forEach((t) => objectivesData.set(types_1.GeneralInfo.create(t, bc_minecraft_bedrock_shared_1.Location.create(""))));
        tags.forEach((t) => (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create(t), B));
        B.expectAmount(4);
    });
    it("diagnose tag defined in entity queue_command", () => {
        const B = diagnoser_1.TestDiagnoser.create();
        const data = B.context.getProjectData().projectData;
        // Simulate a tag being defined in an entity queue_command event
        data.general.tags.set([
            types_1.GeneralInfo.create("test", bc_minecraft_bedrock_shared_1.Location.create("file:///bp/entities/test.json"), "Entity event command"),
        ]);
        // This should not produce an error since the tag is defined
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("test"), B);
        B.expectEmpty();
    });
    it("diagnose no errors for quoted tags with spaces", () => {
        const B = diagnoser_1.TestDiagnoser.create();
        const data = B.context.getProjectData().projectData;
        // Tag defined with spaces (stored unquoted after Text.UnQuote fix)
        data.general.tags.set(types_1.GeneralInfo.create("hello there", bc_minecraft_bedrock_shared_1.Location.create(""), "tag with spaces"));
        // When the selector tag= argument is quoted, the value arrives with surrounding quotes
        (0, tag_1.minecraft_tag_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create('"hello there"'), B);
        B.expectEmpty();
    });
});
//# sourceMappingURL=tag.test.js.map