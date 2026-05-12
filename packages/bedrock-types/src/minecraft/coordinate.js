"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinate = void 0;
/** */
var Coordinate;
(function (Coordinate) {
    /**The regex pattern that matches a coordinate */
    Coordinate.pattern = /^[~^+\-\d][+\-.\d]*$/;
    /**Checks if the given text value is a valid coordinate
     * @param value The valued to compare to
     * @returns True or false if the text represents a coordinate*/
    function is(text) {
        return Coordinate.pattern.test(text);
    }
    Coordinate.is = is;
})(Coordinate || (exports.Coordinate = Coordinate = {}));
//# sourceMappingURL=coordinate.js.map