"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_check_command = minecraft_check_command;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const types_1 = require("../../types");
/**
 *
 * @param blockDescriptor
 * @param diagnoser
 */
function minecraft_check_command(command, diagnoser, edu) {
    if ((0, bc_minecraft_bedrock_command_1.hasCommandData)(command.text, edu))
        return;
    diagnoser.add(command, "Command does not exist: " + command.text, types_1.DiagnosticSeverity.error, "minecraft.commands.invalid");
}
//# sourceMappingURL=commands.js.map