"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_block_document = diagnose_block_document;
const types_1 = require("../../../types");
const block_1 = require("../../behavior-pack/block");
const json_1 = require("../../json/json");
const molang_1 = require("../../molang");
const BLOCKSHAPE_DEPRECATION_MESSAGE = 'The "blockshape" property is deprecated and no longer officially supported. Support was dropped after 1.19.0, meaning blocks introduced in "Trails & Tales" and later do not have available block shapes. Block shapes cannot be used with custom blocks. Consider using custom geometry or minecraft:material_instances instead.';
/**Diagnoses the given document as a block.json
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_block_document(diagnoser) {
    const blocks = json_1.Json.LoadReport(diagnoser);
    if (!json_1.Json.TypeCheck(blocks, diagnoser, 'blocks.json', 'resourcepack.blocks.invalid', is))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, blocks);
    const keys = Object.keys(blocks);
    const rp = diagnoser.context.getProjectData().projectData.resourcePacks;
    for (let I = 0; I < keys.length; I++) {
        const key = keys[I];
        if (key === 'format_version')
            continue;
        const block = blocks[keys[I]];
        if (typeof block === 'object') {
            // Check for deprecated blockshape property
            if (block.blockshape) {
                diagnoser.add(`${key}/blockshape`, BLOCKSHAPE_DEPRECATION_MESSAGE, types_1.DiagnosticSeverity.warning, 'resourcepack.blocks.blockshape.deprecated');
            }
            const texture = block.textures;
            if (!texture)
                return;
            if (typeof texture === 'string') {
                hasDefinition(key, texture, rp, diagnoser);
            }
            else if (texture) {
                if (texture.down)
                    hasDefinition(key, texture.down, rp, diagnoser);
                if (texture.up)
                    hasDefinition(key, texture.up, rp, diagnoser);
                if (texture.side)
                    hasDefinition(key, texture.side, rp, diagnoser);
                if (texture.north)
                    hasDefinition(key, texture.north, rp, diagnoser);
                if (texture.south)
                    hasDefinition(key, texture.south, rp, diagnoser);
                if (texture.west)
                    hasDefinition(key, texture.west, rp, diagnoser);
                if (texture.east)
                    hasDefinition(key, texture.east, rp, diagnoser);
            }
            (0, block_1.is_block_defined)(key, diagnoser);
            const blockFile = diagnoser.context.getProjectData().projectData.behaviorPacks.blocks.get(key)?.location.uri;
            if (!blockFile)
                return;
            if (diagnoser.context.getDocument(blockFile)?.getText().includes('minecraft:material_instances'))
                diagnoser.add(`${key}`, 'Only one "blocks.json" or "minecraft:material_instances" may be used', types_1.DiagnosticSeverity.error, 'behaviorpack.block.components.material_instance_clash');
        }
    }
}
function hasDefinition(block, value, rp, diagnoser) {
    if (rp.terrainTextures.has(value))
        return;
    diagnoser.add(`${block}/${value}`, 'The texture is not defined in the terrain_texture.json', types_1.DiagnosticSeverity.error, 'resourcepack.texture.undefined');
}
function is(value) {
    if (typeof value === 'object') {
        return true;
    }
    return false;
}
//# sourceMappingURL=document.js.map