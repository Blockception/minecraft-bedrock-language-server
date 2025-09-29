import { Command } from 'bc-minecraft-bedrock-command';
import { Modes, Types } from 'bc-minecraft-bedrock-types';
import { ModeHandler } from 'bc-minecraft-bedrock-types/src/modes/mode-handler';
import { SlotTypeMode } from 'bc-minecraft-bedrock-types/src/modes/slot-type';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';
import { education_enabled } from '../definitions';

export const mode_camera_shake_diagnose = mode_generic_diagnose(Modes.CameraShake);
export const mode_cause_type_diagnose = mode_generic_diagnose(Modes.CauseType);
export const mode_clone_diagnose = mode_generic_diagnose(Modes.Clone);
export const mode_difficulty_diagnose = mode_generic_diagnose(Modes.Difficulty);
export const mode_dimension_diagnose = mode_generic_diagnose(Modes.Dimension);
export const mode_easing_diagnose = mode_generic_diagnose(Modes.Easing);
export const mode_fill_diagnose = mode_generic_diagnose(Modes.Fill);
export const mode_gamemode_diagnose = mode_generic_diagnose(Modes.Gamemode);
export const mode_handtype_diagnose = mode_generic_diagnose(Modes.HandType);
export const mode_hud_visibility_diagnose = mode_generic_diagnose(Modes.HudVisibility);
export const mode_hud_element_diagnose = mode_generic_diagnose(Modes.HudElement);
export const mode_locate_feature_diagnose = mode_generic_diagnose(Modes.LocateFeature);
export const mode_mask_diagnose = mode_generic_diagnose(Modes.Mask);
export const mode_mirror_diagnose = mode_generic_diagnose(Modes.Mirror);
export const mode_music_repeat_diagnose = mode_generic_diagnose(Modes.MusicRepeat);
export const mode_old_block_diagnose = mode_generic_diagnose(Modes.OldBlock);
export const mode_operation_diagnose = mode_generic_diagnose(Modes.Operation);
export const mode_permission_diagnose = mode_generic_diagnose(Modes.Permission);
export const mode_permission_state_diagnose = mode_generic_diagnose(Modes.PermissionState);
export const mode_replace_diagnose = mode_generic_diagnose(Modes.Replace);
export const mode_ride_fill_diagnose = mode_generic_diagnose(Modes.RideFill);
export const mode_ride_rules_diagnose = mode_generic_diagnose(Modes.RideRules);
export const mode_rotation_diagnose = mode_generic_diagnose(Modes.Rotation);
export const mode_save_diagnose = mode_generic_diagnose(Modes.Save);
export const mode_scan_diagnose = mode_generic_diagnose(Modes.Scan);
export const mode_selector_attribute_diagnose = mode_generic_diagnose(Modes.SelectorAttribute);
export const mode_selector_type_diagnose = mode_generic_diagnose(Modes.SelectorType);
export const mode_slot_type_diagnose = mode_generic_diagnose(Modes.SlotType);
export const mode_structure_animation_diagnose = mode_generic_diagnose(Modes.StructureAnimation);
export const mode_teleport_rules_diagnose = mode_generic_diagnose(Modes.TeleportRules);
export const mode_time_diagnose = mode_generic_diagnose(Modes.Time);

type ModeDiagnose = (value: Types.OffsetWord, diagnoser: DiagnosticsBuilder) => boolean;

/**
 * Diagnoses the value a generic collection of modes
 * @param value The value to evaluate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to
 * @returns true or false, false is any error was found*/
function mode_generic_diagnose(Mode: ModeHandler): ModeDiagnose {
  return function (value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): boolean {
    const m = Mode.get(value.text);

    //Mode returned then it is valid
    if (m) return true;

    const name = Mode.name.toLowerCase();
    diagnoser.add(
      value,
      `value: '${value.text}' is not defined in mode: '${name}'`,
      DiagnosticSeverity.error,
      `minecraft.mode.${name}.invalid`,
    );
    return false;
  };
}

/** Diagnoses the value a generic collection of modes
 * @param value The value to evaluate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to
 * @returns true or false, false is any error was found*/
export function mode_slotid_diagnose(
  value: Types.OffsetWord,
  Com: Command | string,
  diagnoser: DiagnosticsBuilder,
): boolean {
  if (typeof Com !== 'string') {
    //Get the slot type
    const index = Com.parameters.indexOf(value) - 1;
    //if the index is negative, the parameter then was not found
    if (index < 0) return false;
    Com = Com.parameters[index].text;
  }

  //Get the slot type
  const m = <SlotTypeMode>Modes.SlotType.get(Com);
  //if the mode is not found, then the parameter is not valid, expected that the previous parameter handling handled slot type not existing
  if (m === undefined) return false;

  if (m.eduOnly === true && education_enabled(diagnoser) === false) {
    diagnoser.add(
      value.offset,
      'This is an education only mode, and education is disabled',
      DiagnosticSeverity.error,
      'minecraft.mode.edu',
    );
    return false;
  }

  if (m.range) {
    const n = Number.parseInt(value.text);

    if (n < m.range.min || n > m.range.max) {
      diagnoser.add(
        value.offset,
        `The value is ${n} not in the range of ${m.range.min} to ${m.range.max}`,
        DiagnosticSeverity.error,
        'minecraft.mode.range',
      );
      return false;
    }
  }

  return true;
}
