"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
function provideCompletion(context) {
    const generateDoc = (item) => `The trading table: ${item.id}`;
    const generatesDoc = (item) => `The vanilla trading table: ${item}`;
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Trading });
    builder.generate(context.database.ProjectData.behaviorPacks.trading, generateDoc);
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.trading, generatesDoc);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document)) {
        builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.trading, generatesDoc);
    }
}
//# sourceMappingURL=trading.js.map