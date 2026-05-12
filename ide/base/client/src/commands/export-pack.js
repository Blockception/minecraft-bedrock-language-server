"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const ide_shared_1 = require("@blockception/ide-shared");
const manager_1 = require("../manager/manager");
/**
 * Reads all manifest.json files in the workspace and returns quick-pick items
 * with the pack name and type (Behavior Pack / Resource Pack).
 */
async function getPackItems() {
    const manifests = await vscode_1.workspace.findFiles('**/manifest.json', '**/node_modules/**');
    const items = [];
    for (const manifest of manifests) {
        try {
            const raw = await vscode_1.workspace.fs.readFile(manifest);
            const text = Buffer.from(raw).toString('utf8');
            const json = JSON.parse(text);
            const name = json?.header?.name ?? 'Unknown Pack';
            const modules = json?.modules ?? [];
            const packType = getPackType(modules);
            items.push({
                label: name,
                description: packType,
                uri: vscode_1.Uri.joinPath(manifest, '..').toString(),
            });
        }
        catch {
            // Skip manifests that cannot be read or parsed
        }
    }
    return items;
}
/** Returns a human-readable pack type label based on the manifest modules */
function getPackType(modules) {
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
function sanitizeFilename(name) {
    return name.replace(/[^a-zA-Z0-9_\-. ]/g, '_');
}
function activate(context) {
    /** Export a single pack as a .mcpack file */
    context.subscriptions.push(vscode_1.commands.registerCommand(ide_shared_1.Commands.Export.Pack, async () => {
        // Discover packs in the workspace
        let packItems;
        try {
            packItems = await getPackItems();
        }
        catch (err) {
            vscode_1.window.showErrorMessage(`Failed to discover packs: ${err}`);
            return;
        }
        if (packItems.length === 0) {
            vscode_1.window.showErrorMessage('No packs found in the current workspace.');
            return;
        }
        // If there is more than one pack, ask the user which one to export
        let selected;
        if (packItems.length === 1) {
            selected = packItems[0];
        }
        else {
            const pick = await vscode_1.window.showQuickPick(packItems, {
                placeHolder: 'Select the pack to export',
                title: 'Export Pack as .mcpack',
            });
            if (!pick)
                return;
            selected = pick;
        }
        // Ask where to save the .mcpack file
        const defaultName = sanitizeFilename(selected.label) + '.mcpack';
        const saveUri = await vscode_1.window.showSaveDialog({
            defaultUri: getDefaultSaveUri(defaultName),
            filters: {
                'Minecraft Pack': ['mcpack'],
                'ZIP Archive': ['zip'],
            },
            title: 'Export as .mcpack',
            saveLabel: 'Export',
        });
        if (!saveUri)
            return;
        try {
            const opts = {
                command: ide_shared_1.Commands.Export.Pack,
                arguments: [selected.uri, saveUri.fsPath],
            };
            await manager_1.Manager.Client.sendRequest(node_1.ExecuteCommandRequest.type, opts);
            const open = await vscode_1.window.showInformationMessage(`Exported pack to: ${saveUri.fsPath}`, 'Show in Explorer');
            if (open === 'Show in Explorer') {
                await vscode_1.commands.executeCommand('revealFileInOS', saveUri);
            }
        }
        catch (err) {
            vscode_1.window.showErrorMessage(`Failed to export pack: ${err}`);
        }
    }));
    /** Export all packs as a .mcaddon file */
    context.subscriptions.push(vscode_1.commands.registerCommand(ide_shared_1.Commands.Export.Addon, async () => {
        // Derive a default add-on name from the workspace folder name
        const wsName = vscode_1.workspace.workspaceFolders?.[0]?.name ?? 'addon';
        const defaultName = sanitizeFilename(wsName) + '.mcaddon';
        const saveUri = await vscode_1.window.showSaveDialog({
            defaultUri: getDefaultSaveUri(defaultName),
            filters: {
                'Minecraft Add-On': ['mcaddon'],
                'ZIP Archive': ['zip'],
            },
            title: 'Export as .mcaddon',
            saveLabel: 'Export',
        });
        if (!saveUri)
            return;
        try {
            const opts = {
                command: ide_shared_1.Commands.Export.Addon,
                arguments: [saveUri.fsPath],
            };
            await manager_1.Manager.Client.sendRequest(node_1.ExecuteCommandRequest.type, opts);
            const open = await vscode_1.window.showInformationMessage(`Exported add-on to: ${saveUri.fsPath}`, 'Show in Explorer');
            if (open === 'Show in Explorer') {
                await vscode_1.commands.executeCommand('revealFileInOS', saveUri);
            }
        }
        catch (err) {
            vscode_1.window.showErrorMessage(`Failed to export add-on: ${err}`);
        }
    }));
}
/**
 * Returns a default save URI rooted at the first workspace folder.
 * Falls back to the user's home directory when no workspace is open.
 */
function getDefaultSaveUri(filename) {
    const folder = vscode_1.workspace.workspaceFolders?.[0]?.uri;
    if (folder) {
        return vscode_1.Uri.joinPath(folder, filename);
    }
    return vscode_1.Uri.file(filename);
}
//# sourceMappingURL=export-pack.js.map