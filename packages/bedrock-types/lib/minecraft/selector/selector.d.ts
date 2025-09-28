import { OffsetWord } from "../../types";
import { CompactJson } from "../json/compact";
import { CompactJsonReader } from "../json/reader";
import { SelectorType } from './selector-types';
/**
 * The class that represents a selector.
 */
export declare class Selector extends CompactJsonReader<CompactJson.IArray> {
    /**
     * @example '@a' | '@e'
     */
    private _type;
    private _offset;
    constructor(type?: SelectorType, offset?: number, data?: CompactJson.IArray);
    get selectorType(): SelectorType;
    get selectorOffset(): number;
}
/**
 * The namespace for the `Selector` class.
 */
export declare namespace Selector {
    /**
     * Checks if the given type is a valid selector type.
     * @param type
     * @returns
     */
    function isValidType(type: string | Selector): boolean;
    /**
     * Checks if the given text is a valid selector.
     * @param value The text to check.
     * @param wildcard If the wildcard is allowed.
     * @param allowFakePlayer If fake players are allowed.
     * @returns True if the text is a valid selector, false otherwise.
     */
    function isSelector(value: string, wildcard?: boolean, allowFakePlayer?: boolean): boolean;
    /**
     * Parses the given text into a selector.
     * @param text The text to parse.
     * @param offset The offset of the text
     * @returns The parsed selector. or undefined if something went wrong
     */
    function parse(text: string, offset?: number): Selector | undefined;
    function parse(word: OffsetWord): Selector | undefined;
}
