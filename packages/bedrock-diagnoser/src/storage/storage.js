"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exporter = exports.Storage = void 0;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const diagnostics_1 = require("../diagnostics");
class Storage {
    cache;
    useEducation;
    constructor(cache, useEducation = false) {
        this.cache = cache;
        this.useEducation = useEducation;
    }
    exporter(cache, vanilla) {
        return new Exporter(cache, vanilla, this.useEducation);
    }
    singleton(id, item) {
        return () => {
            let out = this[id];
            if (out === undefined) {
                out = item();
                this[id] = out;
            }
            return out;
        };
    }
    get behavior_pack() {
        return this.singleton('__bp', () => {
            return {
                animations: this.exporter(this.cache.behaviorPacks.animations),
                animationControllers: this.exporter(this.cache.behaviorPacks.animationControllers),
                blocks: this.exporter(this.cache.behaviorPacks.blocks, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getBlock),
                entities: this.exporter(this.cache.behaviorPacks.entities, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getEntity),
                functions: this.exporter(this.cache.behaviorPacks.functions),
                items: this.exporter(this.cache.behaviorPacks.items, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getItem),
                lootTables: this.exporter(this.cache.behaviorPacks.lootTables, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getLootTable),
                structures: this.exporter(this.cache.behaviorPacks.structures),
                trading: this.exporter(this.cache.behaviorPacks.trading, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getTrading),
            };
        });
    }
    get resource_pack() {
        return this.singleton('__rp', () => {
            return {
                animations: this.exporter(this.cache.resourcePacks.animations, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getAnimation),
                animationControllers: this.exporter(this.cache.resourcePacks.animationControllers, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getAnimationController),
                attachables: this.exporter(this.cache.resourcePacks.attachables),
                blockCullingRules: this.exporter(this.cache.resourcePacks.blockCullingRules),
                entities: this.exporter(this.cache.resourcePacks.entities, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getEntity),
                fogs: this.exporter(this.cache.resourcePacks.fogs, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getFog),
                materials: this.exporter(this.cache.resourcePacks.materials, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getMaterial),
                models: this.exporter(this.cache.resourcePacks.models, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getModel),
                particles: this.exporter(this.cache.resourcePacks.particles, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getParticle),
                renderControllers: this.exporter(this.cache.resourcePacks.renderControllers, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getRenderController),
                sounds: this.exporter(this.cache.resourcePacks.sounds, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getSound),
                textures: this.exporter(this.cache.resourcePacks.textures, bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getTexture),
            };
        });
    }
    static from(diagnoser) {
        return new Storage(diagnoser.context.getProjectData().projectData, (0, diagnostics_1.education_enabled)(diagnoser));
    }
}
exports.Storage = Storage;
class Exporter {
    _cache;
    _useEducation;
    _vanilla;
    constructor(_cache, vanilla, useEducation) {
        function noop() {
            return undefined;
        }
        this._cache = _cache || { get: noop };
        this._vanilla = vanilla || noop;
        this._useEducation = useEducation || false;
    }
    get(id) {
        const item = this._cache.get(id);
        if (item !== undefined)
            return item;
        return this._vanilla(id, this._useEducation);
    }
}
exports.Exporter = Exporter;
//# sourceMappingURL=storage.js.map