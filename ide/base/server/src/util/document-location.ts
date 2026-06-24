import { DocumentLocation, JsonPath, OffsetWord, Position } from 'bc-minecraft-bedrock-shared';
import { Range } from 'vscode-languageserver';
import * as vstd from 'vscode-languageserver-textdocument';
import { Character } from './character';

/**
 * Clamps an offset into the valid `[0, text.length]` range for the given document.
 *
 * A non-finite offset (`undefined`, `NaN`, `Infinity`) would otherwise flow into
 * `doc.positionAt(...)` and produce a `character: NaN`, which serializes to `null`
 * over JSON-RPC and makes the client reject the entire diagnostic batch.
 * @param offset The raw offset to clamp
 * @param doc The document the offset refers to
 * @returns A finite offset within the document's bounds
 */
function clampOffset(offset: number, doc: vstd.TextDocument): number {
  if (!Number.isFinite(offset)) return 0;
  const max = doc.getText().length;
  if (offset < 0) return 0;
  if (offset > max) return max;
  return offset;
}

/**
 *
 * @param position
 * @param doc
 * @returns
 */
export function GetRange(position: DocumentLocation, doc: vstd.TextDocument): Range {
  if (JsonPath.is(position)) {
    return resolveJsonPath(position, doc);
  }

  let Start: Position;
  let End: Position | undefined = undefined;

  //If document location is already a position, then grab the offset to start at
  if (Position.is(position)) {
    Start = position;
    position = doc.offsetAt(position);
    //If document location is already an offset, then grab the start position
  } else if (OffsetWord.is(position)) {
    const offset = clampOffset(position.offset, doc);
    const length = Number.isFinite(position.text.length) ? Math.max(0, position.text.length) : 0;
    Start = doc.positionAt(offset);
    End = doc.positionAt(clampOffset(offset + length, doc));

    return { start: Start, end: End };
  } else {
    position = clampOffset(position, doc);
    Start = doc.positionAt(position);
  }

  const text = doc.getText();

  for (let I = position + 1; I < text.length; I++) {
    const c = text.charCodeAt(I);

    //If character is a letter or number then keep going until we find something else
    if (Character.IsLetterCode(c) || Character.IsNumberCode(c)) continue;

    //Dashes and underscore are to be respected
    switch (c) {
      case Character.CharacterDash:
      case Character.CharacterUnderscore:
      case Character.CharacterForwardslash:
      case Character.CharacterColumn:
        continue;
    }

    //Something has been found that is not considered a "word"
    End = doc.positionAt(I);
    break;
  }

  //If end is still undefined then create a minimal, valid range
  if (!End) {
    End = doc.positionAt(Math.min(position + 1, text.length));
  }

  return { start: Start, end: End };
}

export function GetPosition(position: DocumentLocation, doc: vstd.TextDocument): vstd.Position {
  if (Position.is(position)) return position;
  if (JsonPath.is(position)) return resolveJsonPath(position, doc).start;
  if (OffsetWord.is(position)) return doc.positionAt(clampOffset(position.offset, doc));

  return doc.positionAt(clampOffset(position, doc));
}

/**Resolves a json path to a range
 * @param path The json path to resolve
 * @param doc The document that the path is in
 * @returns A range of where the object is*/
export function resolveJsonPath(path: string, doc: vstd.TextDocument): Range {
  const index = path.lastIndexOf('/');
  const length = index > -1 ? path.length - index : path.length;

  let offset: number;
  const text = doc.getText();

  if (index === -1) {
    const temp = '"' + path + '"';
    offset = text.indexOf(temp);

    if (offset < 0) {
      offset = text.indexOf(path);
    } else {
      offset++;
    }
  } else {
    offset = text.indexOf(path);
  }

  if (offset < 0) {
    offset = JsonPath.resolve(doc, path);
  }

  const start = doc.positionAt(offset);
  const end = doc.positionAt(offset + length);

  return { start: start, end: end };
}
