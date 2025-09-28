import { Pack } from "../types";
import { BehaviorPack } from "./behavior-pack";
import { PackType } from "./pack-type";
import { ResourcePack } from "./resource-pack";
import { WorldPack } from "./world";
/**
 *
 */
export declare namespace Util {
    /**
     *
     * @param pack
     * @returns
     */
    function GetPackType(pack: Pack): PackType;
    /**
     *
     * @param pack
     * @returns
     */
    function IsResourcePack(pack: Pack): pack is ResourcePack;
    /**
     *
     * @param pack
     * @returns
     */
    function IsBehaviorPack(pack: Pack): pack is BehaviorPack;
    /**
     *
     * @param pack
     * @returns
     */
    function IsWorldPack(pack: Pack): pack is WorldPack;
}
