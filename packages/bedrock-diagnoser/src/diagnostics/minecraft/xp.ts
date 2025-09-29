import { Minecraft, Types } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export function minecraft_xp_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void {
  if (Minecraft.XP.is(value.text)) return;

  diagnoser.add(value, 'Invalid xp value: ' + value.text, DiagnosticSeverity.error, 'minecraft.xp.invalid');
}
