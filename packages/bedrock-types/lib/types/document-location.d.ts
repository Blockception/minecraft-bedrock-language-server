import { JsonPath } from "./json-path";
import { OffsetWord } from "./offset-word";
import { Position } from "./position";
import { Range } from "./range";
/**The type of a document location */
export type DocumentLocation = Position | OffsetWord | JsonPath | number;
/** */
export type TextOrDoc = string | {
    getText(): string;
};
/**
 *
 */
export declare namespace DocumentLocation {
    function toOffset(data: number): number;
    function toOffset(data: OffsetWord): number;
    function toOffset(data: DocumentLocation, text: TextOrDoc): number;
    /**TODO add documentation
     *
     * @param data
     * @param text
     * @returns
     */
    function toPosition(data: DocumentLocation, text: TextOrDoc): Position;
    function toRange(data: OffsetWord): Range;
    function toRange(data: DocumentLocation, text: TextOrDoc, length: number): Range;
}
