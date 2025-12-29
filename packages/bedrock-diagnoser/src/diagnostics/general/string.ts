import { OffsetWord } from '@blockception/packages-shared';
import { General } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export function general_string_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder) {
  if (General.String.is(value.text)) return;

  diagnoser.add(value, `Invalid minecraft string: '${value.text}'`, DiagnosticSeverity.error, 'general.string.invalid');
}
