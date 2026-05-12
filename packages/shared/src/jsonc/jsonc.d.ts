/**
 * Simple text document interface that can be used with JSON parsing.
 * Compatible with vscode-languageserver-textdocument and other text document
 */
export interface TextDocument {
    /** The document URI */
    readonly uri: string;
    /**
     * Get the text content of the document
     * @param range Optional range to get text from
     */
    getText(range?: any): string;
}
/**
 * Unified namespace for JSONC parsing operations.
 * Provides utilities for parsing JSON with comments (JSONC) format.
 */
export declare namespace Json {
    /**
     * Parse JSONC text and cast to the given type.
     * @param doc The document or string to parse
     * @returns The parsed object or undefined if parsing failed
     */
    function To<T>(doc: TextDocument | string): T | undefined;
    /**
     * Parse JSONC text with optional stripComments option.
     * @param text The text to parse
     * @param options Optional parsing options
     * @returns The parsed object
     */
    function parse(text: string, options?: {
        stripComments?: boolean;
    }): any;
}
//# sourceMappingURL=jsonc.d.ts.map