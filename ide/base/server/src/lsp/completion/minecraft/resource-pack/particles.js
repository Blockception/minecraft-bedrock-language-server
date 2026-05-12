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
const Textures = __importStar(require("./textures"));
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined particle', 'The particle');
    const generateV = (item) => `The vanilla particle: ${item}`;
    const data = context.document.configuration();
    // Add particles from .mcdefinitions
    context.builder.generate(data.definitions.particle?.defined, generateDoc, constants_1.Kinds.Completion.Particle);
    context.builder.generate(context.database.ProjectData.resourcePacks.particles, generateDoc, constants_1.Kinds.Completion.Particle);
    context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.particles, generateV, constants_1.Kinds.Completion.Particle);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document))
        context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.particles, generateV, constants_1.Kinds.Completion.Particle);
}
function provideJsonCompletion(context) {
    return particleJsonCompletion.onCompletion(context);
}
const particleJsonCompletion = new builder_1.JsonPathCompletion({
    match: (item) => item.endsWith('/basic_render_parameters/texture'),
    onCompletion: Textures.provideCompletion,
});
//# sourceMappingURL=particles.js.map