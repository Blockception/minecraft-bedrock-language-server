import { Identifiable } from 'bc-minecraft-bedrock-shared';
/**
 *
 */
export interface Item extends Identifiable {
    /**
     *
     */
    max_damage: number;
}
/**
 *
 */
export declare namespace Item {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Item;
}
//# sourceMappingURL=item.d.ts.map