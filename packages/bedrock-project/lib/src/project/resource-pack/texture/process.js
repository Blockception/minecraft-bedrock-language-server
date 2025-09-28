"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessTextureAtlas = ProcessTextureAtlas;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const texture_atlas_1 = require("../../../internal/resource-pack/texture-atlas");
const types_1 = require("../../../types");
/**
 *
 * @param doc
 * @returns
 */
function ProcessTextureAtlas(doc) {
    const imp = types_1.TextDocument.toObject(doc, texture_atlas_1.TextureAtlas.is);
    if (!imp)
        return undefined;
    const uri = doc.uri;
    const content = doc.getText();
    return Object.entries(imp.texture_data).map(([key]) => {
        return {
            id: key,
            location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(key)),
            documentation: types_1.Documentation.getDoc(doc, () => `Texture: ${key}`),
        };
    });
}
//# sourceMappingURL=process.js.map