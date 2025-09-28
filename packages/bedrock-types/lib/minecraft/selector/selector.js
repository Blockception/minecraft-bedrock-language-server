"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
const general_1 = require("../../general");
const modes_1 = require("../../modes/modes");
const compact_1 = require("../json/compact");
const reader_1 = require("../json/reader");
/**
 * The class that represents a selector.
 */
class Selector extends reader_1.CompactJsonReader {
    constructor(type, offset, data) {
        data = data || { negative: false, offset: offset || 0, type: compact_1.CompactJson.Type.Array, value: [] };
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
exports.Selector = Selector;
/**
 * The namespace for the `Selector` class.
 */
(function (Selector) {
    /**
     * Checks if the given type is a valid selector type.
     * @param type
     * @returns
     */
    function isValidType(type) {
        if (typeof type !== "string") {
            type = type.selectorType;
        }
        return modes_1.Modes.SelectorType.isValue(type);
    }
    Selector.isValidType = isValidType;
    /**
     * Checks if the given text is a valid selector.
     * @param value The text to check.
     * @param wildcard If the wildcard is allowed.
     * @param allowFakePlayer If fake players are allowed.
     * @returns True if the text is a valid selector, false otherwise.
     */
    function isSelector(value, wildcard, allowFakePlayer) {
        if (wildcard === true) {
            if (value === "*")
                return true;
        }
        if (!value.startsWith("@")) {
            if (allowFakePlayer === true) {
                if (general_1.String.is(value))
                    return true;
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
    Selector.isSelector = isSelector;
    function parse(text, offset) {
        if (typeof text !== "string") {
            offset = text.offset;
            text = text.text;
        }
        offset = offset || 0;
        const index = text.indexOf("[");
        if (index === -1) {
            return new Selector(text);
        }
        const type = text.slice(0, index);
        const data = compact_1.CompactJson.parse(text.slice(index), offset + index);
        if (compact_1.CompactJson.isArray(data)) {
            return new Selector(type, offset, data);
        }
        return undefined;
    }
    Selector.parse = parse;
})(Selector || (exports.Selector = Selector = {}));
//# sourceMappingURL=selector.js.map