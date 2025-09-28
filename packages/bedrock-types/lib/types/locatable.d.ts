import { Location } from "./location";
/**An object that carries a location*/
export interface Locatable {
    /**The location of the object in memory*/
    location: Location;
}
/** */
export declare namespace Locatable {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Locatable;
    /**TODO add documentation
     *
     * @returns
     */
    function empty(): Locatable;
}
