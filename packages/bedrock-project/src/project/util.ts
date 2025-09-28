import { Pack } from "../types";
import { BehaviorPack } from "./behavior-pack";
import { PackType } from "./pack-type";
import { ResourcePack } from "./resource-pack";
import { WorldPack } from "./world";

/**
 *
 */
export namespace Util {
  /**
   *
   * @param pack
   * @returns
   */
  export function GetPackType(pack: Pack): PackType {
    return pack.type;
  }

  /**
   *
   * @param pack
   * @returns
   */
  export function IsResourcePack(pack: Pack): pack is ResourcePack {
    return pack.type === PackType.resource_pack;
  }

  /**
   *
   * @param pack
   * @returns
   */
  export function IsBehaviorPack(pack: Pack): pack is BehaviorPack {
    return pack.type === PackType.behavior_pack;
  }

  /**
   *
   * @param pack
   * @returns
   */
  export function IsWorldPack(pack: Pack): pack is WorldPack {
    return pack.type === PackType.world;
  }
}
