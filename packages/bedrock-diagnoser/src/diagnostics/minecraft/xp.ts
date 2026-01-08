import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { Minecraft } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export function minecraft_xp_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  if (Minecraft.XP.is(value.text)) return;

  diagnoser.add(value, 'Invalid xp value: ' + value.text, DiagnosticSeverity.error, 'minecraft.xp.invalid');
}
