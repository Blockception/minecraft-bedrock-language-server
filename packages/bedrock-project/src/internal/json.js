"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = void 0;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
/**The namespace that provided json code*/
var Json;
(function (Json) {
    /**Takes the given text data and casts into the given object
     * @param doc The document or string to cast
     * @returns Return an object or undefined is something went wrong*/
    function To(doc) {
        return bc_minecraft_bedrock_shared_1.Json.To(doc);
    }
    Json.To = To;
})(Json || (exports.Json = Json = {}));
//# sourceMappingURL=json.js.map