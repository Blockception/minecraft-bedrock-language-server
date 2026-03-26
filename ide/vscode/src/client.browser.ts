import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { LanguageClient, LanguageClientOptions } from 'vscode-languageclient/browser';
import { Languages } from '@blockception/ide-shared';
import { Manager } from 'bc-minecraft-lsp-client';

export function activate(context: vscode.ExtensionContext): void {
  console.log('starting minecraft language client (browser/web worker)');

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for relevant document types.
    // Include vscode-vfs scheme used by vscode.dev / github.dev
    documentSelector: [
      { scheme: 'file',       language: Languages.McFunctionIdentifier },
      { scheme: 'vscode-vfs', language: Languages.McFunctionIdentifier },
      { scheme: 'file',       language: Languages.McLanguageIdentifier },
      { scheme: 'vscode-vfs', language: Languages.McLanguageIdentifier },
      { scheme: 'file',       language: Languages.JsonIdentifier },
      { scheme: 'vscode-vfs', language: Languages.JsonIdentifier },
      { scheme: 'file',       language: Languages.JsonCIdentifier },
      { scheme: 'vscode-vfs', language: Languages.JsonCIdentifier },
      { scheme: 'file',       language: Languages.McProjectIdentifier },
      { scheme: 'vscode-vfs', language: Languages.McProjectIdentifier },
      { scheme: 'file',       language: Languages.McMolangIdentifier },
      { scheme: 'vscode-vfs', language: Languages.McMolangIdentifier },
    ],
  };

  // Use Uri.joinPath on context.extensionUri — NOT context.asAbsolutePath —
  // because asAbsolutePath is not available in the browser extension host.
  const serverUri = Uri.joinPath(context.extensionUri, 'lsp', 'server.browser.js');
  const worker = new Worker(serverUri.toString(/* skipEncoding= */ true));

  // LanguageClient browser constructor: (id, name, clientOptions, worker)
  // — no serverOptions object; the Worker IS the server transport.
  Manager.Client = new LanguageClient(
    'languageBlockceptionMinecraftClient',
    'LSP-BC Minecraft',
    clientOptions,
    worker,
  );

  Manager.Client.start().then(() => {
    vscode.commands.executeCommand('setContext', 'ext:is_active', true);
  });
}

export function deactivate(): Thenable<void> | undefined {
  console.log('stopping minecraft language client (browser)');
  if (!Manager.Client) {
    return undefined;
  }
  return Manager.Client.stop();
}
