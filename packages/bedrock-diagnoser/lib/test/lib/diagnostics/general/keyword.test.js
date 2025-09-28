"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = require("../../../../src/lib/diagnostics/general");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const diagnoser_1 = require("../../../diagnoser");
describe("Keyword", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, general_1.general_keyword_diagnose)("playsound", bc_minecraft_bedrock_types_1.Types.OffsetWord.create("playsound"), B);
        (0, general_1.general_keyword_diagnose)("@a", bc_minecraft_bedrock_types_1.Types.OffsetWord.create("@a"), B);
        (0, general_1.general_keyword_diagnose)("invalid keyword but still expect to work", bc_minecraft_bedrock_types_1.Types.OffsetWord.create("invalid keyword but still expect to work"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        (0, general_1.general_keyword_diagnose)("asd", bc_minecraft_bedrock_types_1.Types.OffsetWord.create("playsound"), B);
        (0, general_1.general_keyword_diagnose)("@s", bc_minecraft_bedrock_types_1.Types.OffsetWord.create("@a"), B);
        (0, general_1.general_keyword_diagnose)("invalid keyword but still expect to work", bc_minecraft_bedrock_types_1.Types.OffsetWord.create("I am different"), B);
        B.expectAmount(3);
    });
});
//# sourceMappingURL=keyword.test.js.map