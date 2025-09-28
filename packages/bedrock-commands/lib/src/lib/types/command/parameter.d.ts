/**A parameter in a command, represent a single 'word' */
export declare class Parameter {
    /**The offset of the word in the document*/
    offset: number;
    /**The text of the parameter*/
    text: string;
    /**Creates a new instance of the parameter
     * @param text The text to assign
     * @param offset The offset to assign*/
    constructor(text?: string, offset?: number);
}
/**The namespace surrounding the parameter object*/
export declare namespace Parameter {
    /**Checks if the given instance implements the Parameter object
     * @param value The value to evaluate
     * @returns true or false if the object implements the Parameter object or not*/
    function is(value: any): value is Parameter;
}
