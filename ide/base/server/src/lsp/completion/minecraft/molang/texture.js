"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const constants_1 = require("../../../../constants");
const molang_1 = require("../../../../minecraft/molang");
function provideCompletion(context, prefixed = false) {
    const packType = bc_minecraft_bedrock_project_1.PackType.detect(context.document.uri);
    switch (packType) {
        case bc_minecraft_bedrock_project_1.PackType.behavior_pack:
            return;
        case bc_minecraft_bedrock_project_1.PackType.resource_pack:
            const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Texture });
            context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
                (0, molang_1.getScopeDefined)(entity.molang, 'texture').forEach((item) => {
                    const label = (0, molang_1.getIdentifier)(item, prefixed);
                    builder.add({
                        label,
                        documentation: `The defined texture: ${label}\nDeclared by: ${entity.id}`,
                    });
                });
            });
    }
}
//# sourceMappingURL=texture.js.map