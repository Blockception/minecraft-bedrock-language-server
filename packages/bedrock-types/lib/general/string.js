"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.String = void 0;
/** The namespace for the string functions */
var String;
(function (String) {
    /**Checks if the given text value is a valid string
     * @param value The valued to compare to
     * @returns True or false if the text represents an string*/
    function is(value) {
        if (value.includes(" ")) {
            if (value.startsWith('"') && value.endsWith('"'))
                return true;
            return false;
        }
        return true;
    }
    String.is = is;
})(String || (exports.String = String = {}));
//# sourceMappingURL=string.js.map