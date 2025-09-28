/** The namespace for the float type */
export declare namespace Float {
    /**The regex pattern that matches a float */
    const pattern: RegExp;
    /**Checks if the given text value is a valid float
     * @param value The valued to compare to
     * @returns True or false if the text represents a float*/
    function is(text: string): boolean;
}
