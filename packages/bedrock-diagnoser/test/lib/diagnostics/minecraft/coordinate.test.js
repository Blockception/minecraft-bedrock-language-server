"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const coordinate_1 = require("../../../../src/diagnostics/minecraft/coordinate");
const diagnoser_1 = require("../../../diagnoser");
describe("Coordinate", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Loop over all vanilla versions
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("+16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("-16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("^16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("~16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("123"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("-1"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("^"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("~"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("^-16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("~+54"), B);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Random words
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("&16"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("*4341"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("x"), B);
        (0, coordinate_1.minecraft_coordinate_diagnose)(bc_minecraft_bedrock_shared_1.OffsetWord.create("y"), B);
        B.expectAmount(4);
    });
});
//# sourceMappingURL=coordinate.test.js.map