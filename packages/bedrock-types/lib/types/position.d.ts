/** */
export interface Position {
    /** */
    line: number;
    /** */
    character: number;
}
/** */
export declare namespace Position {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Position;
    /**TODO add documentation
     *
     * @param line
     * @param character
     * @returns
     */
    function create(line?: number, character?: number): Position;
    /**Converts the position to an offset
     * @param position
     * @param text
     * @returns
     */
    function toOffset(position: Position, text: string | {
        offsetAt(position: Position): number;
    }): number;
    /**
     *
     * @param offset
     * @param text
     * @returns
     */
    function toPosition(offset: number, text: string | {
        positionAt(offset: number): Position;
    }): Position;
}
