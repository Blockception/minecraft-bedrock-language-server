"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideJsonCompletion = provideJsonCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
const builder_1 = require("../../builder");
const utils_1 = require("../utils");
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined item', 'The item definition');
    const builder = context.builder;
    const data = context.document.configuration();
    // Add items from .mcdefinitions
    builder.generate(data.definitions.item?.defined, generateDoc, constants_1.Kinds.Completion.Item);
    //Project data
    builder.generate(context.database.ProjectData.behaviorPacks.items, generateDoc, constants_1.Kinds.Completion.Item);
    //spawn_eggs
    context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
        builder.add({
            label: entity.id + '_spawn_egg',
            documentation: 'The spawn egg for entity: ' + entity.id,
            kind: constants_1.Kinds.Completion.Entity,
        });
    });
    //Vanilla data
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.items, generateDoc, constants_1.Kinds.Completion.Item);
    //spawn_eggs
    bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.entities.forEach((entity) => {
        builder.add({
            label: entity.id + '_spawn_egg',
            documentation: 'The spawn egg for entity: ' + entity.id,
            kind: constants_1.Kinds.Completion.Entity,
        });
    });
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document)) {
        //Vanilla data
        builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.items, generateDoc, constants_1.Kinds.Completion.Item);
        //spawn_eggs
        bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.entities.forEach((entity) => {
            builder.add({
                label: entity.id + '_spawn_egg',
                documentation: 'The spawn egg for entity: ' + entity.id,
                kind: constants_1.Kinds.Completion.Entity,
            });
        });
    }
    //Custom block items
    builder.generate(context.database.ProjectData.behaviorPacks.blocks, (item) => `The block-item definition: ${item.id}`, constants_1.Kinds.Completion.Block);
}
function provideJsonCompletion(context) {
    return itemJsonCompletion.onCompletion(context);
}
const itemJsonCompletion = new builder_1.JsonPathCompletion(builder_1.JsonPathMatch.create('minecraft:icon/texture', provideCompletion));
//# sourceMappingURL=items.js.map