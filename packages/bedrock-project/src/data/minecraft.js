"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DS = exports.ResourceData = exports.BehaviorData = exports.MinecraftData = exports.VanillaItem = exports.DefinitionItem = exports.ProjectItem = void 0;
exports.firstReturn = firstReturn;
exports.fromProject = fromProject;
exports.fromVanilla = fromVanilla;
exports.fromDefinition = fromDefinition;
exports.educationEnabled = educationEnabled;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const bc_minecraft_project_1 = require("bc-minecraft-project");
var ProjectItem;
(function (ProjectItem) {
    function is(value) {
        return value.type === 'project';
    }
    ProjectItem.is = is;
    function create(v) {
        return {
            item: v,
            type: 'project',
        };
    }
    ProjectItem.create = create;
})(ProjectItem || (exports.ProjectItem = ProjectItem = {}));
var DefinitionItem;
(function (DefinitionItem) {
    function is(value) {
        return value.type === 'definition';
    }
    DefinitionItem.is = is;
    function create(v, excluded) {
        return {
            item: v,
            type: 'definition',
            excluded: excluded,
        };
    }
    DefinitionItem.create = create;
})(DefinitionItem || (exports.DefinitionItem = DefinitionItem = {}));
var VanillaItem;
(function (VanillaItem) {
    function is(value) {
        return value.type === 'vanilla';
    }
    VanillaItem.is = is;
    function create(v) {
        return {
            item: v,
            type: 'vanilla',
        };
    }
    VanillaItem.create = create;
})(VanillaItem || (exports.VanillaItem = VanillaItem = {}));
class MinecraftData {
    projectData;
    constructor(projectData) {
        this.projectData = projectData;
        this.behaviors = new BehaviorData(projectData.behaviorPacks);
        this.resources = new ResourceData(projectData.resourcePacks);
    }
    behaviors;
    resources;
}
exports.MinecraftData = MinecraftData;
class BehaviorData {
    _behaviorpacks;
    constructor(behaviorpacks) {
        this._behaviorpacks = behaviorpacks;
    }
    animations = firstReturn(fromDefinition('animation'), fromProject(() => this._behaviorpacks.animations));
    animationControllers = firstReturn(fromDefinition('animation_controller'), fromProject(() => this._behaviorpacks.animationControllers));
    biomes = firstReturn(fromDefinition('biome'), fromProject(() => this._behaviorpacks.biomes), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getBiome));
    blocks = firstReturn(fromDefinition('block'), fromProject(() => this._behaviorpacks.blocks), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getBlock));
    // TODO block states
    entities = firstReturn(fromDefinition('entity'), fromProject(() => this._behaviorpacks.entities), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getEntity));
    features = firstReturn(fromDefinition('feature'), fromProject(() => this._behaviorpacks.features), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getFeature));
    featuresRules = firstReturn(fromDefinition('features_rule'), fromProject(() => this._behaviorpacks.featuresRules));
    functions = firstReturn(fromDefinition('function'), fromProject(() => this._behaviorpacks.functions));
    items = firstReturn(fromDefinition('item'), fromProject(() => this._behaviorpacks.items), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getItem));
    itemGroups = firstReturn(fromDefinition('item_group'), fromProject(() => this._behaviorpacks.itemGroups));
    lootTables = firstReturn(fromDefinition('loot_table'), fromProject(() => this._behaviorpacks.lootTables), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getLootTable));
    structures = firstReturn(fromDefinition('structure'), fromProject(() => this._behaviorpacks.structures));
    trading = firstReturn(fromDefinition('trading'), fromProject(() => this._behaviorpacks.trading), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getTrading));
}
exports.BehaviorData = BehaviorData;
class ResourceData {
    _resourcepacks;
    constructor(resourcepacks) {
        this._resourcepacks = resourcepacks;
    }
    animations = firstReturn(fromDefinition('animation'), fromProject(() => this._resourcepacks.animations), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getAnimation));
    animationControllers = firstReturn(fromDefinition('animation_controller'), fromProject(() => this._resourcepacks.animationControllers), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getAnimationController));
    attachables = firstReturn(fromDefinition('attachable'), fromProject(() => this._resourcepacks.attachables));
    blockCullingRules = firstReturn(fromDefinition('block_culling_rule'), fromProject(() => this._resourcepacks.blockCullingRules));
    entities = firstReturn(fromDefinition('entity'), fromProject(() => this._resourcepacks.entities), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getEntity));
    fogs = firstReturn(fromDefinition('fog'), fromProject(() => this._resourcepacks.fogs), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getFog));
    materials = firstReturn(fromDefinition('material'), fromProject(() => this._resourcepacks.materials), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getMaterial));
    models = firstReturn(fromDefinition('model'), fromProject(() => this._resourcepacks.models), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getModel));
    particles = firstReturn(fromDefinition('particle'), fromProject(() => this._resourcepacks.particles), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getParticle));
    renderControllers = firstReturn(fromDefinition('render_controller'), fromProject(() => this._resourcepacks.renderControllers), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getRenderController));
    sounds = firstReturn(fromDefinition('sound'), fromProject(() => this._resourcepacks.sounds), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getSound));
    textures = firstReturn(fromDefinition('texture'), fromProject(() => this._resourcepacks.textures), fromVanilla(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getTexture));
    itemTextures = firstReturn(fromDefinition('item_texture'), fromProject(() => this._resourcepacks.itemTextures));
    terrainTextures = firstReturn(fromDefinition('terrain_texture'), fromProject(() => this._resourcepacks.terrainTextures));
}
exports.ResourceData = ResourceData;
class DS {
    _extractFN;
    constructor(...extractFN) {
        this._extractFN = extractFN;
    }
    has(id, project) {
        return this.get(id, project) !== undefined;
    }
    get(id, project) {
        for (const fn of this._extractFN) {
            const result = fn(id, project);
            if (result) {
                return result;
            }
        }
        return undefined;
    }
}
exports.DS = DS;
function firstReturn(...checks) {
    return new DS(...checks);
}
function fromProject(dataSet) {
    return function (id) {
        // Check vanilla
        const e = dataSet().get(id);
        if (e) {
            return ProjectItem.create(e);
        }
        return undefined;
    };
}
function fromVanilla(callfn) {
    return function (id, project) {
        if (id === undefined)
            return;
        const edu = educationEnabled(project);
        if (id.includes('<')) {
            id = id.split('<')[0];
        }
        // Check vanilla
        let e = callfn(id, edu);
        if (e) {
            return VanillaItem.create(e);
        }
        // No namespace?, then we try vanilla
        if (!id.includes(':'))
            id = 'minecraft:' + id;
        e = callfn(id, edu);
        if (e) {
            return VanillaItem.create(e);
        }
        return undefined;
    };
}
function fromDefinition(containerKey) {
    return function (id, project) {
        const container = project.definitions[containerKey];
        if (bc_minecraft_project_1.Definition.is(container)) {
            //Is defined
            if (container.defined.includes(id))
                return DefinitionItem.create(id, false);
            if (container.excluded.includes(id))
                return DefinitionItem.create(id, true);
        }
        return undefined;
    };
}
function educationEnabled(project) {
    return project.attributes['education.enable'] === 'true';
}
//# sourceMappingURL=minecraft.js.map