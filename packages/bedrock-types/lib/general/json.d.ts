/**
 * The namespace for the json values as strings
 */
export declare namespace Json {
    /**Checks if the given text value is a valid json object
     * @param value The valued to compare to
     * @returns True or false if the text represents an json obect*/
    function isObject(value: string): boolean;
    /**Checks if the given text value is a valid jsob array
     * @param value The valued to compare to
     * @returns True or false if the text represents an json array*/
    function isArray(value: string): boolean;
}
