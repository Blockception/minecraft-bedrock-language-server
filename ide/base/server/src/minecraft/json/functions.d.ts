/**
 * A range of text using offsets
 */
export interface TextRange {
    /** The start offset in the text */
    start: number;
    /** The end offset in the text */
    end: number;
}
/**
 * Returns the current element value
 * @param text The json text to retrieve the range from
 * @param cursor The cursor offset
 * @returns
 */
export declare function getCurrentElement(text: string, cursor: number): TextRange | undefined;
/**
 *
 * @param text
 * @param cursor
 * @returns
 */
export declare function getCurrentString(text: string, cursor: number): TextRange | undefined;
/**
 *
 * @param text
 * @param property
 * @param cursor
 * @returns undefined if nothing of a value has been found
 */
export declare function getCurrentStringValue(text: string, property: string, cursor: number): TextRange | undefined;
export declare function getEndOfPropertyKey(text: string, property: string, start: number): number;
/**
 *
 * @param Text
 * @param cursor
 * @returns
 */
export declare function getStartString(Text: string, cursor: number): number;
/**
 *
 * @param Text
 * @param startIndex
 * @returns
 */
export declare function isProperty(Text: string, startIndex: number): boolean;
//# sourceMappingURL=functions.d.ts.map