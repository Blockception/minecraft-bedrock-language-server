"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentLocation = void 0;
const json_path_1 = require("../json-path");
const offset_word_1 = require("../offset-word");
const position_1 = require("../position");
const range_1 = require("../range");
/** Converts TextOrDoc to string */
function ToText(value) {
    return typeof value === 'string' ? value : value.getText();
}
/**
 * Document location utilities
 */
var DocumentLocation;
(function (DocumentLocation) {
    /**
     * Converts a DocumentLocation to an offset number.
     * @param loc The document location to convert (number, string path, Position, or OffsetWord)
     * @param text The text content or document object needed for conversion
     * @returns The offset number representing the location
     */
    function toOffset(loc, text) {
        switch (typeof loc) {
            case 'number':
                return loc;
            //Json path
            case 'string':
                if (text === undefined)
                    throw new Error('text or document must be provided');
                return json_path_1.JsonPath.resolve(text, loc);
            //Position
            case 'object':
                if (offset_word_1.OffsetWord.is(loc)) {
                    return loc.offset;
                }
                if (text === undefined)
                    throw new Error('text or document must be provided');
                return position_1.Position.toOffset(loc, ToText(text));
            default:
                return 0;
        }
    }
    DocumentLocation.toOffset = toOffset;
    /**
     * Converts a DocumentLocation to a Position object.
     * Handles conversion from numbers, JSON paths, and Position/OffsetWord objects.
     * @param data The document location to convert (number, string path, Position, or OffsetWord)
     * @param text The text content or document object needed for conversion
     * @returns A Position object representing the location
     */
    function toPosition(data, text) {
        switch (typeof data) {
            case 'number':
                return position_1.Position.toPosition(data, ToText(text));
            //Json path
            case 'string':
                return position_1.Position.toPosition(json_path_1.JsonPath.resolve(text, data), ToText(text));
            //Position
            case 'object':
                if (offset_word_1.OffsetWord.is(data)) {
                    return position_1.Position.toPosition(data.offset, data.text);
                }
                return data;
            default:
                return position_1.Position.create(0, 0);
        }
    }
    DocumentLocation.toPosition = toPosition;
    /**
     * Converts a DocumentLocation to a Range object.
     * @param data The document location to convert (number, string path, Position)
     * @param text The text content or document object needed for conversion
     * @param length The length of the range
     * @returns A Range object representing the location
     */
    function toRange(data, text, length) {
        if (offset_word_1.OffsetWord.is(data)) {
            const t = data.text;
            return range_1.Range.create(position_1.Position.toPosition(data.offset, t), position_1.Position.toPosition(data.offset + t.length, t));
        }
        if (text === undefined)
            throw new Error('requires text or document');
        if (length === undefined)
            throw new Error('requires length');
        const startindex = toOffset(data, text);
        const endindex = startindex + length;
        const t = ToText(text);
        return range_1.Range.create(position_1.Position.toPosition(startindex, t), position_1.Position.toPosition(endindex, t));
    }
    DocumentLocation.toRange = toRange;
})(DocumentLocation || (exports.DocumentLocation = DocumentLocation = {}));
//# sourceMappingURL=types.js.map