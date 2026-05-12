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
            return provideGeometries(context);
        default:
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.animation:
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.animation_controller:
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.render_controller:
            const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Models });
            context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
                (0, molang_1.getScopeDefined)(entity.molang, 'geometry').forEach((geo) => {
                    const identifier = (0, molang_1.getIdentifier)(geo, prefixed);
                    builder.add({
                        label: identifier,
                        documentation: `The defined geomtry: ${identifier}\nDeclared by: ${entity.id}`,
                    });
                });
            });
            break;
    }
}
function provideBehaviorPackCompletion(context) {
    switch (bc_minecraft_bedrock_project_1.BehaviorPack.FileType.detect(context.document.uri)) {
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.block:
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.item:
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.entity:
            return provideGeometries(context);
    }
}
function provideGeometries(context) {
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Models });
    const gen = (item) => `The model: ${item}\nDeclared in: ${item.location.uri}`;
    builder.generate(context.database.ProjectData.resourcePacks.models, gen);
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.Vanilla.ResourcePack.Models, (item) => `The vanilla model: ${item}`);
}
//# sourceMappingURL=geometry.js.map