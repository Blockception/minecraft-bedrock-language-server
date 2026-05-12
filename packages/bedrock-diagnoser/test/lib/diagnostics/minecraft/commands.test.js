"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const commands_1 = require("../../../../src/diagnostics/minecraft/commands");
const diagnoser_1 = require("../../../diagnoser");
describe("Command", () => {
    it("diagnose no errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Loop over all vanilla versions
        (0, commands_1.minecraft_check_command)(bc_minecraft_bedrock_shared_1.OffsetWord.create("playsound"), B, false);
        (0, commands_1.minecraft_check_command)(bc_minecraft_bedrock_shared_1.OffsetWord.create("tellraw"), B, false);
        (0, commands_1.minecraft_check_command)(bc_minecraft_bedrock_shared_1.OffsetWord.create("dialogue"), B, false);
        (0, commands_1.minecraft_check_command)(bc_minecraft_bedrock_shared_1.OffsetWord.create("event"), B, false);
        (0, commands_1.minecraft_check_command)(bc_minecraft_bedrock_shared_1.OffsetWord.create("ability"), B, true);
        B.expectEmpty();
    });
    it("diagnose with errors", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Random words
        (0, commands_1.minecraft_check_command)(bc_minecraft_bedrock_shared_1.OffsetWord.create("detect"), B, false);
        (0, commands_1.minecraft_check_command)(bc_minecraft_bedrock_shared_1.OffsetWord.create("netherfortress"), B, false);
        B.expectAmount(2);
    });
});
//# sourceMappingURL=commands.test.js.map