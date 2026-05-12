"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offset = void 0;
/**
 *
 */
var Offset;
(function (Offset) {
    /**
     *
     * @param word
     * @param pos
     */
    function isWithin(word, pos) {
        return pos >= word.offset && pos < word.offset + word.text.length;
    }
    Offset.isWithin = isWithin;
    /**
     *
     * @param word
     * @param pos
     */
    function isAfter(word, pos) {
        return pos >= word.offset + word.text.length;
    }
    Offset.isAfter = isAfter;
    function charAt(word, pos) {
        const char = pos - word.offset;
        return word.text.charAt(char);
    }
    Offset.charAt = charAt;
})(Offset || (exports.Offset = Offset = {}));
//# sourceMappingURL=offset.js.map