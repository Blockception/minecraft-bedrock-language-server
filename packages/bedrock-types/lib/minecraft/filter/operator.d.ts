/** The operator type */
export type OperatorType = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/** The operator type */
export declare namespace OperatorType {
    /**
     * Parses the given text into a operator type
     * @param text The text to parse
     * @returns The parsed operator type
     * @throws When the text is not a valid operator type
     */
    function parse(text: string): OperatorType;
}
