"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_xp_diagnose = minecraft_xp_diagnose;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
function minecraft_xp_diagnose(value, diagnoser) {
    if (bc_minecraft_bedrock_types_1.Minecraft.XP.is(value.text))
        return;
    diagnoser.add(value, "Invalid xp value: " + value.text, types_1.DiagnosticSeverity.error, "minecraft.xp.invalid");
}
//# sourceMappingURL=xp.js.map