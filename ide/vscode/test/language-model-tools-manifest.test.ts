import * as fs from 'fs';
import * as path from 'path';

type LanguageModelToolContribution = {
  name: string;
};

type ExtensionManifest = {
  activationEvents?: string[];
  contributes?: {
    languageModelTools?: LanguageModelToolContribution[];
  };
};

const manifestPath = path.resolve(__dirname, '..', 'package.json');

function readManifest(): ExtensionManifest {
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as ExtensionManifest;
}

describe('language model tools manifest', () => {
  it('activates when a language model tool is invoked directly', () => {
    const manifest = readManifest();
    const activationEvents = new Set(manifest.activationEvents ?? []);
    const toolNames = (manifest.contributes?.languageModelTools ?? []).map((tool) => tool.name);

    expect(toolNames).toEqual(
      expect.arrayContaining([
        'blockception.minecraft.workspaceEntities',
        'blockception.minecraft.currentFileDiagnostics',
        'blockception.minecraft.scaffoldProjectFiles',
      ]),
    );

    for (const toolName of toolNames) {
      expect(activationEvents).toContain(`onLanguageModelTool:${toolName}`);
    }
  });
});
