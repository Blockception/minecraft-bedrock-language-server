"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
const types_1 = require("../position/types");
/**
 * Namespace containing utility functions for working with Range objects.
 */
var Range;
(function (Range) {
    /**
     * Type guard to check if a value is a valid Range object.
     * @param value The value to check
     * @returns True if the value has valid start and end Position objects, false otherwise
     */
    function is(value) {
        if (value && types_1.Position.is(value.start) && types_1.Position.is(value.end))
            return true;
        return false;
    }
    Range.is = is;
    /**
     * Creates a new Range object from start and end Position objects.
     * @param start The starting position of the range
     * @param end The ending position of the range
     * @returns A new Range object
     */
    function create(start, end) {
        return { start: start, end: end };
    }
    Range.create = create;
    /**
     * Creates a new Range object from raw line and character offset values.
     * @param startLine The line number of the start position
     * @param startOffset The character offset of the start position
     * @param endLine The line number of the end position
     * @param endOffset The character offset of the end position
     * @returns A new Range object
     */
    function createR(startLine, startOffset, endLine, endOffset) {
        return { start: { character: startOffset, line: startLine }, end: { character: endOffset, line: endLine } };
    }
    Range.createR = createR;
})(Range || (exports.Range = Range = {}));
//# sourceMappingURL=types.js.map