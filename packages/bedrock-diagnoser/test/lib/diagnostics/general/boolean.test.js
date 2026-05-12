"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_1 = require("../../../../src/diagnostics/general/boolean");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const diagnoser_1 = require("../../../diagnoser");
describe("Boolean", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, boolean_1.general_boolean_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("true"), B);
        (0, boolean_1.general_boolean_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("True"), B);
        (0, boolean_1.general_boolean_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("false"), B);
        (0, boolean_1.general_boolean_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("False"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, boolean_1.general_boolean_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("t"), B);
        (0, boolean_1.general_boolean_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("a"), B);
        (0, boolean_1.general_boolean_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("f"), B);
        (0, boolean_1.general_boolean_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("-"), B);
        B.expectAmount(4);
    });
});
//# sourceMappingURL=boolean.test.js.map