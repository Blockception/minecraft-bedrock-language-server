"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("bc-minecraft-bedrock-project/src/project/general/types");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const tickingarea_1 = require("../../../../src/diagnostics/minecraft/tickingarea");
const diagnoser_1 = require("../../../diagnoser");
describe("Tickingarea", () => {
    it("diagnose no errors", () => {
        const B = diagnoser_1.TestDiagnoser.create();
        const data = B.context.getProjectData().projectData;
        data.general.tickingAreas.set([
            types_1.GeneralInfo.create("main", bc_minecraft_bedrock_shared_1.Location.create(""), "main tickingarea"),
            types_1.GeneralInfo.create("calc", bc_minecraft_bedrock_shared_1.Location.create(""), "calculation area"),
            types_1.GeneralInfo.create("spawn", bc_minecraft_bedrock_shared_1.Location.create(""), "spawn location"),
            types_1.GeneralInfo.create("Spawn", bc_minecraft_bedrock_shared_1.Location.create(""), "spawn location"),
        ]);
        (0, tickingarea_1.minecraft_tickingarea_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("main"), B);
        (0, tickingarea_1.minecraft_tickingarea_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("calc"), B);
        (0, tickingarea_1.minecraft_tickingarea_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("spawn"), B);
        (0, tickingarea_1.minecraft_tickingarea_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("Spawn"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, tickingarea_1.minecraft_tickingarea_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("main"), B);
        (0, tickingarea_1.minecraft_tickingarea_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("calc"), B);
        (0, tickingarea_1.minecraft_tickingarea_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("spawn"), B);
        (0, tickingarea_1.minecraft_tickingarea_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("Spawn"), B);
        B.expectAmount(4);
    });
});
//# sourceMappingURL=tickingarea.test.js.map