import { Commands } from '@blockception/ide-shared';
import { MCAttributes, MCDefinition } from 'bc-minecraft-project';
import { CodeAction, CodeActionKind, Command, Diagnostic, TextEdit } from 'vscode-languageserver';
import { CodeActionBuilder } from '../builder';
import { Vscode } from '../../../util';

/**
 * Adds a given type and value to the definition
 * @param builder
 * @param diag
 * @param type
 */
export function definition(builder: CodeActionBuilder, diag: Diagnostic, type: string): void {
  const document = builder.context.document;
  const value = document.getText(diag.range);
  const ws = builder.context.database.WorkspaceData.getFolder(document.uri);

  if (!ws) {
    builder.context.logger.error(`Couldn't find workspace for: ${document.uri}`);
    return;
  }

  const uri = Vscode.join(ws, MCDefinition.filename);

  const command: Command = {
    title: `Add ${value} as ${type} to MCDefinitions`,
    command: Commands.Files.Append,
    arguments: [uri, `${type}=${value}`],
  };

  const action: CodeAction = {
    title: command.title,
    command: command,
    diagnostics: [diag],
    kind: CodeActionKind.QuickFix,
    isPreferred: false,
  };

  builder.push(action);
}

/**Adds a given type and value to the definition
 * @param builder
 * @param diag
 * @param type
 */
export function attributes(builder: CodeActionBuilder, diag: Diagnostic): void {
  const document = builder.context.document;
  if (!document) return;

  const ws = builder.context.database.WorkspaceData.getFolder(document.uri);
  const key = diag.code ?? '';

  if (typeof key === 'undefined' || key === '') return;

  if (!ws) {
    builder.context.logger.error(`Couldn't find workspace for: ${document.uri}`);
    return;
  }

  const uri = Vscode.join(ws, MCAttributes.filename);

  const command: Command = {
    title: `Disable diagnostic code in project: ${key}`,
    command: Commands.Files.Append,
    arguments: [uri, `diagnostic.disable.${key}=true`],
  };

  const action: CodeAction = {
    title: command.title,
    command: command,
    diagnostics: [diag],
    kind: CodeActionKind.QuickFix,
    isPreferred: false,
  };

  builder.push(action);
  
  // Add quick fix to disable in current file
  addDisableInFile(builder, diag);
  
  // Add quick fix to disable on next line
  addDisableNextLine(builder, diag);
}

/**
 * Adds a quick fix to disable a diagnostic code for the entire file
 * @param builder
 * @param diag
 */
function addDisableInFile(builder: CodeActionBuilder, diag: Diagnostic): void {
  const document = builder.context.document;
  if (!document) return;

  const key = diag.code ?? '';
  if (typeof key === 'undefined' || key === '') return;

  // Insert at the beginning of the file
  const edit = TextEdit.insert(
    { line: 0, character: 0 },
    `// mc-disable ${key}\n`
  );

  const action: CodeAction = {
    title: `Disable '${key}' for this file`,
    kind: CodeActionKind.QuickFix,
    diagnostics: [diag],
    isPreferred: false,
    edit: {
      changes: {
        [document.uri]: [edit],
      },
    },
  };

  builder.push(action);
}

/**
 * Adds a quick fix to disable a diagnostic code for the next line
 * @param builder
 * @param diag
 */
function addDisableNextLine(builder: CodeActionBuilder, diag: Diagnostic): void {
  const document = builder.context.document;
  if (!document) return;

  const key = diag.code ?? '';
  if (typeof key === 'undefined' || key === '') return;

  // Get the line before the diagnostic
  const line = diag.range.start.line;
  
  // Get the indentation of the current line
  const currentLineText = document.getText({
    start: { line, character: 0 },
    end: { line, character: 1000 },
  });
  const indent = currentLineText.match(/^(\s*)/)?.[1] ?? '';

  // Insert on the line before the diagnostic
  const edit = TextEdit.insert(
    { line, character: 0 },
    `${indent}// mc-disable-next-line ${key}\n`
  );

  const action: CodeAction = {
    title: `Disable '${key}' for this line`,
    kind: CodeActionKind.QuickFix,
    diagnostics: [diag],
    isPreferred: false,
    edit: {
      changes: {
        [document.uri]: [edit],
      },
    },
  };

  builder.push(action);
}
