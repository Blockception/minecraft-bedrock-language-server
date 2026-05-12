import { Location } from 'bc-minecraft-bedrock-shared';
import { BaseObject } from 'bc-minecraft-bedrock-types';
/**
 *
 */
export interface GeneralInfo extends BaseObject {
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
    function create(id: string, location: Location, documentation?: string | undefined): GeneralInfo;
}
//# sourceMappingURL=general-info.d.ts.map