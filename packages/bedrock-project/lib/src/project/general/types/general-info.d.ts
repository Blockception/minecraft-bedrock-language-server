import { Types } from "bc-minecraft-bedrock-types";
/**
 *
 */
export interface GeneralInfo extends Types.BaseObject {
}
/**
 *
 */
export declare namespace GeneralInfo {
    /**
     *
     * @param id
     * @param location
     * @param documentation
     * @returns
     */
    function create(id: string, location: Types.Location, documentation?: string | undefined): GeneralInfo;
}
