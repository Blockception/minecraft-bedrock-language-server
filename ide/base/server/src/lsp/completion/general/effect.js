"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../constants");
function provideCompletion(context) {
    const builder = context.builder;
    bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Effects.forEach((effect) => {
        builder.add({
            label: effect,
            documentation: `The vanilla minecraft effect: '${effect}'`,
            kind: constants_1.Kinds.Completion.Effect,
        });
    });
}
//# sourceMappingURL=effect.js.map