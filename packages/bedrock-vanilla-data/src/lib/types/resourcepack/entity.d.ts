import { Identifiable } from 'bc-minecraft-bedrock-shared';
/**
 *
 */
export interface Entity extends Identifiable {
    /**
     *
     */
    animations: string[];
}
/**
 *
 */
export declare namespace Entity {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Entity;
}
//# sourceMappingURL=entity.d.ts.map