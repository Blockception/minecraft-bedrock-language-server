import * as vscode from 'vscode';
import { setupClient, Manager, setupCommands } from 'bc-minecraft-lsp-client';

export function activate(context: vscode.ExtensionContext): void {
  setupCommands(context);
  setupClient(context);
}

//shutdown server
export function deactivate(): Thenable<void> | undefined {
  console.log('stopping minecraft language client');

  if (!Manager.Client) {
    return undefined;
  }

  return Manager.Client.stop();
}
