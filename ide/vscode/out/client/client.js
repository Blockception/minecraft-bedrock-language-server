'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.setupClient = setupClient;
const node_1 = require('vscode-languageclient/node');
const manager_1 = require('../manager/manager');
const middleware_1 = require('./middleware');
const shared_1 = require('@blockception/shared');
const path = __importStar(require('path'));
const vscode = __importStar(require('vscode'));
function setupClient(context) {
  console.log('starting minecraft language client');
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions = {
    run: { module: serverModule, transport: node_1.TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: node_1.TransportKind.ipc,
      options: debugOptions,
    },
  };
  // Options to control the language client
  const clientOptions = {
    // Register the server for plain text documents
    documentSelector: [
      { scheme: 'file', language: shared_1.Languages.McFunctionIdentifier },
      { scheme: 'file', language: shared_1.Languages.McLanguageIdentifier },
      { scheme: 'file', language: shared_1.Languages.JsonIdentifier },
      { scheme: 'file', language: shared_1.Languages.JsonCIdentifier },
      { scheme: 'file', language: shared_1.Languages.McProjectIdentifier },
      { scheme: 'file', language: shared_1.Languages.McMolangIdentifier },
    ],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: vscode.workspace.createFileSystemWatcher('**/*.{mcfunction,json,jsonc}'),
    },
    middleware: {
      resolveCodeLens: middleware_1.resolveCodeLens,
    },
  };
  // Create the language client and start the client.
  manager_1.Manager.Client = new node_1.LanguageClient(
    'languageBlockceptionMinecraftClient',
    'LSP-BC Minecraft',
    serverOptions,
    clientOptions,
  );
  // Start the client. This will also launch the server
  manager_1.Manager.Client.start().then(() => {
    vscode.commands.executeCommand('setContext', 'ext:is_active', true);
  });
}
//# sourceMappingURL=client.js.map
