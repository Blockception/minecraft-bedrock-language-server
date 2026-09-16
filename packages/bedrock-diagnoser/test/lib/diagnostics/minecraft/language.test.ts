import { Pack, PackType, TestTextDocument } from 'bc-minecraft-bedrock-project';
import { diagnose_language_document } from '../../../../src/diagnostics/minecraft';
import { TestDocumentDiagnoser } from '../../../diagnoser';

function createPack(type: PackType, manifest: Partial<Pack['manifest']> = {}): Pack {
  return {
    type,
    folder: 'file:///bp',
    manifest: manifest as Pack['manifest'],
  } as Pack;
}

describe('Language', () => {
  it('flags non-pack.name/description keys as unnecessary in a plain behavior pack', () => {
    const doc = TestTextDocument.create('file:///bp/texts/en_US.lang', 'custom.key=Hello\n');
    const B = TestDocumentDiagnoser.createDocument(undefined, doc);
    const pack = createPack(PackType.behavior_pack, { format_version: 2 as unknown as string });

    diagnose_language_document(B, pack);

    expect(B.hasCode('minecraft.language.unnecessary')).toBe(true);
  });

  it('does not flag keys in a Manifest V3 behavior pack with custom settings', () => {
    const doc = TestTextDocument.create('file:///bp/texts/en_US.lang', 'custom.key=Hello\n');
    const B = TestDocumentDiagnoser.createDocument(undefined, doc);
    const pack = createPack(PackType.behavior_pack, {
      format_version: 3 as unknown as string,
      settings: [{ type: 'toggle', text: 'custom.key', name: 'my_toggle', default: false }],
    });

    diagnose_language_document(B, pack);

    expect(B.hasCode('minecraft.language.unnecessary')).toBe(false);
  });

  it('still flags keys in a Manifest V3 behavior pack without a settings block', () => {
    const doc = TestTextDocument.create('file:///bp/texts/en_US.lang', 'custom.key=Hello\n');
    const B = TestDocumentDiagnoser.createDocument(undefined, doc);
    const pack = createPack(PackType.behavior_pack, { format_version: 3 as unknown as string, settings: [] });

    diagnose_language_document(B, pack);

    expect(B.hasCode('minecraft.language.unnecessary')).toBe(true);
  });

  it('never flags pack.name/pack.description even with an older manifest', () => {
    const doc = TestTextDocument.create('file:///bp/texts/en_US.lang', 'pack.name=My Pack\npack.description=Desc\n');
    const B = TestDocumentDiagnoser.createDocument(undefined, doc);
    const pack = createPack(PackType.behavior_pack, { format_version: 2 as unknown as string });

    diagnose_language_document(B, pack);

    expect(B.hasCode('minecraft.language.unnecessary')).toBe(false);
  });
});
