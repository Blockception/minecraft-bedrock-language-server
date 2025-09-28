"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = void 0;
/**A parameter in a command, represent a single 'word' */
class Parameter {
    /**Creates a new instance of the parameter
     * @param text The text to assign
     * @param offset The offset to assign*/
    constructor(text = "", offset = 0) {
        this.offset = offset;
        this.text = text;
    }
}
exports.Parameter = Parameter;
/**The namespace surrounding the parameter object*/
(function (Parameter) {
    /**Checks if the given instance implements the Parameter object
     * @param value The value to evaluate
     * @returns true or false if the object implements the Parameter object or not*/
    function is(value) {
        if (value && typeof value.offset === "number" && typeof value.text === "string")
            return true;
        return false;
    }
    Parameter.is = is;
})(Parameter || (exports.Parameter = Parameter = {}));
//# sourceMappingURL=parameter.js.map