/** */
export interface OffsetWord {
    /** */
    text: string;
    /** */
    offset: number;
}
/**
 *
 */
export declare namespace OffsetWord {
    /**
     * Creates a new OffsetWord
     * @param text The text to use
     * @param number The offset to use
     * @returns A new OffsetWord
     */
    function create(text: string, offset?: number): OffsetWord;
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is OffsetWord;
}
