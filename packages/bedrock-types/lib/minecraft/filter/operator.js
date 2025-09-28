"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorType = void 0;
/** The operator type */
var OperatorType;
(function (OperatorType) {
    /**
     * Parses the given text into a operator type
     * @param text The text to parse
     * @returns The parsed operator type
     * @throws When the text is not a valid operator type
     */
    function parse(text) {
        switch (text) {
            case "!=":
            case "<":
            case "<=":
            case "<>":
            case "=":
            case "==":
            case ">":
            case ">=":
            case "equals":
            case "not":
                return text;
            default:
                throw new Error(`Unknown operator type: ${text}`);
        }
    }
    OperatorType.parse = parse;
})(OperatorType || (exports.OperatorType = OperatorType = {}));
//# sourceMappingURL=operator.js.map