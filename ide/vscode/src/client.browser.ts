import * as vscode from 'vscode';
import { setupClientBrowser, Manager } from 'bc-minecraft-lsp-client';

export function activate(context: vscode.ExtensionContext): void {
  setupClientBrowser(context);
}

export function deactivate(): Thenable<void> | undefined {
  console.log('stopping minecraft language client (browser)');
  if (!Manager.Client) {
    return undefined;
  }
  return Manager.Client.stop();
}
