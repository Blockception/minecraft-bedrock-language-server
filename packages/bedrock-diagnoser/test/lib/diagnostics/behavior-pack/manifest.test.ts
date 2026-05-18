import { MinecraftData, ProjectData, TextDocument } from 'bc-minecraft-bedrock-project';
import { MCIgnore, MCProject } from 'bc-minecraft-project';
import { DiagnosticsBuilderContent } from '../../../../src/types';
import { diagnose_manifest } from '../../../../src/diagnostics/behavior-pack/manifest/document';
import { TestDocumentDiagnoser } from '../../../diagnoser';

describe('Behavior pack manifest script diagnostics', () => {
  it('warns about unreachable scripts and missing @minecraft/server dependency for CustomCommandRegistry', () => {
    const manifestUri = 'behavior_pack/manifest.json';
    const files = new Map<string, string>([
      [
        manifestUri,
        JSON.stringify({
          format_version: 2,
          header: {
            name: 'Test',
            description: 'Test',
            uuid: '00000000-0000-0000-0000-000000000000',
            version: [1, 0, 0],
            min_engine_version: [1, 21, 0],
          },
          modules: [
            { type: 'data', uuid: '11111111-1111-1111-1111-111111111111', version: [1, 0, 0] },
            { type: 'script', uuid: '22222222-2222-2222-2222-222222222222', version: [1, 0, 0], language: 'javascript', entry: 'scripts/main.js' },
          ],
        }),
      ],
      ['behavior_pack/scripts/main.js', `CustomCommandRegistry.registerCommand({ name: "example:test" }, () => {});`],
      ['behavior_pack/scripts/orphan.js', `CustomCommandRegistry.registerCommand({ name: "example:orphan" }, () => {});`],
    ]);

    const context = new InMemoryContext(files);
    context.getProjectData().projectData.addPack(manifestUri, MCProject.createEmpty());
    const document = context.getDocument(manifestUri) as TextDocument;
    const diagnoser = new TestDocumentDiagnoser(document, context, MCProject.createEmpty());

    diagnose_manifest(diagnoser);

    expect(diagnoser.hasCode('behaviorpack.manifest.script.unreachable')).toBeTruthy();
    expect(diagnoser.hasCode('behaviorpack.manifest.script.dependency.minecraft_server')).toBeTruthy();
  });

  it('errors when script entry is missing', () => {
    const manifestUri = 'behavior_pack/manifest.json';
    const files = new Map<string, string>([
      [
        manifestUri,
        JSON.stringify({
          format_version: 2,
          header: {
            name: 'Test',
            description: 'Test',
            uuid: '00000000-0000-0000-0000-000000000000',
            version: [1, 0, 0],
            min_engine_version: [1, 21, 0],
          },
          modules: [
            { type: 'data', uuid: '11111111-1111-1111-1111-111111111111', version: [1, 0, 0] },
            { type: 'script', uuid: '22222222-2222-2222-2222-222222222222', version: [1, 0, 0], language: 'javascript', entry: 'scripts/missing.js' },
          ],
        }),
      ],
    ]);

    const context = new InMemoryContext(files);
    context.getProjectData().projectData.addPack(manifestUri, MCProject.createEmpty());
    const document = context.getDocument(manifestUri) as TextDocument;
    const diagnoser = new TestDocumentDiagnoser(document, context, MCProject.createEmpty());

    diagnose_manifest(diagnoser);

    expect(diagnoser.hasCode('behaviorpack.manifest.script.entry.not_found')).toBeTruthy();
    const dependencyError = diagnoser.getCode('behaviorpack.manifest.script.dependency.minecraft_server');
    expect(dependencyError).toBeUndefined();
  });
});

class InMemoryContext implements DiagnosticsBuilderContent<TextDocument> {
  private readonly data: MinecraftData;

  constructor(private readonly files: Map<string, string>) {
    this.data = new MinecraftData(new ProjectData(this));
  }

  getDocument(uri: string): TextDocument | undefined {
    const text = this.files.get(uri);
    if (text === undefined) return undefined;
    return { uri, getText: () => text };
  }

  getFiles(folder: string, _patterns: string[], _ignores: MCIgnore): string[] {
    const out: string[] = [];
    this.files.forEach((_value, key) => {
      if (!key.startsWith(folder)) return;
      if (!/\.(?:[cm]?js|[cm]?ts)$/i.test(key)) return;
      out.push(key);
    });

    return out;
  }

  getProjectData(): MinecraftData {
    return this.data;
  }
}
