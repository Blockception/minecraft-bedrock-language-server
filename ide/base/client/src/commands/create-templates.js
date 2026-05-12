"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const ide_shared_1 = require("@blockception/ide-shared");
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const manager_1 = require("../manager/manager");
const AnimationControllerID = { ID: /^[0-9a-zA-Z_\\.\\-]+$/, example: 'example.foo | example' };
const AnimationID = { ID: /^[0-9a-zA-Z_\\.\\-]+$/, example: 'example.foo | example' };
const AttachableID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:attachable' };
const BlockID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:block' };
const BlockCullingRuleID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:culling_rule' };
const DialogueID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'dialogue' };
const EntityID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:entity' };
const FogID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:item' };
const ItemID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:item' };
const LootTableID = { ID: /^[0-9a-zA-Z_\\.\\-]+$/, example: 'example.foo | example' };
const ModelID = { ID: /^geometry.[0-9a-zA-Z_\\.\\-]+$/, example: 'geometry.model_name' };
const ParticleID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:particle' };
const RecipeID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:recipe' };
const RenderControllerID = { ID: /^[0-9a-zA-Z_\\.\\-]+$/, example: '' };
const SpawnRuleID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'example.foo | example' };
const TradingID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'example.foo | example' };
const VolumeID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'example.foo | example' };
const ItemCatalogID = { ID: /^[0-9a-zA-Z_\\.\\-]+$/, example: 'example.foo | example' };
const FeatureID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:feature' };
const FeatureRuleID = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: 'namespace:feature_rule' };
const ProjectID = { ID: /^[A-Za-z]+$/, example: 'EP' };
function activate(context) {
    console.log('registering create commands');
    //General
    createCommandWithID(context, ide_shared_1.Commands.Create.General.Entity, 'Create Entity', EntityID);
    createCommand(context, ide_shared_1.Commands.Create.General.Languages);
    createCommand(context, ide_shared_1.Commands.Create.General.Manifests);
    context.subscriptions.push(vscode_1.commands.registerCommand(ide_shared_1.Commands.Create.General.PackFoldersAll, async (arg) => {
        if (!arg)
            arg = [];
        // append active document uri as other commands do
        arg.push(vscode_1.window.activeTextEditor?.document.uri.toString());
        const opts = {
            command: ide_shared_1.Commands.Create.General.PackFoldersAll,
            arguments: arg,
        };
        const dirs = await manager_1.Manager.Client.sendRequest(node_1.ExecuteCommandRequest.type, opts);
        if (!dirs || !Array.isArray(dirs))
            return;
        for (const d of dirs) {
            try {
                await vscode_1.workspace.fs.createDirectory(vscode_1.Uri.parse(d));
            }
            catch (err) {
                // ignore errors for existing folders or inaccessible paths
            }
        }
        vscode_1.window.showInformationMessage('Created pack folder structure');
    }));
    // Create regular used pack folders
    context.subscriptions.push(vscode_1.commands.registerCommand(ide_shared_1.Commands.Create.General.PackFoldersRegular, async (arg) => {
        if (!arg)
            arg = [];
        arg.push(vscode_1.window.activeTextEditor?.document.uri.toString());
        const opts = {
            command: ide_shared_1.Commands.Create.General.PackFoldersRegular,
            arguments: arg,
        };
        const dirs = await manager_1.Manager.Client.sendRequest(node_1.ExecuteCommandRequest.type, opts);
        if (!dirs || !Array.isArray(dirs))
            return;
        for (const d of dirs) {
            try {
                await vscode_1.workspace.fs.createDirectory(vscode_1.Uri.parse(d));
            }
            catch (err) {
                // ignore errors for existing folders or inaccessible paths
            }
        }
        vscode_1.window.showInformationMessage('Created regular pack folder structure');
    }));
    // Clean empty pack folders (confirmation + server-side cleanup)
    context.subscriptions.push(vscode_1.commands.registerCommand(ide_shared_1.Commands.Create.General.PackFoldersClean, async (arg) => {
        if (!arg)
            arg = [];
        arg.push(vscode_1.window.activeTextEditor?.document.uri.toString());
        const opts = {
            command: ide_shared_1.Commands.Create.General.PackFoldersClean,
            arguments: arg,
        };
        const result = await manager_1.Manager.Client.sendRequest(node_1.ExecuteCommandRequest.type, opts);
        if (!result || !Array.isArray(result) || result.length === 0) {
            vscode_1.window.showInformationMessage('No empty folders found');
            return;
        }
        const deleted = [];
        const failed = [];
        for (const d of result) {
            try {
                await vscode_1.workspace.fs.delete(vscode_1.Uri.parse(d), { recursive: true });
                deleted.push(d);
            }
            catch (err) {
                failed.push({ uri: d, error: err });
            }
        }
        if (deleted.length > 0) {
            vscode_1.window.showInformationMessage(`Removed ${deleted.length} empty folders`);
        }
        else {
            vscode_1.window.showInformationMessage('No empty folders removed');
        }
        if (failed.length > 0) {
            const msg = `Failed to remove ${failed.length} folders`;
            vscode_1.window.showErrorMessage(msg);
        }
    }));
    //Project
    createCommandWithID(context, ide_shared_1.Commands.Create.Project.WorldProject, 'Create World, BP, RP project', ProjectID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Project.Resourcepack, 'Create RP', ProjectID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Project.Behaviorpack, 'Create BP', ProjectID);
    //Behavior pack
    createCommand(context, ide_shared_1.Commands.Create.Behaviorpack.Languages);
    createCommand(context, ide_shared_1.Commands.Create.Behaviorpack.Manifests);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Animation_Controller, 'Create animation controller', AnimationControllerID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Animation, 'Create animation', AnimationID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Block, 'Create block', BlockID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Dialogue, 'Create dialogue', DialogueID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Entity, 'Create entity', EntityID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Item, 'Create item', ItemID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Loot_Table, 'Create loot table', LootTableID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Recipe, 'Create recipe', RecipeID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Spawn_Rule, 'Create spawn rule', SpawnRuleID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Trading, 'Create trading', TradingID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Volume, 'Create volume', VolumeID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Item_Catalog, 'Create item catalog', ItemCatalogID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Feature, 'Create feature', FeatureID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Behaviorpack.Feature_Rule, 'Create feature rule', FeatureRuleID);
    //Resource pack
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Biomes_Client);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Blocks);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Flipbook_Textures);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Item_Texture);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Languages);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Manifests);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Music_Definitions);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Sound_Definitions);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Sounds);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Terrain_Texture);
    createCommand(context, ide_shared_1.Commands.Create.Resourcepack.Texture_List);
    createCommandWithID(context, ide_shared_1.Commands.Create.Resourcepack.Animation_Controller, 'Create animation controllers files', AnimationControllerID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Resourcepack.Animation, 'Create animations files', AnimationID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Resourcepack.Attachable, 'Create attachable files', AttachableID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Resourcepack.BlockCulling, 'Create the block culling rule file', BlockCullingRuleID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Resourcepack.Entity, 'Create entities files', EntityID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Resourcepack.Fog, 'Create fog file', FogID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Resourcepack.Model, 'Create reate model file', ModelID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Resourcepack.Particle, 'Create particle file', ParticleID);
    createCommandWithID(context, ide_shared_1.Commands.Create.Resourcepack.Render_Controller, 'Create render_controller file', RenderControllerID);
    //World
    createCommand(context, ide_shared_1.Commands.Create.World.Languages);
    createCommand(context, ide_shared_1.Commands.Create.World.Manifests);
}
function createCommand(context, command) {
    context.subscriptions.push(vscode_1.commands.registerCommand(command, (arg) => {
        onCommandComplete(command, arg);
    }));
}
function createCommandWithID(context, command, title, IDRegex) {
    context.subscriptions.push(vscode_1.commands.registerCommand(command, (arg) => {
        const opts = {
            validateInput(value) {
                return validateID(value, IDRegex);
            },
            title: title,
            prompt: title,
            password: false,
            ignoreFocusOut: true,
            placeHolder: IDRegex.example,
        };
        if (!arg)
            arg = [];
        if (arg.length > 0) {
            if (typeof arg === 'string')
                return onCompleteID(arg, command);
            if (Array.isArray(arg)) {
                const id = arg[0];
                if (typeof id === 'string')
                    return onCompleteID(id, command);
            }
        }
        return vscode_1.window.showInputBox(opts).then((value) => onCompleteID(value, command));
    }));
}
function onCompleteID(value, command) {
    if (value === undefined)
        return Promise.resolve();
    const doc = vscode_1.window.activeTextEditor?.document.uri;
    let uri = undefined;
    if (doc !== undefined) {
        const ws = vscode_1.workspace.getWorkspaceFolder(doc);
        if (ws !== undefined) {
            uri = ws.uri;
        }
    }
    if (uri === undefined) {
        uri = vscode_1.workspace.workspaceFolders?.[0].uri;
        if (uri === undefined) {
            vscode_1.window.showErrorMessage('No workspace folder found');
            return Promise.resolve();
        }
    }
    const opts = {
        command: command,
        arguments: [value, uri.toString()],
    };
    return manager_1.Manager.Client.sendRequest(node_1.ExecuteCommandRequest.type, opts);
}
function onCommandComplete(command, arg) {
    if (!arg)
        arg = [];
    arg.push(vscode_1.window.activeTextEditor?.document.uri.toString());
    const opts = {
        command: command,
        arguments: arg,
    };
    return manager_1.Manager.Client.sendRequest(node_1.ExecuteCommandRequest.type, opts);
}
function validateID(ID, IDRegex) {
    if (ID === undefined)
        return undefined;
    if (ID.match(IDRegex.ID)) {
        return undefined;
    }
    else {
        return `Does not match pattern: ${IDRegex.example}`;
    }
}
//# sourceMappingURL=create-templates.js.map