import { Parameter } from "./parameter";
/**The interface of a basic word builder*/
export declare class ParameterBuilder {
    /**The offset the given text will start at*/
    private offset;
    /**The parameters produced by the builder*/
    items: Parameter[];
    /**Creates a new instance of the ParameterBuilder
     * @param offset The offset the text will start at*/
    constructor(offset?: number);
    /**Add the given text as a word to the internal list, starting at the given offset
     * @param text The word text
     * @param offset The offset where the word was found*/
    Add(text: string, offset: number): void;
}
/**A function that shits through the text looking for parameters. Sends found parameters to the builder
 * @param text The text to parse
 * @param Builder The builder to report to*/
export declare function GetParameters(text: string, Builder: ParameterBuilder): void;
