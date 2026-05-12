"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideJsonCompletion = provideJsonCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
const builder_1 = require("../../builder");
const utils_1 = require("../utils");
const BlockCulling = __importStar(require("../resource-pack/block-culling"));
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined block', 'The block definition');
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Block });
    const data = context.document.configuration();
    // Add blocks from .mcdefinitions
    builder.generate(data.definitions.block?.defined, generateDoc);
    builder.generate(context.database.ProjectData.behaviorPacks.blocks, generateDoc);
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.blocks, generateDoc);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document))
        builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.blocks, generateDoc);
}
function provideJsonCompletion(context) {
    return blocksBPJsonCompletion.onCompletion(context);
}
const blocksBPJsonCompletion = new builder_1.JsonPathCompletion({
    match: 'minecraft:block/components/minecraft:geometry/culling',
    onCompletion: BlockCulling.provideCompletion,
});
//# sourceMappingURL=blocks.js.map