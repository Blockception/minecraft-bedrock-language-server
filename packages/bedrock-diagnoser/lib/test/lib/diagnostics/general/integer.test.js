"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = require("../../../../src/lib/diagnostics/general");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const diagnoser_1 = require("../../../diagnoser");
describe("Integer", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, general_1.general_integer_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("0"), B);
        (0, general_1.general_integer_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("12345"), B);
        (0, general_1.general_integer_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("-9513213"), B);
        (0, general_1.general_integer_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("5646"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, general_1.general_integer_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("foo"), B);
        (0, general_1.general_integer_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("one"), B);
        (0, general_1.general_integer_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("1.2"), B);
        (0, general_1.general_integer_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("*13211/"), B);
        (0, general_1.general_integer_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("*13.2/"), B);
        B.expectAmount(5);
    });
});
//# sourceMappingURL=integer.test.js.map