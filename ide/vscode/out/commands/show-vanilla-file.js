'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.activate = activate;
const vscode_1 = require('vscode');
const shared_1 = require('@blockception/shared');
const sources_1 = require('bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Vanilla/sources');
const path_1 = __importDefault(require('path'));
function activate(context) {
  async function showVanillaFile() {
    const base = context.storageUri || context.globalStorageUri;
    const storage_path = path_1.default.join(base.fsPath, 'vanilla');
    const command = new ShowVanillaFileCommand(storage_path);
    const source = sources_1.GithubFiles.source;
    const files = sources_1.GithubFiles.files;
    if (files.length === 0) {
      return;
    }
    return vscode_1.window.showQuickPick(files).then((filepath) => {
      if (!filepath) {
        return;
      }
      return command.process(filepath, source);
    });
  }
  context.subscriptions.push(vscode_1.commands.registerCommand(shared_1.Commands.ShowVanillaFile, showVanillaFile));
}
const day_diff_2 = 1000 * 60 * 60 * 24 * 2;
class ShowVanillaFileCommand {
  storage;
  constructor(storage) {
    this.storage = storage;
  }
  getFilepath(key) {
    return path_1.default.join(this.storage, key);
  }
  async canRead(filepath) {
    try {
      const stat = await vscode_1.workspace.fs.stat(vscode_1.Uri.file(filepath));
      if (stat.type !== vscode_1.FileType.File) return false;
      //Check if the file is not older then 2 days
      const now = new Date();
      const file = new Date(stat.mtime);
      const diff = now.getTime() - file.getTime();
      return diff <= day_diff_2;
    } catch (err) {
      console.log('trouble during checking of file', err);
      return false;
    }
  }
  async download(uri, filepath) {
    const progressOptions = {
      location: vscode_1.ProgressLocation.Notification,
      title: 'Downloading vanilla file',
      cancellable: false,
    };
    return vscode_1.window.withProgress(progressOptions, async (progress) => {
      const options = {
        method: 'GET',
        redirect: 'error',
      };
      progress.report({
        message: 'Downloading vanilla file',
        increment: 0,
      });
      await fetch(uri, options)
        .then((data) => data.text())
        .then((text) => {
          return vscode_1.workspace.fs.writeFile(vscode_1.Uri.file(filepath), Buffer.from(text, 'utf8'));
        })
        .catch((err) => {
          vscode_1.window.showErrorMessage(
            'Failed to download vanilla file\n',
            uri + '\n',
            filepath + '\n',
            JSON.stringify(err),
          );
        })
        .finally(() => {
          console.log('Downloaded vanilla file', filepath);
        });
      progress.report({ increment: 100 });
    });
  }
  async process(key, source) {
    const filepath = this.getFilepath(key);
    const uri = source + key;
    const dir = path_1.default.dirname(filepath);
    await vscode_1.workspace.fs.createDirectory(vscode_1.Uri.file(dir));
    const canRead = await this.canRead(filepath);
    if (!canRead) {
      await this.download(uri, filepath);
    }
    try {
      const doc = await vscode_1.workspace.openTextDocument(vscode_1.Uri.file(filepath));
      await vscode_1.window.showTextDocument(doc);
    } catch (err) {
      vscode_1.window.showErrorMessage('Failed to open vanilla file', filepath, JSON.stringify(err));
    }
  }
}
//# sourceMappingURL=show-vanilla-file.js.map
