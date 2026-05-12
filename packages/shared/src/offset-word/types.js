"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetWord = void 0;
/**
 * Namespace containing utility functions for working with OffsetWord objects.
 */
var OffsetWord;
(function (OffsetWord) {
    /**
     * Creates a new OffsetWord
     * @param text The text to use
     * @param number The offset to use
     * @returns A new OffsetWord
     */
    function create(text, offset) {
        offset = offset || 0;
        return { text, offset };
    }
    OffsetWord.create = create;
    /**
     * Type guard to check if a value is a valid OffsetWord object.
     * @param value The value to check
     * @returns True if the value has text (string) and offset (number) properties, false otherwise
     */
    function is(value) {
        if (typeof value === 'object' && value !== null && typeof value.text === 'string' && typeof value.offset === 'number')
            return true;
        return false;
    }
    OffsetWord.is = is;
})(OffsetWord || (exports.OffsetWord = OffsetWord = {}));
//# sourceMappingURL=types.js.map