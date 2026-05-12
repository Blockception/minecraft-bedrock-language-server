"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideResourcePackCompletion = provideResourcePackCompletion;
exports.provideBehaviorPackCompletion = provideBehaviorPackCompletion;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const molang_1 = require("../../../../minecraft/molang");
function provideCompletion(context) {
    const packType = bc_minecraft_bedrock_project_1.PackType.detect(context.document.uri);
    switch (packType) {
        case bc_minecraft_bedrock_project_1.PackType.behavior_pack:
            return provideBehaviorPackCompletion(context);
        case bc_minecraft_bedrock_project_1.PackType.resource_pack:
            return provideResourcePackCompletion(context);
    }
}
function provideResourcePackCompletion(context, prefixed = false) {
    const fileType = bc_minecraft_bedrock_project_1.ResourcePack.FileType.detect(context.document.uri);
    switch (fileType) {
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.item:
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.entity:
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.attachable:
            return provideMaterials(context);
        default:
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.animation:
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.animation_controller:
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.render_controller:
            const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Materials });
            context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
                (0, molang_1.getScopeDefined)(entity.molang, 'material').forEach((item) => {
                    const label = (0, molang_1.getIdentifier)(item, prefixed);
                    builder.add({
                        label,
                        documentation: `The defined material: ${item}\nDeclared by: ${entity.id}`,
                    });
                });
            });
            break;
    }
}
function provideBehaviorPackCompletion(context) {
    const fileType = bc_minecraft_bedrock_project_1.BehaviorPack.FileType.detect(context.document.uri);
    switch (fileType) {
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.block:
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.item:
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.entity:
            return provideMaterials(context);
    }
}
function provideMaterials(context) {
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Materials });
    const gen = (item) => `The material: ${item}\nDeclared in: ${item.location.uri}`;
    builder.generate(context.database.ProjectData.resourcePacks.materials, gen);
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.Vanilla.ResourcePack.Materials, (item) => `The vanilla material: ${item}`);
}
//# sourceMappingURL=materials.js.map