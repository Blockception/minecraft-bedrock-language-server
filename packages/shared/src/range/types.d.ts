import { Position } from '../position/types';
/**
 * Represents a range in a text document as a start and end position.
 * Both start and end positions are inclusive.
 */
export interface Range {
    /**The start position of the range*/
    start: Position;
    /**The end position of the range*/
    end: Position;
}
/**
 * Namespace containing utility functions for working with Range objects.
 */
export declare namespace Range {
    /**
     * Type guard to check if a value is a valid Range object.
     * @param value The value to check
     * @returns True if the value has valid start and end Position objects, false otherwise
     */
    function is(value: any): value is Range;
    /**
     * Creates a new Range object from start and end Position objects.
     * @param start The starting position of the range
     * @param end The ending position of the range
     * @returns A new Range object
     */
    function create(start: Position, end: Position): Range;
    /**
     * Creates a new Range object from raw line and character offset values.
     * @param startLine The line number of the start position
     * @param startOffset The character offset of the start position
     * @param endLine The line number of the end position
     * @param endOffset The character offset of the end position
     * @returns A new Range object
     */
    function createR(startLine: number, startOffset: number, endLine: number, endOffset: number): Range;
}
//# sourceMappingURL=types.d.ts.map