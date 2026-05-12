"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMetadataBlock = convertMetadataBlock;
/**
 * Convert metadata block to BP block
 */
function convertMetadataBlock(block) {
    return {
        id: block.name,
        properties: block.properties.map((p) => p.name),
    };
}
//# sourceMappingURL=block.js.map