import { Range } from 'bc-minecraft-bedrock-shared';
import { TextDocument } from '../../types';

export function GetComment(doc: TextDocument, lineIndex: number): string {
  const line = doc.getText(Range.createR(lineIndex, 0, lineIndex, Number.MAX_SAFE_INTEGER));
  const trimmed = line.trimStart();

  if (!trimmed.startsWith('#')) return '';

  const Index = line.length - trimmed.length;
  return line.slice(Index + 1, line.length);
}
