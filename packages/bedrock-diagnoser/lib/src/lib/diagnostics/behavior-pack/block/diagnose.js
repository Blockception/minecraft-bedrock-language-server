"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_check_blockdescriptor = behaviorpack_check_blockdescriptor;
exports.behaviorpack_check_blockid_from_descriptor = behaviorpack_check_blockid_from_descriptor;
exports.is_block_defined = is_block_defined;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const diagnose_1 = require("../block-state/diagnose");
const __1 = require("../..");
/**
 *
 * @param blockDescriptor
 * @param diagnoser
 */
function behaviorpack_check_blockdescriptor(blockDescriptor, diagnoser) {
    behaviorpack_check_blockid_from_descriptor(blockDescriptor, diagnoser);
    (0, diagnose_1.behaviorpack_check_blockstates)(blockDescriptor, diagnoser);
}
function behaviorpack_check_blockid_from_descriptor(blockDescriptor, diagnoser) {
    return is_block_defined(bc_minecraft_bedrock_types_1.Minecraft.Block.getId(blockDescriptor.text), diagnoser);
}
/**Checks if the blocks exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
function is_block_defined(id, diagnoser) {
    //Project has block
    const anim = diagnoser.context.getProjectData().behaviors.blocks.get(id, diagnoser.project);
    if (anim === undefined) {
        __1.Errors.missing("behaviors", "blocks", id, diagnoser);
        return false;
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map