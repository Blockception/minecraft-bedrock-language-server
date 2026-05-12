"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
const utils_1 = require("../utils");
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined material', 'The material');
    const generateV = (item) => `The vanilla material: ${item}`;
    const data = context.document.configuration();
    // Add materials from .mcdefinitions
    context.builder.generate(data.definitions.material?.defined, generateDoc, constants_1.Kinds.Completion.Materials);
    context.builder.generate(context.database.ProjectData.resourcePacks.materials, generateDoc, constants_1.Kinds.Completion.Materials);
    context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.materials, generateV, constants_1.Kinds.Completion.Materials);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document))
        context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.materials, generateV, constants_1.Kinds.Completion.Materials);
}
//# sourceMappingURL=materials.js.map