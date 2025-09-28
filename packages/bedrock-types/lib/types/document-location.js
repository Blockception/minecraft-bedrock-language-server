"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentLocation = void 0;
const json_path_1 = require("./json-path");
const offset_word_1 = require("./offset-word");
const position_1 = require("./position");
const range_1 = require("./range");
function ToText(value) {
    return typeof value === "string" ? value : value.getText();
}
/**
 *
 */
var DocumentLocation;
(function (DocumentLocation) {
    function toOffset(data, text) {
        switch (typeof data) {
            case "number":
                return data;
            //Json path
            case "string":
                if (text === undefined)
                    throw new Error("text or document must be provided");
                return json_path_1.JsonPath.resolve(text, data);
            //Position
            case "object":
                if (offset_word_1.OffsetWord.is(data)) {
                    return data.offset;
                }
                if (text === undefined)
                    throw new Error("text or document must be provided");
                return position_1.Position.toOffset(data, ToText(text));
            default:
                return 0;
        }
    }
    DocumentLocation.toOffset = toOffset;
    /**TODO add documentation
     *
     * @param data
     * @param text
     * @returns
     */
    function toPosition(data, text) {
        switch (typeof data) {
            case "number":
                return position_1.Position.toPosition(data, ToText(text));
            //Json path
            case "string":
                return position_1.Position.toPosition(json_path_1.JsonPath.resolve(text, data), ToText(text));
            //Position
            case "object":
                if (offset_word_1.OffsetWord.is(data)) {
                    return position_1.Position.toPosition(data.offset, data.text);
                }
                return data;
            default:
                return position_1.Position.create(0, 0);
        }
    }
    DocumentLocation.toPosition = toPosition;
    function toRange(data, text, length) {
        if (offset_word_1.OffsetWord.is(data)) {
            const t = data.text;
            return range_1.Range.create(position_1.Position.toPosition(data.offset, t), position_1.Position.toPosition(data.offset + t.length, t));
        }
        if (text === undefined)
            throw new Error("requires text or document");
        if (length === undefined)
            throw new Error("requires length");
        const startindex = toOffset(data, text);
        const endindex = startindex + length;
        const t = ToText(text);
        return range_1.Range.create(position_1.Position.toPosition(startindex, t), position_1.Position.toPosition(endindex, t));
    }
    DocumentLocation.toRange = toRange;
})(DocumentLocation || (exports.DocumentLocation = DocumentLocation = {}));
//# sourceMappingURL=document-location.js.map