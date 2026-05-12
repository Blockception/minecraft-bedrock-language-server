"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Float = void 0;
/** The namespace for the float type */
var Float;
(function (Float) {
    /**The regex pattern that matches a float */
    Float.pattern = /^[-.\d]*$/;
    /**Checks if the given text value is a valid float
     * @param value The valued to compare to
     * @returns True or false if the text represents a float*/
    function is(text) {
        return Float.pattern.test(text);
    }
    Float.is = is;
})(Float || (exports.Float = Float = {}));
//# sourceMappingURL=float.js.map