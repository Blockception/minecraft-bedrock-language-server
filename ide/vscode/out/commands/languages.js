'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.activate = activate;
const vscode_1 = require('vscode');
const vscode_languageclient_1 = require('vscode-languageclient');
const shared_1 = require('@blockception/shared');
const manager_1 = require('../manager/manager');
function activate(context) {
  context.subscriptions.push(vscode_1.commands.registerCommand(shared_1.Commands.AddLanguageFile, addAll));
}
function addAll() {
  const ed = vscode_1.window.activeTextEditor;
  if (!ed) return;
  const current = ed.document.uri.path;
  const params = {
    command: shared_1.Commands.AddLanguageFile,
    arguments: [current],
  };
  return manager_1.Manager.Client.sendRequest(vscode_languageclient_1.ExecuteCommandRequest.type, params);
}
//# sourceMappingURL=languages.js.map
