import { DocumentLocation } from "./document-location";
/**An object that describe a location in a document*/
export interface Location {
    /**The uri of the document*/
    uri: string;
    /**The position of the in the document*/
    position: DocumentLocation;
}
/** */
export declare namespace Location {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Location;
    /**TODO add documentation
     *
     * @param uri
     * @param position
     * @returns
     */
    function create(uri: string, position?: DocumentLocation): Location;
    /**TODO add documentation
     *
     * @returns
     */
    function empty(): Location;
}
