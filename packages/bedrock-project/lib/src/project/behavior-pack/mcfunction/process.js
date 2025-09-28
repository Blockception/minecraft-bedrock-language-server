"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../../types");
/**
 *
 * @param doc
 * @returns
 */
function process(doc) {
    const uri = doc.uri;
    if (uri.endsWith(".json"))
        return undefined;
    let index = uri.indexOf("functions");
    if (index < 0)
        return undefined;
    index += 10;
    let id = uri.substring(index, uri.length).replace(/\\/g, "/");
    id = id.replace(".mcfunction", "");
    if (id.includes(" ") || id.includes("\t")) {
        id = `"${id}"`;
    }
    return {
        id: id,
        location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, 0),
        documentation: types_1.Documentation.getDoc(doc, () => `Mcfunction: ${id}`),
    };
}
//# sourceMappingURL=process.js.map