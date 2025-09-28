import { BehaviorPack } from "./BehaviorPack/BehaviorPack";
import { ResourcePack } from "./ResourcePack/ResourcePack";
/**A dataset of minecraft data*/
export interface MinecraftDataSet {
    /**The behavior pack data*/
    readonly BehaviorPack: BehaviorPack;
    /**The resource pack data*/
    readonly ResourcePack: ResourcePack;
}
/**The namespace governing minecraft data sets*/
export declare namespace MinecraftDataSet {
    /**Checks whenever a given entity is present in either BP or RP
     * @param data The data to spit through
     * @param id The identification to find
     * @returns True or False if the entity is present or not*/
    function hasEntity(data: MinecraftDataSet, id: string): boolean;
}
