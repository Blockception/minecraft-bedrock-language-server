"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_effect_diagnose = minecraft_effect_diagnose;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const types_1 = require("../../types");
function minecraft_effect_diagnose(value, diagnoser) {
    //Check if minecraft has effect data
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Effects.includes(value.text))
        return;
    diagnoser.add(value, "Effect does not exist: " + value.text, types_1.DiagnosticSeverity.error, "minecraft.effect.invalid");
}
//# sourceMappingURL=effect.js.map