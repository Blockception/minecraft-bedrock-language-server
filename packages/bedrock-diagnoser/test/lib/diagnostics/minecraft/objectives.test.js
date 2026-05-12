"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("bc-minecraft-bedrock-project/src/project/general/types");
const minecraft_1 = require("../../../../src/diagnostics/minecraft");
const diagnoser_1 = require("../../../diagnoser");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
describe("Objective", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        const objectivesData = B.context.getProjectData().projectData.general.objectives;
        const objectives = ["test", "test.example", "Test_Example", "Test-Example"];
        objectives.forEach((o) => objectivesData.set(types_1.GeneralInfo.create(o, bc_minecraft_bedrock_shared_1.Location.create(""))));
        objectives.forEach((o) => (0, minecraft_1.minecraft_objectives_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create(o), B));
        B.expectAmount(0);
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        const objectivesData = B.context.getProjectData().projectData.general.objectives;
        const objectives = ["te/st", "test!example", "Test@Example", "Test#Example"];
        objectives.forEach((o) => objectivesData.set(types_1.GeneralInfo.create(o, bc_minecraft_bedrock_shared_1.Location.create(""))));
        objectives.forEach((o) => (0, minecraft_1.minecraft_objectives_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create(o), B));
        B.expectAmount(4);
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        const objectives = ["test", "test.example", "Test_Example", "Test-Example"];
        objectives.forEach((o) => (0, minecraft_1.minecraft_objectives_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create(o), B));
        B.expectAmount(4);
    });
});
//# sourceMappingURL=objectives.test.js.map