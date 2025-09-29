import { General, Types } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export function general_boolean_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void {
  if (General.Boolean.is(value.text)) return;

  diagnoser.add(value, 'Invalid boolean value: ' + value.text, DiagnosticSeverity.error, 'general.boolean.invalid');
}
