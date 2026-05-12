"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
const utils_1 = require("../utils");
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined texture', 'The texture');
    const generateV = (item) => `The vanilla texture: ${item}`;
    const data = context.document.configuration();
    // Add textures from .mcdefinitions
    context.builder.generate(data.definitions.texture?.defined, generateDoc, constants_1.Kinds.Completion.Texture);
    context.builder.generate(context.database.ProjectData.resourcePacks.textures, generateDoc, constants_1.Kinds.Completion.Texture);
    context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.textures, generateV, constants_1.Kinds.Completion.Texture);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document)) {
        context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.textures, generateV, constants_1.Kinds.Completion.Texture);
    }
}
//# sourceMappingURL=textures.js.map