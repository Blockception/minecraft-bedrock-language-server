import { Types } from "bc-minecraft-bedrock-types";
/** */
export interface TextDocument {
    /** */
    readonly uri: string;
    /**
     *
     * @param range
     */
    getText(range?: Types.Range): string;
}
export declare namespace TextDocument {
    /**
     * Reads the text document and returns the json object, but only if its matches the checkIs fn
     * @param doc The document to read
     * @param checkIs The function to check if the json object is of the correct type
     * @returns The json object or undefined
     */
    function toObject<T>(doc: TextDocument, checkIs?: (value: any) => value is T): T | undefined;
}
export declare namespace TestTextDocument {
    function create(uri: string, content: string): TextDocument;
}
