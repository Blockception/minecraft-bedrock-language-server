"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideDefinedAnimationCompletion = provideDefinedAnimationCompletion;
exports.provideJsonCompletion = provideJsonCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
const builder_1 = require("../../builder");
const utils_1 = require("../utils");
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined rp animation', 'The rp animation');
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Animation });
    const data = context.document.configuration();
    // Add animations from .mcdefinitions
    builder.generate(data.definitions.animation?.defined, generateDoc);
    builder.generate(context.database.ProjectData.resourcePacks.animations, generateDoc);
    builder.generate(context.database.ProjectData.resourcePacks.animationControllers, generateDoc);
    context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
        builder.generate(entity.animations.defined, (item) => `The entity animation: ${item}`);
    });
    //Vanilla data
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.animations, generateDoc);
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.animationControllers, generateDoc);
    bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.entities.forEach((entity) => {
        builder.generate(entity.animations, (item) => `The vanilla entity animation: ${item}`);
    });
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document)) {
        builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.animations, generateDoc);
        builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.animationControllers, generateDoc);
        bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.entities.forEach((entity) => {
            builder.generate(entity.animations, (item) => `The edu entity animation: ${item}`);
        });
    }
}
function provideDefinedAnimationCompletion(context) {
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Animation });
    context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
        builder.generate(entity.animations.defined, () => `Animation defined by ${entity.id}`);
    });
    bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.entities.forEach((entity) => {
        builder.generate(entity.animations, () => `Animation defined by ${entity.id}`);
    });
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document)) {
        bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.entities.forEach((entity) => {
            builder.generate(entity.animations, () => `Animation defined by ${entity.id}`);
        });
    }
}
function provideJsonCompletion(context) {
    return animRPJsonCompletion.onCompletion(context);
}
const animRPJsonCompletion = new builder_1.JsonPathCompletion();
//# sourceMappingURL=animations.js.map