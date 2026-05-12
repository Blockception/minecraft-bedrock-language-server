"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_world_project = create_world_project;
exports.create_behaviorpack = create_behaviorpack;
exports.create_resourcepack = create_resourcepack;
const ide_shared_1 = require("@blockception/ide-shared");
const util_1 = require("../../../util");
const language_1 = require("../../templates/language");
const functions_1 = require("./functions");
async function create_world_project(context, id, folders, builder) {
    const folder = util_1.Vscode.join(folders.WorkSpace(), 'world');
    const nfolders = {
        WorkSpace: () => folders.WorkSpace(),
        BehaviorPack: () => util_1.Vscode.join(folder, 'behavior_packs', id + '-bp'),
        ResourcePack: () => util_1.Vscode.join(folder, 'resource_packs', id + '-rp'),
        WorldFolder: () => folder,
    };
    await Promise.all([
        (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.World.Manifests, context, nfolders.WorldFolder()),
        (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.Behaviorpack.Manifests, context, nfolders.BehaviorPack()),
        (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.Resourcepack.Manifests, context, nfolders.ResourcePack()),
    ]);
    //create world manifest
    (0, language_1.create_language_files)(nfolders.BehaviorPack(), builder, languageBP);
    (0, language_1.create_language_files)(nfolders.ResourcePack(), builder, languageRP);
    (0, language_1.create_language_files)(nfolders.WorldFolder(), builder, languageWP);
}
/**
 *
 * @param id
 * @param context
 * @param builder
 */
async function create_behaviorpack(context, id, folders, builder) {
    const folder = util_1.Vscode.join(folders.WorkSpace(), `${id}-bp`);
    const nfolders = {
        WorkSpace: () => folders.WorkSpace(),
        BehaviorPack: () => folder,
        ResourcePack: () => folder,
        WorldFolder: folders.WorldFolder,
    };
    await (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.Behaviorpack.Manifests, context, nfolders.BehaviorPack());
    (0, language_1.create_language_files)(folder, builder, languageBP);
}
/**
 *
 * @param id
 * @param folders
 * @param builder
 */
async function create_resourcepack(context, id, folders, builder) {
    const folder = util_1.Vscode.join(folders.WorkSpace(), `${id}-rp`);
    const nfolders = {
        WorkSpace: folders.WorkSpace,
        BehaviorPack: () => folder,
        ResourcePack: () => folder,
        WorldFolder: folders.WorldFolder,
    };
    await (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.Resourcepack.Manifests, context, nfolders.ResourcePack());
    (0, language_1.create_language_files)(folder, builder, languageRP);
}
function languageWP(text) {
    text.Add('pack.name', 'Example wp pack name');
    text.Add('pack.description', 'The text that describes this world example pack');
}
function languageBP(text) {
    text.Add('pack.name', 'Example wp pack name');
    text.Add('pack.description', 'The behaviors for the project');
}
function languageRP(text) {
    text.Add('pack.name', 'Example resource pack name');
    text.Add('pack.description', 'The resources for the project');
}
//# sourceMappingURL=project.js.map