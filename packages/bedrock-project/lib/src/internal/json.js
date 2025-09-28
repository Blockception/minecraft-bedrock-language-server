"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = void 0;
const jsonc_1 = require("jsonc");
/**The namespace that provided json code*/
var Json;
(function (Json) {
    /**Takes the given text data and casts into the given object
     * @param doc The document or string to cast
     * @returns Return an object or undefined is something went wrong*/
    function To(doc) {
        let out = undefined;
        let file = undefined;
        try {
            let content;
            if (typeof doc === "object") {
                file = doc.uri;
                content = doc.getText();
            }
            else {
                content = doc;
            }
            if (content !== "")
                out = jsonc_1.jsonc.parse(content);
        }
        catch (err) {
            let message = "";
            if (file) {
                message = `Cannot cast file to json: ${file}\n`;
            }
            if (err.message) {
                message += "message: " + err.message;
            }
            else {
                message += JSON.stringify(err);
            }
            console.error(message);
        }
        return out;
    }
    Json.To = To;
})(Json || (exports.Json = Json = {}));
//# sourceMappingURL=json.js.map