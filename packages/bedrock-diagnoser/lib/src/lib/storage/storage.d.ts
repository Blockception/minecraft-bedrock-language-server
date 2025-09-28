import { DataSetConnector, Pack, ProjectData } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Identifiable } from "bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types";
import { DiagnosticsBuilder } from "../types";
export type ItemBase = Identifiable & Types.Locatable;
export type PackType = keyof Pick<typeof MinecraftData, "BehaviorPack" | "ResourcePack">;
export type VanillaTypes = {
    BehaviorPack: keyof typeof MinecraftData.BehaviorPack;
    ResourcePack: keyof typeof MinecraftData.ResourcePack;
};
export declare class Storage {
    cache: ProjectData;
    useEducation: boolean;
    constructor(cache: ProjectData, useEducation?: boolean);
    private exporter;
    private singleton;
    get behavior_pack(): () => {
        animations: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack/animation").Animation, unknown, import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack").BehaviorPack>;
        animation_controllers: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack/animation-controller").AnimationController, unknown, import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack").BehaviorPack>;
        blocks: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack/block").Block, import("bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/BehaviorPack").Block | undefined, import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack").BehaviorPack>;
        entities: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack/entity").Entity, import("bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/BehaviorPack").Entity | undefined, import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack").BehaviorPack>;
        functions: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack/mcfunction").Function, unknown, import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack").BehaviorPack>;
        items: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack/item").Item, import("bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/BehaviorPack").Item | undefined, import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack").BehaviorPack>;
        loot_tables: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack/loot-table").LootTable, string | undefined, import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack").BehaviorPack>;
        structures: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack/structure").Structure, unknown, import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack").BehaviorPack>;
        trading: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack/trading").Trading, string | undefined, import("bc-minecraft-bedrock-project/lib/src/project/behavior-pack").BehaviorPack>;
    };
    get resource_pack(): () => {
        animations: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/animation").Animation, import("bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/ResourcePack").Animation | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        animation_controllers: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/animation-controller").AnimationController, import("bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/ResourcePack").AnimationController | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        attachables: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/attachable").Attachable, unknown, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        block_culling_rules: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/block-culling").BlockCulling, unknown, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        entities: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/entity").Entity, import("bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/ResourcePack").Entity | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        fogs: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/fog").Fog, string | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        materials: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/material").Material, string | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        models: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/model").Model, import("bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/ResourcePack").Model | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        particles: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/particle").Particle, string | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        render_controllers: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/render-controller").RenderController, string | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        sounds: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/sound").Sound, string | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
        textures: Exporter<import("bc-minecraft-bedrock-project/lib/src/project/resource-pack/texture").Texture, string | undefined, import("bc-minecraft-bedrock-project/lib/src/project/resource-pack").ResourcePack>;
    };
    static from(diagnoser: DiagnosticsBuilder): Storage;
}
export declare class Exporter<T extends ItemBase, V, U extends Pack> {
    private _cache;
    private _useEducation;
    private _vanilla;
    constructor(_cache?: DataSetConnector<T, U>, vanilla?: (id: string, edu: boolean) => V, useEducation?: boolean);
    get(id: string): T | V | undefined;
}
