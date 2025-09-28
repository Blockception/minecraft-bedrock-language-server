"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const coordinate_1 = require("../../../../src/lib/diagnostics/minecraft/coordinate");
const diagnoser_1 = require("../../../diagnoser");
describe("Coordinate", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Loop over all vanilla versions
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("+16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("-16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("^16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("~16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("123"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("-1"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("^"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("~"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("^-16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("~+54"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Random words
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("&16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("*4341"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("x"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create("y"), B);
        B.expectAmount(4);
    });
});
//# sourceMappingURL=coordinate.test.js.map