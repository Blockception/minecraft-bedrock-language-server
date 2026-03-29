import { Languages } from '@blockception/ide-shared';
import { LanguageClient, LanguageClientOptions } from 'vscode-languageclient/browser';
import { Manager } from '../manager/manager';
import * as vscode from 'vscode';

export function setupClientBrowser(context: vscode.ExtensionContext): void {
  console.log('starting minecraft language client (browser/web worker)');

  // Include vscode-vfs scheme used by vscode.dev / github.dev
  const clientOptions: LanguageClientOptions = {
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
  const serverUri = vscode.Uri.joinPath(context.extensionUri, 'lsp', 'server.browser.js');
  const worker = new Worker(serverUri.toString(/* skipEncoding= */ true));

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
