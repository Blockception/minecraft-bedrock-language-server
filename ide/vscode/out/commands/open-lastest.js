'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.activate = activate;
const fs_1 = require('fs');
const vscode_1 = require('vscode');
const shared_1 = require('@blockception/shared');
const path_1 = __importDefault(require('path'));
function activate(context) {
  context.subscriptions.push(vscode_1.commands.registerCommand(shared_1.Commands.Errors.OpenLastest, openLastestError));
}
function openLastestError() {
  try {
    let APPDATA = process.env.APPDATA;
    //if start folder doesnt exist
    if (!APPDATA) {
      vscode_1.window.showErrorMessage("Couldn't find the AppData folder");
      return;
    }
    if (APPDATA.endsWith('Roaming')) {
      APPDATA = path_1.default.join(APPDATA, '..');
    }
    APPDATA = path_1.default.join(APPDATA, 'Local', 'Packages');
    const Childern = (0, fs_1.readdirSync)(APPDATA);
    for (let I = 0; I < Childern.length; I++) {
      const Child = Childern[I];
      if (Child.includes('Microsoft.MinecraftUWP')) {
        const folder = path_1.default.join(APPDATA, Child);
        findLastestLog(folder);
      }
    }
  } catch (error) {
    vscode_1.window.showErrorMessage('error retrieving errors', JSON.stringify(error));
  }
}
function findLastestLog(folder) {
  const LogFolder = path_1.default.join(folder, 'LocalState', 'logs');
  let Lastest = '';
  let LastestTime = 0;
  const Childern = (0, fs_1.readdirSync)(LogFolder);
  for (let I = 0; I < Childern.length; I++) {
    const Child = Childern[I];
    if (Child.startsWith('ContentLog_') && Child.endsWith('.txt')) {
      const filepath = path_1.default.join(LogFolder, Child);
      const stat = (0, fs_1.statSync)(filepath);
      if (Lastest === '' || stat.mtimeMs > LastestTime) {
        Lastest = filepath;
        LastestTime = stat.mtimeMs;
      }
    }
  }
  if (Lastest !== '') {
    const uri = vscode_1.Uri.file(Lastest);
    vscode_1.window.showTextDocument(uri).then((ed) => {
      vscode_1.languages.setTextDocumentLanguage(ed.document, 'log');
    });
  } else {
    vscode_1.window.showInformationMessage("Couldn't find content logs");
  }
}
//# sourceMappingURL=open-lastest.js.map
