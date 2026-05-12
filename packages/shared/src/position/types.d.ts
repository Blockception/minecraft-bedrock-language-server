/**
 * Represents a position in a text document as a line and character offset.
 * Line and character offsets are zero-based.
 */
export interface Position {
    /**The zero-based line number*/
    line: number;
    /**The zero-based character offset within the line*/
    character: number;
}
/**
 * Namespace containing utility functions for working with Position objects.
 */
export declare namespace Position {
    /**
     * Type guard to check if a value is a valid Position object.
     * @param value The value to check
     * @returns True if the value has line and character number properties, false otherwise
     */
    function is(value: any): value is Position;
    /**
     * Creates a new Position object with the specified line and character offset.
     * @param line The line number (defaults to 0)
     * @param character The character offset within the line (defaults to 0)
     * @returns A new Position object
     */
    function create(line?: number, character?: number): Position;
    /**
     * Converts a Position to a character offset in the text.
     * @param position The position to convert
     * @param text The text content or an object with offsetAt method
     * @returns The zero-based character offset in the text
     */
    function toOffset(position: Position, text: string | {
        offsetAt(position: Position): number;
    }): number;
    /**
     * Converts a character offset to a Position in the text.
     * @param offset The zero-based character offset
     * @param text The text content or an object with positionAt method
     * @returns A Position object representing the location
     */
    function toPosition(offset: number, text: string | {
        positionAt(offset: number): Position;
    }): Position;
}
//# sourceMappingURL=types.d.ts.map