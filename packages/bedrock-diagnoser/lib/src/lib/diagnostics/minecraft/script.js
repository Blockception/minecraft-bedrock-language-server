"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_script = diagnose_script;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
/**
 *
 * @param builder
 * @param script
 * @param Animations
 * @param Controllers
 * @returns
 */
function diagnose_script(builder, script, Animations, Controllers) {
    if (script === undefined)
        return;
    if (script.animate) {
        const animates = script.animate;
        bc_minecraft_bedrock_types_1.Types.Conditional.forEach(animates, (ref_id) => has_ref(builder, ref_id, Animations, Controllers));
    }
}
function has_ref(diagnoser, ref_id, Animations, Controllers) {
    if (Animations && Animations[ref_id] !== undefined)
        return;
    if (Controllers && Controllers[ref_id] !== undefined)
        return;
    diagnoser.add(`scripts/animate/${ref_id}`, "Cannot find animation or controller definition of: " + ref_id, types_1.DiagnosticSeverity.error, "minecraft.script.animate.missing");
}
//# sourceMappingURL=script.js.map