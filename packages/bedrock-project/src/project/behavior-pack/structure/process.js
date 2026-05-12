"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
/**
 *
 * @param doc
 * @returns
 */
function process(doc) {
    const uri = doc.uri;
    let index = uri.indexOf('structures');
    if (index < 0)
        return undefined;
    index += 11;
    let path = uri.substring(index, uri.length).replace(/\\/g, '/');
    path = path.replace('.mcstructure', '');
    // The first path segment is the namespace; the rest is the identifier.
    // Files directly in the structures/ folder use the 'mystructure' namespace.
    const slashIndex = path.indexOf('/');
    let id;
    if (slashIndex < 0) {
        id = `mystructure:${path}`;
    }
    else {
        const namespace = path.substring(0, slashIndex);
        const name = path.substring(slashIndex + 1);
        id = `${namespace}:${name}`;
    }
    return {
        id: id,
        location: bc_minecraft_bedrock_shared_1.Location.create(uri, 0),
        documentation: `McStructure: ${id}`,
    };
}
//# sourceMappingURL=process.js.map