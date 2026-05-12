"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPath = void 0;
/**
 * Namespace containing utility functions for working with JSON paths.
 */
var JsonPath;
(function (JsonPath) {
    /**The separator character used in JSON paths*/
    JsonPath.seperator = '/';
    /**
     * Resolves a JSON path to an offset position in the text.
     * Searches for path components in the text and returns the position of the last found component.
     * @param text The text content or an object with a getText() method
     * @param path The JSON path to resolve (e.g., "/property/subproperty")
     * @returns The character offset in the text where the path resolves to
     */
    function resolve(text, path) {
        if (typeof text === 'object')
            text = text.getText();
        const s = path.split(/[\\/]/);
        let index = 0;
        for (let I = 0; I < s.length; I++) {
            const elem = s[I];
            if (!Number.isInteger(elem) && elem !== '') {
                const t = text.indexOf(elem, index);
                if (t > -1)
                    index = t;
            }
        }
        return index;
    }
    JsonPath.resolve = resolve;
    /**
     * Creates a JSON path from multiple path segments.
     * @param path Variable number of path segments to join
     * @returns A JSON path string with segments joined by the separator
     */
    function create(...path) {
        return path.join(JsonPath.seperator);
    }
    JsonPath.create = create;
    /**
     * Type guard to check if a value is a valid JsonPath (string).
     * @param value The value to check
     * @returns True if the value is a string, false otherwise
     */
    function is(value) {
        return typeof value === 'string';
    }
    JsonPath.is = is;
})(JsonPath || (exports.JsonPath = JsonPath = {}));
//# sourceMappingURL=types.js.map