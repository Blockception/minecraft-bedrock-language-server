/** */
export declare namespace XP {
    /**The regex pattern that matches a XP value */
    const pattern: RegExp;
    /**Checks if the given text value is a valid xp value
     * @param text The valued to check
     * @returns True or false if the text represents an xp value*/
    function is(text: string): boolean;
    /**Checks if the XP is a value specification
     * @param text The valued to check
     * @returns True or false if the xp is not a level spec*/
    function isLevel(text: string): boolean;
    /**Parses the given xp into a number
     * @param text The text to convert*/
    function parse(text: string): number;
}
