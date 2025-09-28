'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.resolveCodeLens = resolveCodeLens;
const vscode_1 = require('vscode');
const vscode_languageclient_1 = require('vscode-languageclient');
const document_location_1 = require('../code/document-location');
function resolveCodeLens(codeLens, token, next) {
  const command = codeLens.command;
  if (!command) {
    if (hasData(codeLens)) {
      const data = codeLens.data;
      if (isBaseObject(data)) {
        const uri = vscode_1.Uri.parse(data.location.uri);
        return vscode_1.workspace.openTextDocument(uri).then((doc) => {
          const p = (0, document_location_1.GetPosition)(data.location.position, doc);
          const title = data.documentation ? data.documentation.replace(':', ' |') : data.id;
          codeLens.command = vscode_languageclient_1.Command.create(
            title,
            'editor.action.goToLocations',
            uri,
            p,
            [],
            'gotoAndPeek',
          );
          return codeLens;
        });
      }
    }
  }
  next(codeLens, token);
  return Promise.resolve(codeLens);
}
function hasData(value) {
  if (typeof value.data === 'object') return true;
  return false;
}
function isBaseObject(value) {
  if (typeof value === 'object') {
    if (typeof value.id === 'string' && typeof value.location === 'object') return true;
  }
  return false;
}
//# sourceMappingURL=middleware.js.map
