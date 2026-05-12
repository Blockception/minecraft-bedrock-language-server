import { Range } from 'bc-minecraft-bedrock-shared';
/** */
export interface TextDocument {
    /** */
    readonly uri: string;
    /**
     *
     * @param range
     */
    getText(range?: Range): string;
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
//# sourceMappingURL=text-document.d.ts.map