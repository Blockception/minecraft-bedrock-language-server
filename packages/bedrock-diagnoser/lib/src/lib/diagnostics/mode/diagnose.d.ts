import { Command } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder } from "../../types";
export declare const mode_camera_shake_diagnose: ModeDiagnose;
export declare const mode_cause_type_diagnose: ModeDiagnose;
export declare const mode_clone_diagnose: ModeDiagnose;
export declare const mode_difficulty_diagnose: ModeDiagnose;
export declare const mode_dimension_diagnose: ModeDiagnose;
export declare const mode_easing_diagnose: ModeDiagnose;
export declare const mode_fill_diagnose: ModeDiagnose;
export declare const mode_gamemode_diagnose: ModeDiagnose;
export declare const mode_handtype_diagnose: ModeDiagnose;
export declare const mode_hud_visibility_diagnose: ModeDiagnose;
export declare const mode_hud_element_diagnose: ModeDiagnose;
export declare const mode_locate_feature_diagnose: ModeDiagnose;
export declare const mode_mask_diagnose: ModeDiagnose;
export declare const mode_mirror_diagnose: ModeDiagnose;
export declare const mode_music_repeat_diagnose: ModeDiagnose;
export declare const mode_old_block_diagnose: ModeDiagnose;
export declare const mode_operation_diagnose: ModeDiagnose;
export declare const mode_permission_diagnose: ModeDiagnose;
export declare const mode_permission_state_diagnose: ModeDiagnose;
export declare const mode_replace_diagnose: ModeDiagnose;
export declare const mode_ride_fill_diagnose: ModeDiagnose;
export declare const mode_ride_rules_diagnose: ModeDiagnose;
export declare const mode_rotation_diagnose: ModeDiagnose;
export declare const mode_save_diagnose: ModeDiagnose;
export declare const mode_scan_diagnose: ModeDiagnose;
export declare const mode_selector_attribute_diagnose: ModeDiagnose;
export declare const mode_selector_type_diagnose: ModeDiagnose;
export declare const mode_slot_type_diagnose: ModeDiagnose;
export declare const mode_structure_animation_diagnose: ModeDiagnose;
export declare const mode_teleport_rules_diagnose: ModeDiagnose;
export declare const mode_time_diagnose: ModeDiagnose;
type ModeDiagnose = (value: Types.OffsetWord, diagnoser: DiagnosticsBuilder) => boolean;
/** Diagnoses the value a generic collection of modes
 * @param value The value to evaluate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to
 * @returns true or false, false is any error was found*/
export declare function mode_slotid_diagnose(value: Types.OffsetWord, Com: Command | string, diagnoser: DiagnosticsBuilder): boolean;
export {};
