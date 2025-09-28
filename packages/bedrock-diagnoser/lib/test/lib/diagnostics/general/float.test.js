"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const float_1 = require("../../../../src/lib/diagnostics/general/float");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const diagnoser_1 = require("../../../diagnoser");
describe("Float", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("1.0"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("0.23347"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("12308.795"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("-135743.2"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("foo"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("one"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("*13211/"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("*13.2/"), B);
        B.expectAmount(4);
    });
});
//# sourceMappingURL=float.test.js.map