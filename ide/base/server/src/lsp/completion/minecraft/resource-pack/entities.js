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
const json_path_1 = require("../../builder/json-path");
const molang_1 = require("../molang");
const utils_1 = require("../utils");
const AnimationControllers = __importStar(require("./animation-controllers"));
const Animations = __importStar(require("./animations"));
const Models = __importStar(require("./models"));
const RenderControllers = __importStar(require("./render-controllers"));
const Textures = __importStar(require("./textures"));
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined rp entity', 'The rp entity');
    const generateV = (item) => `The vanilla rp entity: ${item.id}`;
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Entity });
    const data = context.document.configuration();
    // Add entities from .mcdefinitions
    builder.generate(data.definitions.entity?.defined, generateDoc);
    builder.generate(context.database.ProjectData.resourcePacks.entities, generateDoc);
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.entities, generateV);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document)) {
        builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.entities, generateV);
    }
}
function provideJsonCompletion(context) {
    return entityRpJsonCompletion.onCompletion(context);
}
const entityRpJsonCompletion = new json_path_1.JsonPathCompletion({
    match: (path) => path.includes('minecraft:client_entity/description/animations/'),
    onCompletion: (c) => {
        Animations.provideCompletion(c);
        AnimationControllers.provideCompletion(c);
    },
}, {
    match: (path) => path.includes('minecraft:client_entity/description/materials/'),
    onCompletion: molang_1.Material.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:client_entity/description/animation_controllers/'),
    onCompletion: AnimationControllers.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:client_entity/description/geometry/'),
    onCompletion: Models.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:client_entity/description/render_controllers/'),
    onCompletion: RenderControllers.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:client_entity/description/textures/'),
    onCompletion: Textures.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:client_entity/description/scripts/animate/'),
    onCompletion: (context) => {
        const data = context.database.ProjectData.resourcePacks.entities.find((entity) => entity.location.uri === context.document.uri);
        if (data === undefined)
            return;
        context.builder.generate(data.animations.defined, (item) => `The rp entity animation: ${item}`, constants_1.Kinds.Completion.Animation);
    },
});
//# sourceMappingURL=entities.js.map