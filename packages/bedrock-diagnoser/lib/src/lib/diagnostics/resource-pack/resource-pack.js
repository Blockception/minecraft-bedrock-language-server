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
exports.ResourcePack = void 0;
const resource_pack_1 = require("bc-minecraft-bedrock-project/lib/src/project/resource-pack");
const Animation = __importStar(require("./animation/document"));
const AnimationController = __importStar(require("./animation-controllers/document"));
const Attachable = __importStar(require("./attachable/document"));
const BlockCulling = __importStar(require("./block-culling/document"));
const BiomesClient = __importStar(require("./biomes-client/document"));
const Block = __importStar(require("./block/document"));
const Blocks = __importStar(require("./block/document"));
const Entity = __importStar(require("./entity/document"));
const Fog = __importStar(require("./fog/document"));
const Item = __importStar(require("./item/document"));
const Manifest = __importStar(require("./manifest/entry"));
const Material = __importStar(require("./material/entry"));
const Model = __importStar(require("./model/entry"));
const MusicDefinitions = __importStar(require("./music-definitions/entry"));
const Particle = __importStar(require("./particle/entry"));
const RenderController = __importStar(require("./render-controller/entry"));
const Sounds = __importStar(require("./sounds/entry"));
const SoundsDefinitions = __importStar(require("./sounds-definitions/entry"));
const Texture = __importStar(require("./texture/entry"));
const TextureAtlas = __importStar(require("./texture-atlas/entry"));
const Flipbook = __importStar(require("./texture-atlas/flipbook"));
/** The namespace that deals with resourcepack diagnostics */
var ResourcePack;
(function (ResourcePack) {
    /**
     * Processes and diagnoses the given textdocument
     * @param doc The document to process / diagnose
     * @param diagnoser The diagnoser to report to
     * @returns `true` or `false` whenever or not it was succesfull */
    function diagnose_document(diagnoser) {
        const uri = diagnoser.document.uri;
        const type = resource_pack_1.FileType.detect(uri);
        switch (type) {
            case resource_pack_1.FileType.animation:
                Animation.diagnose_animation_document(diagnoser);
                break;
            case resource_pack_1.FileType.animation_controller:
                AnimationController.diagnose_animation_controller_document(diagnoser);
                break;
            case resource_pack_1.FileType.attachable:
                Attachable.diagnose_attachable_document(diagnoser);
                break;
            case resource_pack_1.FileType.block_culling_rules:
                BlockCulling.diagnose_block_culling_document(diagnoser);
                break;
            case resource_pack_1.FileType.biomes_client:
                BiomesClient.diagnose_biomes_client_document(diagnoser);
                break;
            case resource_pack_1.FileType.block:
                if (uri.endsWith("blocks.json")) {
                    Blocks.diagnose_block_document(diagnoser);
                }
                else {
                    Block.diagnose_block_document(diagnoser);
                }
                break;
            case resource_pack_1.FileType.entity:
                Entity.diagnose_entity_document(diagnoser);
                break;
            case resource_pack_1.FileType.fog:
                Fog.diagnose_fog_document(diagnoser);
                break;
            case resource_pack_1.FileType.item:
                Item.Diagnose(diagnoser);
                break;
            case resource_pack_1.FileType.manifest:
                Manifest.diagnose_manifest_document(diagnoser);
                break;
            case resource_pack_1.FileType.material:
                Material.diagnose_material_document(diagnoser);
                break;
            case resource_pack_1.FileType.model:
                Model.diagnose_model_document(diagnoser);
                break;
            case resource_pack_1.FileType.music_definitions:
                MusicDefinitions.diagnose_music_definitions_document(diagnoser);
                break;
            case resource_pack_1.FileType.particle:
                Particle.diagnose_particle_document(diagnoser);
                break;
            case resource_pack_1.FileType.render_controller:
                RenderController.Diagnose(diagnoser);
                break;
            case resource_pack_1.FileType.sounds:
                Sounds.diagnose_sounds_document(diagnoser);
                break;
            case resource_pack_1.FileType.sounds_definitions:
                SoundsDefinitions.diagnose_sound_definitions_document(diagnoser);
                break;
            case resource_pack_1.FileType.texture:
                Texture.diagnose_texture_document(diagnoser);
                break;
            case resource_pack_1.FileType.texture_flipbook_atlas:
                Flipbook.DiagnoseFlipbook(diagnoser);
                break;
            case resource_pack_1.FileType.texture_item_atlas:
            case resource_pack_1.FileType.texture_terrain_atlas:
                TextureAtlas.diagnose_atlas_document(diagnoser);
                break;
            default:
            case resource_pack_1.FileType.unknown:
                return false;
        }
        return true;
    }
    ResourcePack.diagnose_document = diagnose_document;
})(ResourcePack || (exports.ResourcePack = ResourcePack = {}));
//# sourceMappingURL=resource-pack.js.map