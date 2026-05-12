"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideCompletionTest = provideCompletionTest;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const commands_1 = require("../../../../minecraft/commands");
const attributes_1 = require("../../../../project/attributes");
function provideCompletion(context) {
    const data = context.document.configuration();
    // Add families from .mcdefinitions
    context.builder.generate(data.definitions.family?.defined, (item) => `The defined family: ${item}`, constants_1.Kinds.Completion.Family);
    context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
        const generateDoc = (item) => `The entity family: ${item} from: ${entity.id}`;
        context.builder.generate(entity.families, generateDoc, constants_1.Kinds.Completion.Family);
    });
    //Vanilla data
    context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Entities.families, (item) => `The vanilla entity family: ${item}`, constants_1.Kinds.Completion.Family);
}
function provideCompletionTest(context) {
    const data = context.document.configuration();
    const builder = context.builder;
    const types = (0, commands_1.GetPossibleEntityTypes)(context.command, context.parameterIndex);
    const edu = (0, attributes_1.IsEducationEnabled)(context.document);
    if (types.length === 0) {
        // Add families from .mcdefinitions
        data.definitions.family?.defined?.forEach((family) => {
            builder.add({
                label: family,
                documentation: `Test for the defined family: ${family}`,
                kind: constants_1.Kinds.Completion.Family,
            });
            builder.add({
                label: '!' + family,
                documentation: `Test not for the defined family: ${family}`,
                kind: constants_1.Kinds.Completion.Family,
            });
        });
        context.database.ProjectData.behaviorPacks.entities.forEach((entity) => convertTestEntity(entity, builder));
        bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Entities.families.forEach((family) => {
            builder.add({
                label: family,
                documentation: `Test for the vanilla family: ${family}`,
                kind: constants_1.Kinds.Completion.Family,
            });
            builder.add({
                label: '!' + family,
                documentation: `Test not for the vanilla family: ${family}`,
                kind: constants_1.Kinds.Completion.Family,
            });
        });
    }
    else {
        types.forEach((type) => {
            const entity = context.database.ProjectData.behaviorPacks.entities.get(type);
            if (entity)
                convertTestEntity(entity, builder);
            const vanilla_entity = bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getEntity(type, edu);
            if (vanilla_entity)
                convertTestEntity(vanilla_entity, builder);
        });
    }
}
function convertTestEntity(entity, receiver) {
    const families = Array.isArray(entity.families) ? entity.families : entity.families.defined;
    families.forEach((family) => {
        receiver.add({
            label: family,
            documentation: `Test for the family: ${family}\n\rForm ${entity.id}`,
            kind: constants_1.Kinds.Completion.Family,
        });
        receiver.add({
            label: '!' + family,
            documentation: `Test not for the family: ${family}\n\rForm ${entity.id}`,
            kind: constants_1.Kinds.Completion.Family,
        });
    });
}
//# sourceMappingURL=families.js.map