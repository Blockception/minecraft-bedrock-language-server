import { commands, ExtensionContext, Uri, window, workspace } from 'vscode';
import { ExecuteCommandParams, ExecuteCommandRequest } from 'vscode-languageclient/node';
import { Commands } from '@blockception/ide-shared';
import { Manager } from '../manager/manager';

/** Quick-pick item that carries the pack's VSCode URI */
interface PackItem {
  label: string;
  description: string;
  uri: string;
}

/**
 * Reads all manifest.json files in the workspace and returns quick-pick items
 * with the pack name and type (Behavior Pack / Resource Pack).
 */
async function getPackItems(): Promise<PackItem[]> {
  const manifests = await workspace.findFiles('**/manifest.json', '**/node_modules/**');
  const items: PackItem[] = [];

  for (const manifest of manifests) {
    try {
      const raw = await workspace.fs.readFile(manifest);
      const text = Buffer.from(raw).toString('utf8');
      const json = JSON.parse(text);

      const name: string = json?.header?.name ?? 'Unknown Pack';
      const modules: { type?: string }[] = json?.modules ?? [];
      const packType = getPackType(modules);

      items.push({
        label: name,
        description: packType,
        uri: Uri.joinPath(manifest, '..').toString(),
      });
    } catch {
      // Skip manifests that cannot be read or parsed
    }
  }

  return items;
}

/** Returns a human-readable pack type label based on the manifest modules */
function getPackType(modules: { type?: string }[]): string {
  for (const mod of modules) {
    switch (mod.type) {
      case 'data':
        return 'Behavior Pack';
      case 'resources':
        return 'Resource Pack';
      case 'world_template':
        return 'World Template';
      case 'skin_pack':
        return 'Skin Pack';
    }
  }

  return 'Pack';
}

/** Sanitizes a string for use as a filename by replacing invalid characters with underscores */
function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\-. ]/g, '_');
}

export function activate(context: ExtensionContext): void {
  /** Export a single pack as a .mcpack file */
  context.subscriptions.push(
    commands.registerCommand(Commands.Export.Pack, async () => {
      // Discover packs in the workspace
      let packItems: PackItem[];

      try {
        packItems = await getPackItems();
      } catch (err) {
        window.showErrorMessage(`Failed to discover packs: ${err}`);
        return;
      }

      if (packItems.length === 0) {
        window.showErrorMessage('No packs found in the current workspace.');
        return;
      }

      // If there is more than one pack, ask the user which one to export
      let selected: PackItem | undefined;

      if (packItems.length === 1) {
        selected = packItems[0];
      } else {
        const pick = await window.showQuickPick(packItems, {
          placeHolder: 'Select the pack to export',
          title: 'Export Pack as .mcpack',
        });

        if (!pick) return;
        selected = pick;
      }

      // Ask where to save the .mcpack file
      const defaultName = sanitizeFilename(selected.label) + '.mcpack';
      const saveUri = await window.showSaveDialog({
        defaultUri: getDefaultSaveUri(defaultName),
        filters: {
          'Minecraft Pack': ['mcpack'],
          'ZIP Archive': ['zip'],
        },
        title: 'Export as .mcpack',
        saveLabel: 'Export',
      });

      if (!saveUri) return;

      try {
        const opts: ExecuteCommandParams = {
          command: Commands.Export.Pack,
          arguments: [selected.uri, saveUri.fsPath],
        };

        await Manager.Client.sendRequest(ExecuteCommandRequest.type, opts);
        const open = await window.showInformationMessage(
          `Exported pack to: ${saveUri.fsPath}`,
          'Show in Explorer',
        );

        if (open === 'Show in Explorer') {
          await commands.executeCommand('revealFileInOS', saveUri);
        }
      } catch (err) {
        window.showErrorMessage(`Failed to export pack: ${err}`);
      }
    }),
  );

  /** Export all packs as a .mcaddon file */
  context.subscriptions.push(
    commands.registerCommand(Commands.Export.Addon, async () => {
      // Derive a default add-on name from the workspace folder name
      const wsName = workspace.workspaceFolders?.[0]?.name ?? 'addon';
      const defaultName = sanitizeFilename(wsName) + '.mcaddon';

      const saveUri = await window.showSaveDialog({
        defaultUri: getDefaultSaveUri(defaultName),
        filters: {
          'Minecraft Add-On': ['mcaddon'],
          'ZIP Archive': ['zip'],
        },
        title: 'Export as .mcaddon',
        saveLabel: 'Export',
      });

      if (!saveUri) return;

      try {
        const opts: ExecuteCommandParams = {
          command: Commands.Export.Addon,
          arguments: [saveUri.fsPath],
        };

        await Manager.Client.sendRequest(ExecuteCommandRequest.type, opts);
        const open = await window.showInformationMessage(
          `Exported add-on to: ${saveUri.fsPath}`,
          'Show in Explorer',
        );

        if (open === 'Show in Explorer') {
          await commands.executeCommand('revealFileInOS', saveUri);
        }
      } catch (err) {
        window.showErrorMessage(`Failed to export add-on: ${err}`);
      }
    }),
  );
}

/**
 * Returns a default save URI rooted at the first workspace folder.
 * Falls back to the user's home directory when no workspace is open.
 */
function getDefaultSaveUri(filename: string): Uri {
  const folder = workspace.workspaceFolders?.[0]?.uri;

  if (folder) {
    return Uri.joinPath(folder, filename);
  }

  return Uri.file(filename);
}
