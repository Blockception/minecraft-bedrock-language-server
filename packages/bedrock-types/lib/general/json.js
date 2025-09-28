"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = void 0;
/**
 * The namespace for the json values as strings
 */
var Json;
(function (Json) {
    /**Checks if the given text value is a valid json object
     * @param value The valued to compare to
     * @returns True or false if the text represents an json obect*/
    function isObject(value) {
        if (value.startsWith("{") && value.endsWith("}"))
            return true;
        return false;
    }
    Json.isObject = isObject;
    /**Checks if the given text value is a valid jsob array
     * @param value The valued to compare to
     * @returns True or false if the text represents an json array*/
    function isArray(value) {
        if (value.startsWith("[") && value.endsWith("]"))
            return true;
        return false;
    }
    Json.isArray = isArray;
})(Json || (exports.Json = Json = {}));
//# sourceMappingURL=json.js.map