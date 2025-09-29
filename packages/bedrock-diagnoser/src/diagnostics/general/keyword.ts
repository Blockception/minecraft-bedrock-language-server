import { Types } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export function general_keyword_diagnose(
  keyword: string,
  value: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder,
): void {
  //Keyword matches the given value, then stop
  if (value.text === keyword) return;

  diagnoser.add(
    value,
    `Invalid keyword: ${value}, expected keyword: ${value}`,
    DiagnosticSeverity.error,
    'general.keyword.invalid',
  );
}
