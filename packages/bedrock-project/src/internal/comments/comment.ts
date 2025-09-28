import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../types";

export function GetComment(doc: TextDocument, lineIndex: number): string {
  const line = doc.getText(Types.Range.createR(lineIndex, 0, lineIndex, Number.MAX_SAFE_INTEGER));
  const Index = line.indexOf("#");

  if (Index < 0) return "";

  return line.slice(Index + 1, line.length);
}
