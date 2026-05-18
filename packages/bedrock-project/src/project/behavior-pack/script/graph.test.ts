import { Manifest } from '../../../internal/types';
import { TextDocument } from '../../../types';
import { resolveManifestScriptGraph } from './graph';

describe('Behavior Pack/Script manifest graph resolution', () => {
  it('collects only manifest reachable scripts', () => {
    const files = new Map<string, TextDocument>([
      [toUri('scripts/main.ts'), doc('scripts/main.ts', `import './commands.ts';`)],
      [toUri('scripts/commands.ts'), doc('scripts/commands.ts', `CustomCommandRegistry.registerCommand({ name: 'example:one' }, () => {});`)],
      [toUri('scripts/orphan.ts'), doc('scripts/orphan.ts', `CustomCommandRegistry.registerCommand({ name: 'example:two' }, () => {});`)],
    ]);

    const graph = resolveManifestScriptGraph({
      folder: 'c:\\bp',
      manifest: {
        format_version: 2 as any,
        header: {} as any,
        modules: [{ type: 'script', entry: 'scripts/main.ts', language: 'typescript', version: [1, 0, 0] }],
        dependencies: [{ module_name: '@minecraft/server', version: [1, 8, 0] }],
      } as Manifest,
      getDocument: (uri) => files.get(uri),
      getScriptFiles: () => Array.from(files.keys()),
    });

    expect(graph.reachableFiles.sort()).toEqual([toUri('scripts/commands.ts'), toUri('scripts/main.ts')].sort());
    expect(graph.unreachableFiles).toEqual([toUri('scripts/orphan.ts')]);
    expect(graph.usesCustomCommandRegistry).toBeTruthy();
    expect(graph.hasMinecraftServerDependency).toBeTruthy();
  });

  it('reports missing entry and missing language', () => {
    const graph = resolveManifestScriptGraph({
      folder: 'c:\\bp',
      manifest: {
        format_version: 2 as any,
        header: {} as any,
        modules: [{ type: 'script', entry: 'scripts/missing.ts', version: [1, 0, 0] }],
      } as Manifest,
      getDocument: () => undefined,
      getScriptFiles: () => [],
    });

    expect(graph.missingEntries).toHaveLength(1);
    expect(graph.moduleIssues).toContainEqual({ moduleIndex: 0, field: 'language', code: 'missing' });
  });
});

function doc(relative: string, content: string): TextDocument {
  const uri = toUri(relative);
  return { uri, getText: () => content };
}

function toUri(relative: string): string {
  return `c:\\bp\\${relative.replace(/\//g, '\\')}`;
}
