"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integer = void 0;
/** The namespace for the integer type*/
var Integer;
(function (Integer) {
    /**The regex pattern that matches a integer */
    Integer.pattern = /^[-\d]*$/;
    /**Checks if the given text value is a valid integer
     * @param value The valued to compare to
     * @returns True or false if the text represents a integer*/
    function is(text) {
        return Integer.pattern.test(text);
    }
    Integer.is = is;
})(Integer || (exports.Integer = Integer = {}));
//# sourceMappingURL=integer.js.map