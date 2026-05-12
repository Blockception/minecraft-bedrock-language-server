import { MCProject } from 'bc-minecraft-project';
import { ProjectData } from '../project';
import { ResourcePackCollection } from '../project/resource-pack';
import { BehaviorPackCollection } from '../project/behavior-pack';
export interface ProjectItem<T> {
    item: T;
    type: 'project';
}
export declare namespace ProjectItem {
    function is<T>(value: any | ProjectItem<T>): value is ProjectItem<T>;
    function create<T>(v: T): ProjectItem<T>;
}
export interface DefinitionItem<T> {
    item: T;
    type: 'definition';
    excluded: boolean;
}
export declare namespace DefinitionItem {
    function is<T>(value: any | DefinitionItem<T>): value is DefinitionItem<T>;
    function create<T>(v: T, excluded: boolean): DefinitionItem<T>;
}
export interface VanillaItem<T> {
    item: T;
    type: 'vanilla';
}
export declare namespace VanillaItem {
    function is<T>(value: any | VanillaItem<T>): value is VanillaItem<T>;
    function create<T>(v: T): VanillaItem<T>;
}
export declare class MinecraftData {
    projectData: ProjectData;
    constructor(projectData: ProjectData);
    behaviors: BehaviorData;
    resources: ResourceData;
}
export declare class BehaviorData {
    private _behaviorpacks;
    constructor(behaviorpacks: BehaviorPackCollection);
    animations: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/animation").Animation>, never>;
    animationControllers: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/animation-controller").AnimationController>, never>;
    biomes: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/biome").Biome>, VanillaItem<unknown>>;
    blocks: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/block").Block>, VanillaItem<unknown>>;
    entities: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/entity").Entity>, VanillaItem<unknown>>;
    features: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/feature").Feature>, VanillaItem<unknown>>;
    featuresRules: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/feature_rule").FeatureRule>, never>;
    functions: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/mcfunction").Function>, never>;
    items: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/item").Item>, VanillaItem<unknown>>;
    itemGroups: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/item_catalog").Group>, never>;
    lootTables: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/loot-table").LootTable>, VanillaItem<unknown>>;
    structures: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/structure").Structure>, never>;
    trading: DS<DefinitionItem<string>, ProjectItem<import("../project/behavior-pack/trading").Trading>, VanillaItem<unknown>>;
}
export declare class ResourceData {
    private _resourcepacks;
    constructor(resourcepacks: ResourcePackCollection);
    animations: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/animation").Animation>, VanillaItem<unknown>>;
    animationControllers: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/animation-controller").AnimationController>, VanillaItem<unknown>>;
    attachables: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/attachable").Attachable>, never>;
    blockCullingRules: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/block-culling").BlockCulling>, never>;
    entities: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/entity").Entity>, VanillaItem<unknown>>;
    fogs: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/fog").Fog>, VanillaItem<unknown>>;
    materials: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/material").Material>, VanillaItem<unknown>>;
    models: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/model").Model>, VanillaItem<unknown>>;
    particles: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/particle").Particle>, VanillaItem<unknown>>;
    renderControllers: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/render-controller").RenderController>, VanillaItem<unknown>>;
    sounds: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/sound").Sound>, VanillaItem<unknown>>;
    textures: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/texture").Texture>, VanillaItem<unknown>>;
    itemTextures: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/texture").Texture>, never>;
    terrainTextures: DS<DefinitionItem<string>, ProjectItem<import("../project/resource-pack/texture").Texture>, never>;
}
export declare class DS<A, B, C> {
    private _extractFN;
    constructor(...extractFN: Array<checkfn<A> | checkfn<B> | checkfn<C>>);
    has(id: string, project: MCProject): boolean;
    get(id: string, project: MCProject): A | B | C | undefined;
}
type checkfn<T> = (id: string, project: MCProject) => T | undefined;
export declare function firstReturn<A, B>(first: checkfn<A>, second: checkfn<B>): DS<A, B, never>;
export declare function firstReturn<A, B, C>(first: checkfn<A>, second: checkfn<B>, thrid: checkfn<C>): DS<A, B, C>;
export declare function fromProject<T>(dataSet: () => {
    get(id: string): T | undefined;
}): checkfn<ProjectItem<T>>;
export declare function fromVanilla<T>(callfn: (id: string, edu: boolean) => T | undefined): checkfn<VanillaItem<T>>;
export declare function fromDefinition(containerKey: string): checkfn<DefinitionItem<string>>;
export declare function educationEnabled(project: MCProject): boolean;
export {};
//# sourceMappingURL=minecraft.d.ts.map