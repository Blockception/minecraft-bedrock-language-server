import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';
import { LSPConfig } from '../config/config';
import { setupServerCore } from './setup.core';

export function setupServer(config: LSPConfig): void {
  // Create a connection for the server, using Node's IPC as a transport.
  // Also include all preview / proposed LSP features.
  const connection = createConnection(ProposedFeatures.all);
  setupServerCore(connection, config);
}
