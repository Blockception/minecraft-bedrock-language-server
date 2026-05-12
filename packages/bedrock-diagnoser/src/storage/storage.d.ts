import { Identifiable, Locatable } from 'bc-minecraft-bedrock-shared';
import { DataSetConnector, Pack, ProjectData } from 'bc-minecraft-bedrock-project';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { DiagnosticsBuilder } from '../types';
export type ItemBase = Identifiable & Locatable;
export type PackType = keyof Pick<typeof MinecraftData, 'BehaviorPack' | 'ResourcePack'>;
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
        animations: Exporter<any, unknown, Pack>;
        animationControllers: Exporter<any, unknown, Pack>;
        blocks: Exporter<any, unknown, Pack>;
        entities: Exporter<any, unknown, Pack>;
        functions: Exporter<any, unknown, Pack>;
        items: Exporter<any, unknown, Pack>;
        lootTables: Exporter<any, unknown, Pack>;
        structures: Exporter<any, unknown, Pack>;
        trading: Exporter<any, unknown, Pack>;
    };
    get resource_pack(): () => {
        animations: Exporter<any, unknown, Pack>;
        animationControllers: Exporter<any, unknown, Pack>;
        attachables: Exporter<any, unknown, Pack>;
        blockCullingRules: Exporter<any, unknown, Pack>;
        entities: Exporter<any, unknown, Pack>;
        fogs: Exporter<any, unknown, Pack>;
        materials: Exporter<any, unknown, Pack>;
        models: Exporter<any, unknown, Pack>;
        particles: Exporter<any, unknown, Pack>;
        renderControllers: Exporter<any, unknown, Pack>;
        sounds: Exporter<any, unknown, Pack>;
        textures: Exporter<any, unknown, Pack>;
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
//# sourceMappingURL=storage.d.ts.map