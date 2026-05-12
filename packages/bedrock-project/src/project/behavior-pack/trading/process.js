"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const types_1 = require("../../../types");
/**
 *
 * @param doc
 * @returns
 */
function process(doc) {
    const uri = doc.uri;
    const index = uri.indexOf('trading');
    if (index < 0)
        return undefined;
    const id = uri.substring(index, uri.length).replace(/\\/g, '/');
    return {
        id: id,
        location: bc_minecraft_bedrock_shared_1.Location.create(uri, 0),
        documentation: types_1.Documentation.getDoc(doc, () => `Trading table: ${id}`),
    };
}
//# sourceMappingURL=process.js.map