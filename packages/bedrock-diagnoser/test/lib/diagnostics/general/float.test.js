"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const float_1 = require("../../../../src/diagnostics/general/float");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const diagnoser_1 = require("../../../diagnoser");
describe("Float", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("1.0"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("0.23347"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("12308.795"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("-135743.2"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("foo"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("one"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("*13211/"), B);
        (0, float_1.general_float_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("*13.2/"), B);
        B.expectAmount(4);
    });
});
//# sourceMappingURL=float.test.js.map