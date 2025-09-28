"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const diagnose_1 = require("../../../../src/lib/diagnostics/mode/diagnose");
const diagnoser_1 = require("../../../diagnoser");
describe("Mode SlotID", () => {
    it("range check max", () => {
        const commtext = "replaceitem entity @s slot.hotbar 8 example:item 1 0";
        const comm = bc_minecraft_bedrock_command_1.Command.parse(commtext);
        const diagnoser = new diagnoser_1.TestDiagnoser();
        (0, diagnose_1.mode_slotid_diagnose)(comm.parameters[4], comm, diagnoser);
        diagnoser.expectEmpty();
    });
    it("range check min", () => {
        const commtext = "replaceitem entity @s slot.hotbar 0 example:item 1 0";
        const comm = bc_minecraft_bedrock_command_1.Command.parse(commtext);
        const diagnoser = new diagnoser_1.TestDiagnoser();
        (0, diagnose_1.mode_slotid_diagnose)(comm.parameters[4], comm, diagnoser);
        diagnoser.expectEmpty();
    });
    it("range check error", () => {
        const commtext = "replaceitem entity @s slot.hotbar 9 example:item 1 0";
        const comm = bc_minecraft_bedrock_command_1.Command.parse(commtext);
        const diagnoser = new diagnoser_1.TestDiagnoser();
        (0, diagnose_1.mode_slotid_diagnose)(comm.parameters[4], comm, diagnoser);
        diagnoser.expectAmount(1);
    });
});
//# sourceMappingURL=slotid.test.js.map