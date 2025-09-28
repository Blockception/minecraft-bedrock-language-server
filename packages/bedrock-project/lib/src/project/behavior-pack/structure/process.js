"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
/**
 *
 * @param doc
 * @returns
 */
function process(doc) {
    const uri = doc.uri;
    let index = uri.indexOf("structures");
    if (index < 0)
        return undefined;
    index += 11;
    let id = uri.substring(index, uri.length).replace(/\\/g, "/");
    id = id.replace(".mcstructure", "");
    if (id.includes("/")) {
        id = '"' + id + '"';
    }
    return {
        id: id,
        location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, 0),
        documentation: `McStructure: ${id}`,
    };
}
//# sourceMappingURL=process.js.map