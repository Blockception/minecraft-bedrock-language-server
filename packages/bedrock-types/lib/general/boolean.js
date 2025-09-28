"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boolean = void 0;
/** The boolean data type, but related to minecraft */
var Boolean;
(function (Boolean) {
    /**Checks if the given text value is a valid boolean
     * @param value The valued to compare to
     * @returns True or false if the text represents a boolean*/
    function is(value) {
        switch (value) {
            case "false":
            case "False":
            case "true":
            case "True":
            case false:
            case true:
                return true;
            default:
                return false;
        }
    }
    Boolean.is = is;
    /**Parses the text value to a boolean value
     * @param value The text value comparing
     * @returns True or false if the text represents a boolean*/
    function parse(value) {
        switch (value) {
            case "True":
            case "true":
            case "1":
            case true:
                return true;
            default:
            case false:
                return false;
        }
    }
    Boolean.parse = parse;
})(Boolean || (exports.Boolean = Boolean = {}));
//# sourceMappingURL=boolean.js.map