"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mode_time_diagnose = exports.mode_teleport_rules_diagnose = exports.mode_structure_animation_diagnose = exports.mode_slot_type_diagnose = exports.mode_selector_type_diagnose = exports.mode_selector_attribute_diagnose = exports.mode_scan_diagnose = exports.mode_save_diagnose = exports.mode_rotation_diagnose = exports.mode_ride_rules_diagnose = exports.mode_ride_fill_diagnose = exports.mode_replace_diagnose = exports.mode_permission_state_diagnose = exports.mode_permission_diagnose = exports.mode_operation_diagnose = exports.mode_old_block_diagnose = exports.mode_music_repeat_diagnose = exports.mode_mirror_diagnose = exports.mode_mask_diagnose = exports.mode_locate_feature_diagnose = exports.mode_hud_element_diagnose = exports.mode_hud_visibility_diagnose = exports.mode_handtype_diagnose = exports.mode_gamemode_diagnose = exports.mode_fill_diagnose = exports.mode_easing_diagnose = exports.mode_dimension_diagnose = exports.mode_difficulty_diagnose = exports.mode_clone_diagnose = exports.mode_cause_type_diagnose = exports.mode_camera_shake_diagnose = void 0;
exports.mode_slotid_diagnose = mode_slotid_diagnose;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
const definitions_1 = require("../definitions");
exports.mode_camera_shake_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.CameraShake);
exports.mode_cause_type_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.CauseType);
exports.mode_clone_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Clone);
exports.mode_difficulty_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Difficulty);
exports.mode_dimension_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Dimension);
exports.mode_easing_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Easing);
exports.mode_fill_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Fill);
exports.mode_gamemode_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Gamemode);
exports.mode_handtype_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.HandType);
exports.mode_hud_visibility_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.HudVisibility);
exports.mode_hud_element_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.HudElement);
exports.mode_locate_feature_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.LocateFeature);
exports.mode_mask_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Mask);
exports.mode_mirror_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Mirror);
exports.mode_music_repeat_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.MusicRepeat);
exports.mode_old_block_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.OldBlock);
exports.mode_operation_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Operation);
exports.mode_permission_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Permission);
exports.mode_permission_state_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.PermissionState);
exports.mode_replace_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Replace);
exports.mode_ride_fill_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.RideFill);
exports.mode_ride_rules_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.RideRules);
exports.mode_rotation_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Rotation);
exports.mode_save_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Save);
exports.mode_scan_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Scan);
exports.mode_selector_attribute_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.SelectorAttribute);
exports.mode_selector_type_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.SelectorType);
exports.mode_slot_type_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.SlotType);
exports.mode_structure_animation_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.StructureAnimation);
exports.mode_teleport_rules_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.TeleportRules);
exports.mode_time_diagnose = mode_generic_diagnose(bc_minecraft_bedrock_types_1.Modes.Time);
/**
 * Diagnoses the value a generic collection of modes
 * @param value The value to evaluate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to
 * @returns true or false, false is any error was found*/
function mode_generic_diagnose(Mode) {
    return function (value, diagnoser) {
        const m = Mode.get(value.text);
        //Mode returned then it is valid
        if (m)
            return true;
        const name = Mode.name.toLowerCase();
        diagnoser.add(value, `value: '${value.text}' is not defined in mode: '${name}'`, types_1.DiagnosticSeverity.error, `minecraft.mode.${name}.invalid`);
        return false;
    };
}
/** Diagnoses the value a generic collection of modes
 * @param value The value to evaluate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to
 * @returns true or false, false is any error was found*/
function mode_slotid_diagnose(value, Com, diagnoser) {
    if (typeof Com !== "string") {
        //Get the slot type
        const index = Com.parameters.indexOf(value) - 1;
        //if the index is negative, the parameter then was not found
        if (index < 0)
            return false;
        Com = Com.parameters[index].text;
    }
    //Get the slot type
    const m = bc_minecraft_bedrock_types_1.Modes.SlotType.get(Com);
    //if the mode is not found, then the parameter is not valid, expected that the previous parameter handling handled slot type not existing
    if (m === undefined)
        return false;
    if (m.eduOnly === true && (0, definitions_1.education_enabled)(diagnoser) === false) {
        diagnoser.add(value.offset, "This is an education only mode, and education is disabled", types_1.DiagnosticSeverity.error, "minecraft.mode.edu");
        return false;
    }
    if (m.range) {
        const n = Number.parseInt(value.text);
        if (n < m.range.min || n > m.range.max) {
            diagnoser.add(value.offset, `The value is ${n} not in the range of ${m.range.min} to ${m.range.max}`, types_1.DiagnosticSeverity.error, "minecraft.mode.range");
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map