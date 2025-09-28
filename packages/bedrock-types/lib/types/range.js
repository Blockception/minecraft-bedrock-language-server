"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
const position_1 = require("./position");
/** */
var Range;
(function (Range) {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && position_1.Position.is(value.start) && position_1.Position.is(value.end))
            return true;
        return false;
    }
    Range.is = is;
    /**TODO add documentation
     *
     * @param start
     * @param end
     * @returns
     */
    function create(start, end) {
        return { start: start, end: end };
    }
    Range.create = create;
    /**TODO add documentation
     *
     * @param start
     * @param end
     * @returns
     */
    function createR(startLine, startOffset, endLine, endOffset) {
        return { start: { character: startOffset, line: startLine }, end: { character: endOffset, line: endLine } };
    }
    Range.createR = createR;
})(Range || (exports.Range = Range = {}));
//# sourceMappingURL=range.js.map