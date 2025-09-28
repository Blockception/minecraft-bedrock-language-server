"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_coordinate_diagnose = minecraft_coordinate_diagnose;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
function minecraft_coordinate_diagnose(value, diagnoser) {
    if (bc_minecraft_bedrock_types_1.Minecraft.Coordinate.is(value.text))
        return true;
    diagnoser.add(value, "Invalid coordinate value: " + value.text, types_1.DiagnosticSeverity.error, "minecraft.coordinate.invalid");
    return false;
}
//# sourceMappingURL=coordinate.js.map