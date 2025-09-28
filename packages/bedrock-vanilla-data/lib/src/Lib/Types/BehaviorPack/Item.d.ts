import { Identifiable } from "../Identifiable";
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
