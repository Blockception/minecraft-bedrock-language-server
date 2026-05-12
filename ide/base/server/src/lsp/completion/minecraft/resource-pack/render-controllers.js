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
const Molang = __importStar(require("../molang"));
function provideCompletion(context) {
    const generateDoc = (item) => `The render controller: ${item.id}`;
    const generateV = (item) => `The vanilla render controller: ${item}`;
    context.builder.generate(context.database.ProjectData.resourcePacks.renderControllers, generateDoc, constants_1.Kinds.Completion.RenderController);
    context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.renderControllers, generateV, constants_1.Kinds.Completion.RenderController);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document))
        context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.renderControllers, generateV, constants_1.Kinds.Completion.RenderController);
}
function provideJsonCompletion(context) {
    return jsonRenderController.onCompletion(context);
}
const jsonRenderController = new builder_1.JsonPathCompletion({
    match: (path) => path.endsWith('geometry'),
    onCompletion: (c) => Molang.Geometry.provideResourcePackCompletion(c, true),
}, {
    match: /\/material\/(\d+)/,
    onCompletion: (c) => Molang.Material.provideResourcePackCompletion(c, true),
}, {
    match: /\/textures\/(\d+)/,
    onCompletion: Molang.Texture.provideCompletion,
});
//# sourceMappingURL=render-controllers.js.map