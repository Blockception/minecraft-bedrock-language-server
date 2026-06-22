import { GetRange, GetPosition } from './document-location';
import * as vstd from 'vscode-languageserver-textdocument';

const isFinitePosition = (p: vstd.Position) => Number.isFinite(p.line) && Number.isFinite(p.character);

describe('GetRange', () => {
  test('returns a valid zero-length range at end of document', () => {
    const doc = vstd.TextDocument.create('file:///test.json', 'json', 1, '{\n}');
    const offsetAtEof = doc.getText().length;

    const range = GetRange(offsetAtEof, doc);

    expect(range.start).toEqual(doc.positionAt(offsetAtEof));
    expect(range.end).toEqual(doc.positionAt(offsetAtEof));
  });

  // Regression: a degenerate molang node (e.g. empty `{}`) has an undefined position.
  // Without clamping this produced a NaN character that serializes to `null` over
  // JSON-RPC, causing the client to drop the entire diagnostic batch.
  test.each([undefined, NaN, Infinity, -Infinity, -5])(
    'produces a finite range for non-finite/out-of-bounds offset %p',
    (offset) => {
      const doc = vstd.TextDocument.create('file:///test.json', 'json', 1, '{\n}');

      const range = GetRange(offset as unknown as number, doc);

      expect(isFinitePosition(range.start)).toBe(true);
      expect(isFinitePosition(range.end)).toBe(true);
    },
  );

  test('produces a finite range for an OffsetWord with a non-finite offset', () => {
    const doc = vstd.TextDocument.create('file:///test.json', 'json', 1, '{\n}');

    const range = GetRange({ offset: NaN, text: '{}' } as any, doc);

    expect(isFinitePosition(range.start)).toBe(true);
    expect(isFinitePosition(range.end)).toBe(true);
  });
});

describe('GetPosition', () => {
  test.each([undefined, NaN, Infinity, -5])('produces a finite position for offset %p', (offset) => {
    const doc = vstd.TextDocument.create('file:///test.json', 'json', 1, '{\n}');

    const position = GetPosition(offset as unknown as number, doc);

    expect(isFinitePosition(position)).toBe(true);
  });
});
