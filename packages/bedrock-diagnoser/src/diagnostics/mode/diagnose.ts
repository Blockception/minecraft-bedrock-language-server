import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { Command } from 'bc-minecraft-bedrock-command';
import { Modes } from 'bc-minecraft-bedrock-types';
import { ModeHandler } from 'bc-minecraft-bedrock-types/src/modes/mode-handler';
import { SlotTypeMode } from 'bc-minecraft-bedrock-types/src/modes/slot-type';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';
import { education_enabled } from '../definitions';

export const modeCameraShakeDiagnose = mode_generic_diagnose(Modes.CameraShake);
export const modeCauseTypeDiagnose = mode_generic_diagnose(Modes.CauseType);
export const modeCloneDiagnose = mode_generic_diagnose(Modes.Clone);
export const modeDifficultyDiagnose = mode_generic_diagnose(Modes.Difficulty);
export const modeDimensionDiagnose = mode_generic_diagnose(Modes.Dimension);
export const modeEasingDiagnose = mode_generic_diagnose(Modes.Easing);
export const modeFillDiagnose = mode_generic_diagnose(Modes.Fill);
export const modeGamemodeDiagnose = mode_generic_diagnose(Modes.Gamemode);
export const modeHandtypeDiagnose = mode_generic_diagnose(Modes.HandType);
export const modeHudVisibilityDiagnose = mode_generic_diagnose(Modes.HudVisibility);
export const modeHudElementDiagnose = mode_generic_diagnose(Modes.HudElement);
export const modeLocateFeatureDiagnose = mode_generic_diagnose(Modes.LocateFeature);
export const modeMaskDiagnose = mode_generic_diagnose(Modes.Mask);
export const modeMirrorDiagnose = mode_generic_diagnose(Modes.Mirror);
export const modeMusicRepeatDiagnose = mode_generic_diagnose(Modes.MusicRepeat);
export const modeOldBlockDiagnose = mode_generic_diagnose(Modes.OldBlock);
export const modeOperationDiagnose = mode_generic_diagnose(Modes.Operation);
export const modeScoreComparatorDiagnose = mode_generic_diagnose(Modes.ScoreComparator);
export const modePermissionDiagnose = mode_generic_diagnose(Modes.Permission);
export const modePermissionStateDiagnose = mode_generic_diagnose(Modes.PermissionState);
export const modeReplaceDiagnose = mode_generic_diagnose(Modes.Replace);
export const modeRideFillDiagnose = mode_generic_diagnose(Modes.RideFill);
export const modeRideRulesDiagnose = mode_generic_diagnose(Modes.RideRules);
export const modeRotationDiagnose = mode_generic_diagnose(Modes.Rotation);
export const modeSaveDiagnose = mode_generic_diagnose(Modes.Save);
export const modeScanDiagnose = mode_generic_diagnose(Modes.Scan);
export const modeSelectorAttributeDiagnose = mode_generic_diagnose(Modes.SelectorAttribute);
export const modeSelectorTypeDiagnose = mode_generic_diagnose(Modes.SelectorType);
export const modeSlotTypeDiagnose = mode_generic_diagnose(Modes.SlotType);
export const modeStructureAnimationDiagnose = mode_generic_diagnose(Modes.StructureAnimation);
export const modeTeleportRulesDiagnose = mode_generic_diagnose(Modes.TeleportRules);
export const modeTimeDiagnose = mode_generic_diagnose(Modes.Time);

type ModeDiagnose = (value: OffsetWord, diagnoser: DiagnosticsBuilder) => boolean;

/**
 * Diagnoses the value a generic collection of modes
 * @param value The value to evaluate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to
 * @returns true or false, false is any error was found*/
function mode_generic_diagnose(Mode: ModeHandler): ModeDiagnose {
  return function (value: OffsetWord, diagnoser: DiagnosticsBuilder): boolean {
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
  value: OffsetWord,
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
