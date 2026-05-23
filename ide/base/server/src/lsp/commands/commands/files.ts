import { MCLint } from 'bc-minecraft-project';
import { promises as fs } from 'fs';
import { dirname } from 'path';
import { ApplyWorkspaceEditResult, CreateFile, TextEdit } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Fs } from '../../../util';
import { Context } from '../../context/context';
import { CommandContext } from '../context';

export async function appendToFile(context: Context<CommandContext>): Promise<void> {
  const { arguments: args } = context;
  function handleResponse(result: ApplyWorkspaceEditResult) {
    context.logger.info('changes: ', result);

    if (result.applied === false) {
      context.logger.warn("Changes haven't been applied");
    }

    export async function setMCLintRule(context: Context<CommandContext>): Promise<void> {
      const { arguments: args } = context;
      if (!args || args.length < 3) {
        throw new Error('wrong parameters: expected: [uri, rule, severity]');
      }

      const uri = String(args[0] ?? '');
      const rule = String(args[1] ?? '').trim();
      const severity = String(args[2] ?? '').trim();
      if (!(uri && rule && severity)) {
        throw new Error('wrong parameters: expected: [uri, rule, severity]');
      }
      if (severity !== 'off' && severity !== 'warn' && severity !== 'error') {
        throw new Error(`Invalid MCLint severity '${severity}'`);
      }

      const path = Fs.FromVscode(uri);
      let content = '';
      try {
        content = await fs.readFile(path, 'utf8');
      } catch {
        // File doesn't exist yet; create it below.
      }

      const lint = MCLint.parse(content);
      lint.rules[rule] = severity;

      await fs.mkdir(dirname(path), { recursive: true });
      await fs.writeFile(path, JSON.stringify(lint, undefined, 2) + '\n', 'utf8');
    }
  }

  if (!args || args.length < 2) {
    throw new Error('wrong parameters: expected: [uri, line]');
  }

  const uri = args[0];
  const line = args[1].trim();
  if (!(uri && line)) {
    throw new Error('wrong parameters: expected: [uri, line]');
  }

  let document: TextDocument | undefined = context.documents.get(uri);
  if (document === undefined) {
    document = TextDocument.create(uri, 'other', 0, '');
    await context.connection.workspace
      .applyEdit({
        label: 'creating file',
        edit: {
          documentChanges: [CreateFile.create(document.uri, { ignoreIfExists: true, overwrite: false })],
        },
      })
      .then(handleResponse);
  }

  return context.connection.workspace
    .applyEdit({
      label: 'Adding line',
      edit: {
        changes: {
          [document.uri]: [TextEdit.insert(document.positionAt(document.getText().length), '\n' + line)],
        },
      },
    })
    .then(handleResponse);
}
