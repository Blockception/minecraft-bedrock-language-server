import { Location } from '../location';
/**An object that carries a location*/
export interface Locatable {
    /**The location of the object in memory*/
    location: Location;
}
/**
 * Namespace containing utility functions for working with Locatable objects.
 */
export declare namespace Locatable {
    /**
     * Type guard to check if a value is a valid Locatable object.
     * @param value The value to check
     * @returns True if the value has a valid location property, false otherwise
     */
    function is(value: any): value is Locatable;
    /**
     * Creates an empty Locatable object with a default empty location.
     * @returns A new Locatable object with an empty URI and position 0
     */
    function empty(): Locatable;
}
//# sourceMappingURL=types.d.ts.map