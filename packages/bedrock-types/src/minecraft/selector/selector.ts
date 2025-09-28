import { String } from "../../general";
import { Modes } from "../../modes/modes";
import { OffsetWord } from "../../types";
import { CompactJson } from "../json/compact";
import { CompactJsonReader } from "../json/reader";
import { SelectorType } from './selector-types';

/**
 * The class that represents a selector.
 */
export class Selector extends CompactJsonReader<CompactJson.IArray> {
  /**
   * @example '@a' | '@e'
   */
  private _type: SelectorType;
  private _offset: number;

  constructor(type?: SelectorType, offset?: number, data?: CompactJson.IArray) {
    data = data || { negative: false, offset: offset || 0, type: CompactJson.Type.Array, value: [] };

    super(data);
    this._type = type || "@a";
    this._offset = data.offset;
  }

  get selectorType() {
    return this._type;
  }

  get selectorOffset() {
    return this._offset;
  }
}

/**
 * The namespace for the `Selector` class.
 */
export namespace Selector {
  /**
   * Checks if the given type is a valid selector type.
   * @param type
   * @returns
   */
  export function isValidType(type: string | Selector): boolean {
    if (typeof type !== "string") {
      type = type.selectorType;
    }

    return Modes.SelectorType.isValue(type);
  }

  /**
   * Checks if the given text is a valid selector.
   * @param value The text to check.
   * @param wildcard If the wildcard is allowed.
   * @param allowFakePlayer If fake players are allowed.
   * @returns True if the text is a valid selector, false otherwise.
   */
  export function isSelector(value: string, wildcard?: boolean, allowFakePlayer?: boolean): boolean {
    if (wildcard === true) {
      if (value === "*") return true;
    }

    if (!value.startsWith("@")) {
      if (allowFakePlayer === true) {
        if (String.is(value)) return true;
      }

      return false;
    }

    const index = value.indexOf("[");
    const type = index === -1 ? value : value.slice(0, index);

    if (index > -1) {
      if (!value.endsWith("]")) {
        return false;
      }
    }

    return isValidType(type);
  }

  /**
   * Parses the given text into a selector.
   * @param text The text to parse.
   * @param offset The offset of the text
   * @returns The parsed selector. or undefined if something went wrong
   */
  export function parse(text: string, offset?: number): Selector | undefined;
  export function parse(word: OffsetWord): Selector | undefined;

  export function parse(text: string | OffsetWord, offset?: number): Selector | undefined {
    if (typeof text !== "string") {
      offset = text.offset;
      text = text.text;
    }
    offset = offset || 0;

    const index = text.indexOf("[");

    if (index === -1) {
      return new Selector(text as SelectorType);
    }

    const type = text.slice(0, index) as SelectorType;
    const data = CompactJson.parse(text.slice(index), offset + index);

    if (CompactJson.isArray(data)) {
      return new Selector(type, offset, data);
    }

    return undefined;
  }
}
