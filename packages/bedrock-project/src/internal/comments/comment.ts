import { Range } from 'bc-minecraft-bedrock-shared';
import { TextDocument } from '../../types';
import { findMcfunctionCommentStart } from '../../project/behavior-pack/mcfunction/comment';

export function GetComment(doc: TextDocument, lineIndex: number): string {
  const line = doc.getText(Range.createR(lineIndex, 0, lineIndex, Number.MAX_SAFE_INTEGER));
  const index = findMcfunctionCommentStart(line);
  if (index < 0) return '';
  return line.slice(index + 1);
}
