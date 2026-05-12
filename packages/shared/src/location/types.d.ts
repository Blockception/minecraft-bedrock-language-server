import { DocumentLocation } from '../document-location/types';
/**An object that describe a location in a document*/
export interface Location {
    /**The uri of the document*/
    uri: string;
    /**The position of the in the document*/
    position: DocumentLocation;
}
/**
 * Namespace containing utility functions for working with Location objects.
 */
export declare namespace Location {
    /**
     * Type guard to check if a value is a valid Location object.
     * @param value The value to check
     * @returns True if the value has uri (string) and position properties, false otherwise
     */
    function is(value: any): value is Location;
    /**
     * Creates a new Location object with the specified URI and position.
     * @param uri The document URI
     * @param position The position within the document (defaults to 0)
     * @returns A new Location object
     */
    function create(uri: string, position?: DocumentLocation): Location;
    /**
     * Creates an empty Location object with an empty URI.
     * @returns A new Location object with an empty URI and position 0
     */
    function empty(): Location;
}
//# sourceMappingURL=types.d.ts.map