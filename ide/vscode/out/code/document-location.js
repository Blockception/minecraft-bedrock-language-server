'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.GetRange = GetRange;
exports.GetPosition = GetPosition;
exports.resolveJsonPath = resolveJsonPath;
exports.resolve = resolve;
const vscode_1 = require('vscode');
const character_1 = require('./character');
/**
 * @param position
 * @param doc
 * @returns
 */
function GetRange(position, doc) {
  if (typeof position === 'string') return resolveJsonPath(position, doc);
  let Start;
  let End = undefined;
  //If document location is already a position, then grab the offset to start at
  if (isPosition(position)) {
    Start = position;
    position = doc.offsetAt(position);
    //If document location is already an offset, then grab the start position
  } else if (OffsetWord.is(position)) {
    Start = doc.positionAt(position.offset);
    End = doc.positionAt(position.text.length + position.offset);
    return new vscode_1.Range(Start, End);
  } else {
    Start = doc.positionAt(position);
  }
  const text = doc.getText();
  for (let I = position + 1; I < text.length; I++) {
    const c = text.charCodeAt(I);
    //If character is a letter or number then keep going until we find something else
    if (character_1.Character.IsLetterCode(c) || character_1.Character.IsNumberCode(c)) continue;
    //Dashes and underscore are to be respected
    switch (c) {
      case character_1.Character.Character_dash:
      case character_1.Character.Character_underscore:
      case character_1.Character.Character_forwardslash:
      case character_1.Character.Character_column:
        continue;
    }
    //Something has been found that is not considered a "word"
    End = doc.positionAt(I);
    break;
  }
  //If end is still undefined then make atleast one character big
  if (!End) {
    End = new vscode_1.Position(Start.line, Start.character + 1);
  }
  return new vscode_1.Range(Start, End);
}
function GetPosition(position, doc) {
  if (isPosition(position)) return position;
  if (typeof position === 'string') return resolveJsonPath(position, doc).start;
  if (OffsetWord.is(position)) return doc.positionAt(position.offset);
  return doc.positionAt(position);
}
function isPosition(value) {
  if (typeof value === 'object') {
    if (typeof value.character === 'number' && typeof value.line === 'number') return true;
  }
  return false;
}
var OffsetWord;
(function (OffsetWord) {
  function is(value) {
    if (typeof value === 'object') {
      if (typeof value.text === 'string' && typeof value.offset === 'number') return true;
    }
    return false;
  }
  OffsetWord.is = is;
})(OffsetWord || (OffsetWord = {}));
function resolveJsonPath(position, doc) {
  const index = position.lastIndexOf('/');
  const length = index > -1 ? position.length - index : position.length;
  const offset = resolve(doc, position);
  const start = doc.positionAt(offset);
  const end = doc.positionAt(offset + length);
  return new vscode_1.Range(start, end);
}
function resolve(text, path) {
  if (typeof text === 'object') text = text.getText();
  const s = path.split(/[\\/]/);
  let index = 0;
  for (let I = 0; I < s.length; I++) {
    const elem = s[I];
    if (!Number.isInteger(elem) && elem !== '') {
      const t = text.indexOf(elem, index);
      if (t > -1) index = t;
    }
  }
  return index;
}
//# sourceMappingURL=document-location.js.map
