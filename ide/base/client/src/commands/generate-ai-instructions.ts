import { Commands } from '@blockception/ide-shared';
import { commands, ExtensionContext, FileType, Uri, window, workspace } from 'vscode';
import { generateAIInstructionsContent } from './generate-ai-instructions-content';

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(commands.registerCommand(Commands.AI.GenerateInstructions, generateInstructions));
}

async function generateInstructions(): Promise<void> {
  const workspaceRoot = getWorkspaceRoot();
  if (!workspaceRoot) {
    window.showErrorMessage('No workspace folder found');
    return;
  }

  const fileUri = Uri.joinPath(workspaceRoot, 'copilot-instructions.md');
  const existing = await fileExists(fileUri);
  if (existing) {
    const answer = await window.showWarningMessage(
      'copilot-instructions.md already exists. Overwrite it?',
      { modal: true },
      'Overwrite',
    );

    if (answer !== 'Overwrite') {
      return;
    }
  }

  await workspace.fs.writeFile(fileUri, Buffer.from(generateAIInstructionsContent(), 'utf8'));

  const document = await workspace.openTextDocument(fileUri);
  await window.showTextDocument(document);
  window.showInformationMessage('Generated copilot-instructions.md');
}

function getWorkspaceRoot(): Uri | undefined {
  const activeDocument = window.activeTextEditor?.document.uri;
  if (activeDocument) {
    const activeWorkspace = workspace.getWorkspaceFolder(activeDocument);
    if (activeWorkspace) {
      return activeWorkspace.uri;
    }
  }

  return workspace.workspaceFolders?.[0]?.uri;
}

async function fileExists(uri: Uri): Promise<boolean> {
  try {
    const stat = await workspace.fs.stat(uri);
    return stat.type === FileType.File;
  } catch {
    return false;
  }
}
