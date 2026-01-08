import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { DiagnosticSeverity, DiagnosticsBuilder } from '../../types';

export function minecraft_effect_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  //Check if minecraft has effect data
  if (MinecraftData.General.Effects.includes(value.text)) return;
  diagnoser.add(value, 'Effect does not exist: ' + value.text, DiagnosticSeverity.error, 'minecraft.effect.invalid');
}
