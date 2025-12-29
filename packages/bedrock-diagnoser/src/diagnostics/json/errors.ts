import { OffsetWord } from '@blockception/packages-shared';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export function handle_json_error(err: any, diagnoser: DiagnosticsBuilder): void {
  if (typeof err.message !== 'string') {
    diagnoser.add(
      0,
      'Invalid json structure\nmessage:' + JSON.stringify(err),
      DiagnosticSeverity.error,
      'json.invalid',
    );
  }

  const message = err.message;
  const word: OffsetWord = {
    offset: 0,
    text: ' ',
  };

  const token = safe_first_get(/token ([^ ]+) /gim, message);
  if (token) word.text = token;

  const pos = safe_first_get(/position (\d+)/gim, message);
  if (pos) word.offset = Number.parseInt(pos);

  diagnoser.add(word, message, DiagnosticSeverity.error, 'json.invalid');
}

function safe_first_get(regex: RegExp, text: string): string | undefined {
  const match = regex.exec(text);

  if (match) return match[1] ?? match[0];

  return undefined;
}
