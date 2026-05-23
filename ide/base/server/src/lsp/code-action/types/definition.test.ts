import { Commands } from '@blockception/ide-shared';
import { CodeActionParams, Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CodeActionBuilder } from '../builder';
import { attributes } from './definition';

function createBuilder(uri: string, text: string) {
  const document = TextDocument.create(uri, 'bc-mcfunction', 1, text);
  const params: CodeActionParams = {
    textDocument: { uri },
    range: Range.create(0, 0, 0, 1),
    context: { diagnostics: [] },
  };

  return new CodeActionBuilder(params, {
    document,
    database: {
      WorkspaceData: {
        getFolder: () => 'file:///workspace',
      },
    },
    logger: {
      error: jest.fn(),
    },
  } as any);
}

describe('definition.attributes', () => {
  test('creates mclint severity quick actions for lint diagnostics', () => {
    const builder = createBuilder('file:///workspace/test.mcfunction', 'say hi');
    const diag: Diagnostic = {
      range: Range.create(0, 0, 0, 1),
      message: 'lint issue',
      severity: DiagnosticSeverity.Warning,
      code: 'lint.entity.naming',
      source: 'mc',
    };

    attributes(builder, diag);

    expect(builder.out).toHaveLength(3);
    const actions = builder.out as any[];
    expect(actions.map((a) => a.command.command)).toEqual([
      Commands.Files.SetMCLintRule,
      Commands.Files.SetMCLintRule,
      Commands.Files.SetMCLintRule,
    ]);
    expect(actions.map((a) => a.command.arguments)).toEqual([
      ['file:///workspace/.mclint', 'entity.naming', 'off'],
      ['file:///workspace/.mclint', 'entity.naming', 'warn'],
      ['file:///workspace/.mclint', 'entity.naming', 'error'],
    ]);
    expect(actions[0].isPreferred).toBe(true);
  });

  test('keeps generic diagnostic disable quick actions for non-lint diagnostics', () => {
    const builder = createBuilder('file:///workspace/test.mcfunction', '  say hi');
    const diag: Diagnostic = {
      range: Range.create(0, 0, 0, 1),
      message: 'missing objective',
      severity: DiagnosticSeverity.Warning,
      code: 'minecraft.objective.missing',
      source: 'mc',
    };

    attributes(builder, diag);

    expect(builder.out).toHaveLength(3);
    const [projectAction, fileAction, lineAction] = builder.out as any[];
    expect(projectAction.command.command).toBe(Commands.Files.Append);
    expect(projectAction.command.arguments).toEqual([
      'file:///workspace/.mcattributes',
      'diagnostic.disable.minecraft.objective.missing=true',
    ]);
    expect(fileAction.title).toBe("Disable 'minecraft.objective.missing' for this file");
    expect(lineAction.title).toBe("Disable 'minecraft.objective.missing' for this line");
  });
});
