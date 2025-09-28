import { Position } from "./position";
/** */
export interface Range {
    /** */
    start: Position;
    /** */
    end: Position;
}
/** */
export declare namespace Range {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Position;
    /**TODO add documentation
     *
     * @param start
     * @param end
     * @returns
     */
    function create(start: Position, end: Position): Range;
    /**TODO add documentation
     *
     * @param start
     * @param end
     * @returns
     */
    function createR(startLine: number, startOffset: number, endLine: number, endOffset: number): Range;
}
