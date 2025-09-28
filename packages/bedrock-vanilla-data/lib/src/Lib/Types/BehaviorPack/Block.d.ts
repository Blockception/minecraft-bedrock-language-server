import { Identifiable } from "../Identifiable";
/**The block interface*/
export interface Block extends Identifiable {
    /**The state of that this block has*/
    properties: string[];
}
/**The namespace that provides functions for blocks*/
export declare namespace Block {
    /**Checks if the given object implements the block interface
     * @param value The object to check
     * @returns true or false if the object implements Block
     */
    function is(value: any): value is Block;
}
