import { TextDocument as VscodeTextDocument } from 'vscode-languageserver-textdocument';
import { TextDocument } from '../../documents/text-document';
import { provideJsonSemanticTokens } from './json';

function createTestDoc(content: string): TextDocument {
  const PACK_URI = 'file:///c:/projects/MyAddon/behavior_pack/entities/example.json';

  const vscDoc = VscodeTextDocument.create(PACK_URI, 'json', 0, content);
  return {
    uri: vscDoc.uri,
    getText: (range?: any) => vscDoc.getText(range),
    positionAt: (offset: number) => vscDoc.positionAt(offset),
    offsetAt: (position: any) => vscDoc.offsetAt(position),
  } as unknown as TextDocument;
}

describe('provideJsonSemanticTokens', () => {
  const validInputs = [
    `{ "animate": "q.is_alive" }`,
    `{ "value": "math.sin(q.life_time * 57.29)" }`,
    `{ "value": "v.foo + 1.0" }`,
    `{ "condition": "q.is_sneaking && !q.is_sleeping" }`,
    `{ "scale": "math.lerp(0.0, 1.0, q.life_time)" }`,
    `{ "value": "c.is_owner" }`,
    `{ "value": "t.foo * 2.0" }`,
    `{ "value": "array.my_array[q.anim_time]" }`,
    `{ "queue_command": { "command": [ "kill @notreal" ] } }`
  ];

  test.each(validInputs)('produces tokens for: %s', (content) => {
    const doc = createTestDoc(content);
    const result = provideJsonSemanticTokens(doc);
    expect(result.data.length).toBeGreaterThan(0);
  });
});
