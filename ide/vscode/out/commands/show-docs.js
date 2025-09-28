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
const console_1 = require('../console/console');
const path_1 = __importDefault(require('path'));
function activate(context) {
  async function showDocs() {
    const base = context.storageUri || context.globalStorageUri;
    const storage_path = path_1.default.join(base.fsPath, 'docs');
    const command = new ShowDocsCommand(storage_path);
    const sidebar = await command.getSidebar();
    if (sidebar.length === 0) {
      return;
    }
    // Processed titles are made from the toc_title and the parent toc_title
    const titles = sidebar.map((x) => x.processedTitle ?? x.toc_title);
    return vscode_1.window.showQuickPick(titles).then((title) => {
      if (!title) {
        return;
      }
      // Find the item by title or processed title
      const item = sidebar.find((x) => x.processedTitle === title || x.toc_title === title);
      if (!item) {
        console_1.Console.errror('Failed to find docs item', title);
        return;
      }
      return command.process(item);
    });
  }
  context.subscriptions.push(vscode_1.commands.registerCommand(shared_1.Commands.ShowDocs, showDocs));
}
const day_diff_2 = 1000 * 60 * 60 * 24 * 2;
// URL with the list of all docs
const sidebar_url = 'https://learn.microsoft.com/en-us/minecraft/creator/toc.json';
// URL to the docs, that will be prepended to the href
const html_url = 'https://learn.microsoft.com/en-us/minecraft/creator/';
/**
 * Represents a command to show documentation.
 */
class ShowDocsCommand {
  storage;
  // Cached flattened sidebar
  sidebar;
  /**
   * Creates a new instance of the ShowDocsCommand class.
   * @param storage The storage path.
   */
  constructor(storage) {
    this.storage = storage;
    this.sidebar = [];
  }
  /**
   * Gets the flattened sidebar.
   * @returns A promise that resolves to the flattened sidebar. or an empty array if the sidebar could not be downloaded.
   */
  async getSidebar() {
    if (this.sidebar.length > 0) {
      return this.sidebar;
    }
    const data = await fetch(sidebar_url);
    if (!data.ok) {
      vscode_1.window.showErrorMessage('Failed to download docs sidebar');
      return this.sidebar;
    }
    const jsonData = await data.json();
    if (!Sidebar.is(jsonData)) {
      vscode_1.window.showErrorMessage('Failed to parse docs sidebar');
      return this.sidebar;
    }
    return (this.sidebar = this.flattenSidebar(jsonData.items));
  }
  /**
   * Flattens the sidebar from a tree to a list omitting all elements without href.
   * It also adds the processed title to each element.
   * @param sidebar The sidebar to flatten
   * @param prefix The prefix to add to the processed title
   * @returns The flattened sidebar
   */
  flattenSidebar(sidebar, prefix = '') {
    const result = [];
    for (let I = 0; I < sidebar.length; I++) {
      const item = sidebar[I];
      // Add the prefix to the title
      // Remove the docs title from the path, because it is too long
      item.processedTitle = `${prefix}/${item.toc_title}`.replace('/Minecraft: Bedrock Documentation/', '');
      if (item.href) {
        result.push(item);
      }
      if (item.children) {
        // Iterative approach would be better, but recursion is easier
        result.push(...this.flattenSidebar(item.children, item.processedTitle));
      }
    }
    return result;
  }
  /**
   * Gets the filepath for the specified sidebar item.
   * @param item The sidebar item.
   * @returns The filepath for the specified sidebar item.
   */
  getFilepath(item) {
    // At this point, elements without href are filtered out
    return path_1.default.join(this.storage, item.href + '.md');
  }
  /**
   * Checks if the specified file can be read.
   * @param filepath The filepath of the file to check.
   * @returns A promise that resolves to true if the file can be read, false otherwise.
   */
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
      console_1.Console.errror(`Failed to read file ${filepath}`, err);
    }
    return false;
  }
  /**
   * Downloads the specified URI to the specified filepath.
   * @param uri The URI to download.
   * @param filepath The filepath to download to.
   * @returns A promise that resolves when the download is complete.
   */
  async download(uri, filepath) {
    const progressOptions = {
      location: vscode_1.ProgressLocation.Notification,
      title: 'Downloading docs',
      cancellable: false,
    };
    return vscode_1.window.withProgress(progressOptions, async (progress) => {
      const options = {
        method: 'GET',
      };
      progress.report({
        message: 'Downloading docs',
        increment: 0,
      });
      try {
        // Download the html page
        const result = await fetch(uri, options);
        if (!result.ok) {
          vscode_1.window.showErrorMessage('Failed to download docs\n', `${uri}\n${filepath}\n`, result.statusText);
          return;
        }
        const text = await result.text();
        progress.report({ increment: 50 });
        // Find the github link and change blob to raw. It's not the best solution, but it works
        const matches = /(https:\/\/github.com\/MicrosoftDocs\/minecraft-creator\/blob\/main\/[^"]+)/g.exec(text);
        if (!matches || matches.length === 0 || matches[0] === undefined) {
          vscode_1.window.showErrorMessage('Failed to download docs\n', `${uri}\n${filepath}\nNo github link found`);
          return;
        }
        const mdUrl = matches[0].replace(
          'MicrosoftDocs/minecraft-creator/blob/',
          'MicrosoftDocs/minecraft-creator/raw/',
        );
        // Download the markdown file
        const mdResult = await fetch(mdUrl, options);
        if (!mdResult.ok) {
          vscode_1.window.showErrorMessage('Failed to download docs\n', `${uri}\n${filepath}\n`, mdResult.statusText);
          return;
        }
        const mdText = await mdResult.text();
        await vscode_1.workspace.fs.writeFile(vscode_1.Uri.file(filepath), Buffer.from(mdText, 'utf8'));
        console_1.Console.info('Downloaded docs', filepath);
      } catch (err) {
        vscode_1.window.showErrorMessage('Failed to download docs\n', `${uri}\n${filepath}\n`, JSON.stringify(err));
      }
      progress.report({ increment: 50 });
    });
  }
  /**
   * Processes the specified sidebar item.
   * @param item The sidebar item to process.
   * @returns A promise that resolves when the processing is complete.
   */
  async process(item) {
    const filepath = this.getFilepath(item);
    const dir = path_1.default.dirname(filepath);
    await vscode_1.workspace.fs.createDirectory(vscode_1.Uri.file(dir));
    const canRead = await this.canRead(filepath);
    if (!canRead) {
      const html_uri = html_url + item.href;
      await this.download(html_uri, filepath);
    }
    try {
      const uri = vscode_1.Uri.file(filepath);
      // Open the markdown preview
      await vscode_1.commands.executeCommand('markdown.showPreview', uri);
    } catch (err) {
      vscode_1.window.showErrorMessage('Failed to open docs', filepath, JSON.stringify(err));
    }
  }
}
var Sidebar;
(function (Sidebar) {
  function is(item) {
    return item && item.items && Array.isArray(item.items);
  }
  Sidebar.is = is;
})(Sidebar || (Sidebar = {}));
//# sourceMappingURL=show-docs.js.map
