import { Identifiable } from "../Identifiable";
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
