"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../../constants");
const context_1 = require("../../../context");
/**
 *
 * @param context
 * @returns
 */
function provideCompletion(context) {
    const { builder, database } = context;
    if (context_1.CommandCompletionContext.is(context)) {
        const parameters = context.bestMatch.parameters;
        const Index = parameters.findIndex((p) => p.type === bc_minecraft_bedrock_command_1.ParameterType.entity);
        if (Index >= 0) {
            const EntityID = parameters[Index].text;
            const Entity = database.ProjectData.behaviorPacks.entities.get(EntityID);
            if (Entity) {
                convert(Entity, builder);
                return;
            }
        }
    }
    database.ProjectData.behaviorPacks.entities.forEach((entity) => convert(entity, builder));
    const generateDoc = (item) => `The vanilla entity event: ${item}`;
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Entities.events, generateDoc, constants_1.Kinds.Completion.Event);
}
/**
 *
 * @param Entity
 * @param builder
 */
function convert(Entity, builder) {
    const generateDoc = (item) => `The entity event: ${item}\nFrom: ${Entity.id}`;
    builder.generate(Entity.events, generateDoc, constants_1.Kinds.Completion.Event);
}
//# sourceMappingURL=event.js.map