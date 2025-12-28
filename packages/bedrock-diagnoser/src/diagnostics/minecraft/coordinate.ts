import { Minecraft, Types } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';
export function minecraft_coordinate_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): boolean {
  if (Minecraft.Coordinate.is(value.text)) return true;

  diagnoser.add(
    value,
    'Invalid coordinate value: ' + value.text,
    DiagnosticSeverity.error,
    'minecraft.coordinate.invalid',
  );
  return false;
}
