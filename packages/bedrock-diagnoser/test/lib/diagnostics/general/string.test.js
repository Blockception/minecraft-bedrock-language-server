"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = require("../../../../src/diagnostics/general");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const diagnoser_1 = require("../../../diagnoser");
describe("String", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, general_1.general_string_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("data"), B);
        (0, general_1.general_string_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create('"I am a valid minecraft string"'), B);
        (0, general_1.general_string_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("I_am_a_valid_minecraft_string"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, general_1.general_string_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create('I am a invalid minecraft string"'), B);
        (0, general_1.general_string_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create('"I am a invalid minecraft string'), B);
        (0, general_1.general_string_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("I am a invalid minecraft string"), B);
        B.expectAmount(3);
    });
});
//# sourceMappingURL=string.test.js.map