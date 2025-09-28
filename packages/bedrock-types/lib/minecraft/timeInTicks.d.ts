/** */
export declare namespace timeInTicks {
    /**The regex pattern that matches a time value */
    const pattern: RegExp;
    /**Checks if the given text value is a valid time value
     * @param text The valued to check
     * @returns True or false if the text represents an time value*/
    function is(text: string): boolean;
    /**Checks if the time is a value specification
     * @param text The valued to check
     * @returns True or false if the time is not a tick spec*/
    function isTick(text: string): boolean;
    /**Checks if the time is a value specification
     * @param text The valued to check
     * @returns True or false if the time is not a second spec*/
    function isSecond(text: string): boolean;
    /**Checks if the time is a value specification
     * @param text The valued to check
     * @returns True or false if the time is not a day spec*/
    function isDay(text: string): boolean;
    /**Parses the given time into a number
     * @param text The text to convert*/
    function parse(text: string): number;
}
