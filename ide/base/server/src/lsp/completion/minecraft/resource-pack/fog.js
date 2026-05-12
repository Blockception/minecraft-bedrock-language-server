"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
const utils_1 = require("../utils");
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined fog', 'The fog');
    const data = context.document.configuration();
    // Add fogs from .mcdefinitions
    context.builder.generate(data.definitions.fog?.defined, generateDoc, constants_1.Kinds.Completion.Fogs);
    context.builder.generate(context.database.ProjectData.resourcePacks.fogs, generateDoc, constants_1.Kinds.Completion.Fogs);
    //Generate for vanilla data
    const generateV = (item) => `The vanilla fog: ${item}`;
    //Vanilla data
    context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.fogs, generateV, constants_1.Kinds.Completion.Fogs);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document))
        context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.fogs, generateV, constants_1.Kinds.Completion.Fogs);
}
//# sourceMappingURL=fog.js.map