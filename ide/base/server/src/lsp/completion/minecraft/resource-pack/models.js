"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
const utils_1 = require("../utils");
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined model', 'The model');
    const generateV = (item) => `The vanilla model: ${item}`;
    const data = context.document.configuration();
    // Add models from .mcdefinitions
    context.builder.generate(data.definitions.model?.defined, generateDoc, constants_1.Kinds.Completion.Models);
    context.builder.generate(context.database.ProjectData.resourcePacks.models, generateDoc, constants_1.Kinds.Completion.Models);
    context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.models, generateV, constants_1.Kinds.Completion.Models);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document))
        context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.models, generateV, constants_1.Kinds.Completion.Models);
}
//# sourceMappingURL=models.js.map