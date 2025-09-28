"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packTypeToString = packTypeToString;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
function packTypeToString(type) {
    switch (type) {
        case bc_minecraft_bedrock_project_1.PackType.resource_pack:
            return "resourcepack";
        case bc_minecraft_bedrock_project_1.PackType.behavior_pack:
            return "behaviorpack";
        case bc_minecraft_bedrock_project_1.PackType.skin_pack:
            return "skinpack";
        case bc_minecraft_bedrock_project_1.PackType.world:
            return "world";
        default:
        case bc_minecraft_bedrock_project_1.PackType.unknown:
            return "unknown";
    }
}
//# sourceMappingURL=packs.js.map