import { Identifiable } from "../Identifiable";
/**
 *
 */
export interface Entity extends Identifiable {
    /**
     *
     */
    events: string[];
    /**
     *
     */
    families: string[];
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
