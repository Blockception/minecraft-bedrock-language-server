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
exports.provideJsonCompletion = provideJsonCompletion;
const resource_pack_1 = require("bc-minecraft-bedrock-project/src/project/resource-pack");
const AnimationControllers = __importStar(require("./animation-controllers"));
const Animations = __importStar(require("./animations"));
const Attachables = __importStar(require("./attachables"));
const BlockCulling = __importStar(require("./block-culling"));
const Entities = __importStar(require("./entities"));
const RenderController = __importStar(require("./render-controllers"));
const SoundDefinitions = __importStar(require("./sound-definitions"));
const Sound = __importStar(require("./sounds"));
const TexturesAtlas = __importStar(require("./texture-atlas"));
const Textures = __importStar(require("./textures"));
const Manifests = __importStar(require("../../general/manifests"));
function provideJsonCompletion(context) {
    //Prepare data to be fixed for json
    const data = context.currentText;
    if (data.startsWith('textures/'))
        Textures.provideCompletion(context);
    if (data.startsWith('sounds/'))
        Sound.provideCompletion(context);
    switch (resource_pack_1.FileType.detect(context.document.uri)) {
        case resource_pack_1.FileType.animation:
            return Animations.provideJsonCompletion(context);
        case resource_pack_1.FileType.animation_controller:
            return AnimationControllers.provideJsonCompletion(context);
        case resource_pack_1.FileType.attachable:
            return Attachables.provideJsonCompletion(context);
        case resource_pack_1.FileType.blockCullingRules:
            return BlockCulling.provideJsonCompletion(context);
        case resource_pack_1.FileType.entity:
            return Entities.provideJsonCompletion(context);
        case resource_pack_1.FileType.manifest:
            return Manifests.provideJsonCompletion(context);
        case resource_pack_1.FileType.render_controller:
            return RenderController.provideJsonCompletion(context);
        case resource_pack_1.FileType.sounds_definitions:
            return SoundDefinitions.provideJsonCompletion(context);
        case resource_pack_1.FileType.texture_flipbook_atlas:
        case resource_pack_1.FileType.texture_item_atlas:
        case resource_pack_1.FileType.texture_terrain_atlas:
            return TexturesAtlas.provideJsonCompletion(context);
        // case FileType.biomes_client:
        // case FileType.block:
        // case FileType.fog:
        // case FileType.item:
        // case FileType.material:
        // case FileType.model:
        // case FileType.music_definitions:
        // case FileType.particle:
        // case FileType.sounds:
        // case FileType.texture:
        // case FileType.unknown:
        default:
            break;
    }
}
//# sourceMappingURL=main.js.map