import { JsonPath } from '../json-path';
import { OffsetWord } from '../offset-word';
import { Position } from '../position';
import { Range } from '../range';
/**The type of a document location */
export type DocumentLocation = Position | OffsetWord | JsonPath | number;
/** A string or document object that can provide text */
export type TextOrDoc = string | {
    getText(): string;
};
/**
 * Document location utilities
 */
export declare namespace DocumentLocation {
    /**
     * Converts a DocumentLocation to an offset number.
     * @param data The document location to convert (number, string path, Position, or OffsetWord)
     */
    function toOffset(data: number): number;
    /**
     * Converts a DocumentLocation to an offset number.
     * @param data The document location to convert (number, string path, Position, or OffsetWord)
     */
    function toOffset(data: OffsetWord): number;
    /**
     * Converts a DocumentLocation to an offset number.
     * @param loc The document location to convert (number, string path, Position, or OffsetWord)
     * @param text The text content or document object needed for conversion
     * @returns The offset number representing the location
     */
    function toOffset(data: DocumentLocation, text: TextOrDoc): number;
    /**
     * Converts a DocumentLocation to a Position object.
     * Handles conversion from numbers, JSON paths, and Position/OffsetWord objects.
     * @param data The document location to convert (number, string path, Position, or OffsetWord)
     * @param text The text content or document object needed for conversion
     * @returns A Position object representing the location
     */
    function toPosition(data: DocumentLocation, text: TextOrDoc): Position;
    /**
     * Converts a DocumentLocation to a Range object.
     * @param data The document location to convert (OffsetWord)
     */
    function toRange(data: OffsetWord): Range;
    /**
     * Converts a DocumentLocation to a Range object.
     * @param data The document location to convert (number, string path, Position)
     * @param text The text content or document object needed for conversion
     * @param length The length of the range
     * @returns A Range object representing the location
     */
    function toRange(data: DocumentLocation, text: TextOrDoc, length: number): Range;
}
//# sourceMappingURL=types.d.ts.map