/** The namespace for the integer type*/
export declare namespace Integer {
    /**The regex pattern that matches a integer */
    const pattern: RegExp;
    /**Checks if the given text value is a valid integer
     * @param value The valued to compare to
     * @returns True or false if the text represents a integer*/
    function is(text: string): boolean;
}
