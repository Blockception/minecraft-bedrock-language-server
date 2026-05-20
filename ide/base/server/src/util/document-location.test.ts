import { GetRange } from './document-location';
import * as vstd from 'vscode-languageserver-textdocument';

describe('GetRange', () => {
  test('returns a valid zero-length range at end of document', () => {
    const doc = vstd.TextDocument.create('file:///test.json', 'json', 1, '{\n}');
    const offsetAtEof = doc.getText().length;

    const range = GetRange(offsetAtEof, doc);

    expect(range.start).toEqual(doc.positionAt(offsetAtEof));
    expect(range.end).toEqual(doc.positionAt(offsetAtEof));
  });
});
