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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCommands = exports.TemplateItem = void 0;
exports.getTemplateCommand = getTemplateCommand;
exports.setupTemplates = setupTemplates;
const ide_shared_1 = require("@blockception/ide-shared");
const processor_1 = require("../../../templates/processor");
const folders_1 = require("../../templates/folders");
const BPT = __importStar(require("../../templates/definitions/behavior-pack"));
const RPT = __importStar(require("../../templates/definitions/resource-pack"));
const WPT = __importStar(require("../../templates/definitions/world"));
const path_1 = __importDefault(require("path"));
const BPC = ide_shared_1.Commands.Create.Behaviorpack;
const RPC = ide_shared_1.Commands.Create.Resourcepack;
class TemplateItem {
    _commandId;
    _content;
    _filename;
    constructor(commandId, content, ...paths) {
        this._commandId = commandId;
        this._content = content;
        this._filename = paths.length === 1 ? paths[0] : path_1.default.join(...paths);
    }
    commandId() {
        return this._commandId;
    }
    templateId() {
        return this._commandId.replace(ide_shared_1.Commands.Create.Base, '');
    }
    filename() {
        return this._filename;
    }
    content() {
        return this._content;
    }
    /**
     *
     * @param context
     * @param folder
     * @param attributes
     * @returns
     */
    async execute(context, folder, attributes = {}) {
        folder = folder || (0, folders_1.getFolders)(context).GetFolder(this.commandId());
        const id = (context.arguments ? context.arguments[0] : undefined) || 'UNKNOWN';
        attributes = {
            id,
            templateId: this.templateId(),
            ...attributes,
        };
        const processor = processor_1.TemplateProcessor.create(context, this.templateId(), folder, attributes, this);
        processor.process();
        if (context.token.isCancellationRequested) {
            return false;
        }
        await processor.createFile();
        return true;
    }
}
exports.TemplateItem = TemplateItem;
exports.TemplateCommands = [
    new TemplateItem(BPC.Animation_Controller, BPT.animation_controller, 'animation_controllers', '${{id.safe}}.controller.json'),
    //BPS
    new TemplateItem(BPC.Animation, BPT.animation, 'animations', '${{id.safe}}.animation.json'),
    new TemplateItem(BPC.Block, BPT.block, 'blocks', '${{id.safe}}.block.json'),
    new TemplateItem(BPC.Entity, BPT.entity, 'entities', '${{id.safe}}.entity.bp.json'),
    new TemplateItem(BPC.Dialogue, BPT.dialogue, 'dialogue', '${{id.safe}}.dialogue.json'),
    new TemplateItem(BPC.Item, BPT.item, 'items', '${{id.safe}}.item.json'),
    new TemplateItem(BPC.Loot_Table, BPT.loot_table, 'loot_tables', '${{id.safe}}.loot.json'),
    new TemplateItem(BPC.Manifests, BPT.manifest, 'manifest.json'),
    new TemplateItem(BPC.Recipe, BPT.recipe, 'recipes', '${{id.safe}}.recipe.json'),
    new TemplateItem(BPC.Spawn_Rule, BPT.spawn_rule, 'spawn_rules', '${{id.safe}}.spawn.json'),
    new TemplateItem(BPC.Trading, BPT.trading, 'trading', '${{id.safe}}.trades.json'),
    new TemplateItem(BPC.Volume, BPT.volume, 'volumes', '${{id.safe}}.volume.json'),
    new TemplateItem(BPC.Item_Catalog, BPT.item_catalog, 'item_catalog', '${{id.safe}}.item_catalog.json'),
    new TemplateItem(BPC.Feature, BPT.feature, 'features', '${{id.safe}}.feature.json'),
    new TemplateItem(BPC.Feature_Rule, BPT.feature_rule, 'feature_rules', '${{id.safe}}.feature_rule.json'),
    //RPS
    new TemplateItem(RPC.Animation_Controller, RPT.animation_controller, 'animation_controllers', '${{id.safe}}.controller.json'),
    new TemplateItem(RPC.Animation, RPT.animation, 'animations', '${{id.safe}}.animation.json'),
    new TemplateItem(RPC.Attachable, RPT.attachable, 'attachables', '${{id.safe}}.attachable.json'),
    new TemplateItem(RPC.Biomes_Client, RPT.biomes_client, 'biomes_client.json'),
    new TemplateItem(RPC.Blocks, RPT.blocks, 'blocks.json'),
    new TemplateItem(RPC.BlockCulling, RPT.block_culling, 'block_culling', '${{id.safe}}.rule.json'),
    new TemplateItem(RPC.Entity, RPT.entity, 'entity', '${{id.safe}}.entity.rp.json'),
    new TemplateItem(RPC.Fog, RPT.fog, 'fogs', '${{id.safe}}.fog.json'),
    new TemplateItem(RPC.Flipbook_Textures, RPT.flipbook_textures, 'textures', 'flipbook_textures.json'),
    new TemplateItem(RPC.Item_Texture, RPT.item_texture, 'textures', 'item_texture.json'),
    new TemplateItem(RPC.Manifests, RPT.manifest, 'manifest.json'),
    new TemplateItem(RPC.Model, RPT.model, 'models', 'entity', '${{id.safe}}.geo.json'),
    new TemplateItem(RPC.Music_Definitions, RPT.music_definitions, 'sounds', 'music_definitions.json'),
    new TemplateItem(RPC.Particle, RPT.particle, 'particles', '${{id.safe}}.particle.json'),
    new TemplateItem(RPC.Render_Controller, RPT.render_controller, 'render_controllers', '${{id.safe}}.render.json'),
    new TemplateItem(RPC.Sounds, RPT.sounds, 'sounds.json'),
    new TemplateItem(RPC.Sound_Definitions, RPT.sound_definitions, 'sounds', 'sound_definitions.json'),
    new TemplateItem(RPC.Terrain_Texture, RPT.terrain_texture, 'textures', 'terrain_texture.json'),
    //Other
    new TemplateItem(ide_shared_1.Commands.Create.World.Manifests, WPT.manifest, 'manifest.json'),
];
function getTemplateCommand(command) {
    for (const v of exports.TemplateCommands) {
        if (v.commandId() === command) {
            return v;
        }
    }
    return undefined;
}
function setupTemplates(manager) {
    exports.TemplateCommands.filter((v) => v !== undefined)
        .filter((value) => value instanceof TemplateItem)
        .forEach((template) => manager.add(template.commandId(), template));
}
//# sourceMappingURL=templates.js.map