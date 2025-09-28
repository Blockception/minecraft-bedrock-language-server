"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetWord = void 0;
/**
 *
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
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.text === "string" && typeof value.offset === "number")
            return true;
        return false;
    }
    OffsetWord.is = is;
})(OffsetWord || (exports.OffsetWord = OffsetWord = {}));
//# sourceMappingURL=offset-word.js.map