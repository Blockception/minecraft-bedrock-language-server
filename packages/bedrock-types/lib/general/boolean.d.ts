/** The boolean data type, but related to minecraft */
export declare namespace Boolean {
    /**Checks if the given text value is a valid boolean
     * @param value The valued to compare to
     * @returns True or false if the text represents a boolean*/
    function is(value: string | boolean): boolean;
    /**Parses the text value to a boolean value
     * @param value The text value comparing
     * @returns True or false if the text represents a boolean*/
    function parse(value: string | boolean): boolean;
}
