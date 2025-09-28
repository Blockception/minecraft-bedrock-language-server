import { BehaviorPack } from "./BehaviorPack/BehaviorPack";
import { Identifiable } from "./Identifiable";
import { ResourcePack } from "./ResourcePack/ResourcePack";

/**A dataset of minecraft data*/
export interface MinecraftDataSet {
  /**The behavior pack data*/
  readonly BehaviorPack: BehaviorPack;

  /**The resource pack data*/
  readonly ResourcePack: ResourcePack;
}

/**The namespace governing minecraft data sets*/
export namespace MinecraftDataSet {
  /**Checks whenever a given entity is present in either BP or RP
   * @param data The data to spit through
   * @param id The identification to find
   * @returns True or False if the entity is present or not*/
  export function hasEntity(data: MinecraftDataSet, id: string): boolean {
    if (Identifiable.has(data.BehaviorPack.entities, id)) return true;
    if (Identifiable.has(data.ResourcePack.entities, id)) return true;

    return false;
  }
}
