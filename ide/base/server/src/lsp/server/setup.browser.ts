// Browser-specific server setup — uses vscode-languageserver/browser
// instead of vscode-languageserver/node.
import { BrowserMessageReader, BrowserMessageWriter, createConnection, ProposedFeatures } from 'vscode-languageserver/browser';
import { LSPConfig } from '../config/config';
import { setupServerCore } from './setup.core';

export function setupServerBrowser(config: LSPConfig): void {
  // self is the DedicatedWorkerGlobalScope inside the Web Worker
  const messageReader = new BrowserMessageReader(self as DedicatedWorkerGlobalScope);
  const messageWriter = new BrowserMessageWriter(self as DedicatedWorkerGlobalScope);
  const connection = createConnection(ProposedFeatures.all, messageReader, messageWriter);
  setupServerCore(connection, config);
}
