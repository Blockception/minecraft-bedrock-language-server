"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = void 0;
const jsonc_1 = require("jsonc");
/**
 * Unified namespace for JSONC parsing operations.
 * Provides utilities for parsing JSON with comments (JSONC) format.
 */
var Json;
(function (Json) {
    /**
     * Parse JSONC text and cast to the given type.
     * @param doc The document or string to parse
     * @returns The parsed object or undefined if parsing failed
     */
    function To(doc) {
        let out = undefined;
        let file = undefined;
        try {
            let content;
            if (typeof doc === 'object') {
                file = doc.uri;
                content = doc.getText();
            }
            else {
                content = doc;
            }
            if (content !== '') {
                out = jsonc_1.jsonc.parse(content);
            }
        }
        catch (err) {
            let message = '';
            if (file) {
                message = `Cannot cast file to json: ${file}\n`;
            }
            if (err.message) {
                message += 'message: ' + err.message;
            }
            else {
                message += JSON.stringify(err);
            }
            console.error(message);
        }
        return out;
    }
    Json.To = To;
    /**
     * Parse JSONC text with optional stripComments option.
     * @param text The text to parse
     * @param options Optional parsing options
     * @returns The parsed object
     */
    function parse(text, options) {
        return jsonc_1.jsonc.parse(text, options);
    }
    Json.parse = parse;
})(Json || (exports.Json = Json = {}));
//# sourceMappingURL=jsonc.js.map