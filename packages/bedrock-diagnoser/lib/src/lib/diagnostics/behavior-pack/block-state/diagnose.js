"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_check_blockstates = behaviorpack_check_blockstates;
exports.behaviorpack_check_command_blockstates = behaviorpack_check_command_blockstates;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("bc-minecraft-bedrock-types/lib/types");
const types_2 = require("../../../types");
/** Checks if the blocks exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
function behaviorpack_check_blockstates(blockDescriptor, diagnoser) {
    //If the block has no states then skip
    if (!blockDescriptor.text.includes("["))
        return;
    //Parses states
    const blockData = bc_minecraft_bedrock_types_1.Minecraft.Block.fromBlockDescriptor(blockDescriptor.text);
    // ^ Returns ['"state"'] instead of ['state']; this fixes that
    blockData.states.forEach((state) => {
        if (state.property.startsWith('"') && state.property.endsWith('"'))
            state.property = state.property.substring(1, state.property.length - 1);
    });
    check_block_definition(blockData, blockDescriptor, diagnoser);
}
/**
 *
 * @param blockId
 * @param states
 * @param diagnoser
 */
function behaviorpack_check_command_blockstates(blockId, states, diagnoser) {
    const blockData = {
        id: blockId.text,
        location: types_1.Location.empty(),
        states: [],
    };
    // Is state properly formatted?
    if (states.text.startsWith("[") && states.text.endsWith("]")) {
        const value = states.text.substring(1, states.text.length - 1);
        const split = value.split(",");
        // For each state
        for (let I = 0; I < split.length; I++) {
            const item = split[I];
            const state = split[I].split("=").map((part) => part.trim());
            // Is state properly defined
            if (state.length == 2) {
                // eslint-disable-next-line prefer-const
                let [property, value] = state;
                // property is a string literal?
                if (property.startsWith('"') && property.endsWith('"')) {
                    property = property.substring(1, property.length - 1);
                    blockData.states.push({ value, property });
                }
                else {
                    diagnoser.add(blockId, `Invalid state: '${property}' in '${item}' on the block state definition: '${states.text}', needs to be a string literal with ""`, types_2.DiagnosticSeverity.error, "behaviorpack.block.states.invalid");
                }
            }
            else if (state[0] !== "") {
                diagnoser.add(states, `Invalid state: '${item}' in the block command, needs to be in the format ["state"=value] :`, types_2.DiagnosticSeverity.error, "behaviorpack.block.states.invalid");
            }
        }
    }
    else {
        diagnoser.add(states, `Invalid states: '${states.text}' in the block command, needs to be a list with []`, types_2.DiagnosticSeverity.error, "behaviorpack.block.states.invalid");
    }
    check_block_definition(blockData, states, diagnoser);
}
function check_block_definition(blockDefinition, location, diagnoser) {
    const blockItem = diagnoser.context.getProjectData().behaviors.blocks.get(blockDefinition.id, diagnoser.project);
    if (!blockItem)
        return;
    if (!bc_minecraft_bedrock_project_1.ProjectItem.is(blockItem))
        return;
    const block = blockItem.item;
    if (block.states.length == 0 && blockDefinition.states.length > 0) {
        //Block has not defined states, but states are being used
        diagnoser.add(location, `Block: ${block.id} has no defined states`, types_2.DiagnosticSeverity.error, "behaviorpack.block.states.missing");
        return;
    }
    blockDefinition.states.forEach((state) => {
        check_state(state, block, location, diagnoser);
    });
}
/**
 *
 * @param blockDescriptor
 * @param state
 * @param data
 * @param diagnoser
 * @returns
 */
function check_state(state, data, location, diagnoser) {
    for (let I = 0; I < data.states.length; I++) {
        const stateData = data.states[I];
        //If found state with the same name
        if (stateData.name === state.property) {
            let actual = state.value;
            const values = stateData.values;
            if (stateData.type === "string") {
                if (actual.startsWith('"') && actual.endsWith('"')) {
                    actual = actual.substring(1, actual.length - 1);
                }
                else {
                    diagnoser.add(location, `Invalid state value: '${state.value}' for state: '${state.property}' in the block definition: '${data.id}', needs to be a string literal with ""`, types_2.DiagnosticSeverity.error, "behaviorpack.block.states.invalid");
                    return;
                }
            }
            //Check if the state value is valid
            for (const expect of values) {
                // Compare int/bool/string values
                if (String(expect) == actual) {
                    // String() because "true" != true unlike "2" == 2
                    return;
                }
            }
            diagnoser.add(location, `Invalid state value: '${state.value}' for state: '${state.property}' in the block definition: '${data.id}'\nValid values are: ${values.join(",")}`, types_2.DiagnosticSeverity.error, "behaviorpack.block.states.invalid");
            return;
        }
    }
    //No state matching found
    diagnoser.add(location, `Missing state: '${state.property}' in the block definition: '${data.id}'`, types_2.DiagnosticSeverity.error, "behaviorpack.block.states.missing");
}
//# sourceMappingURL=diagnose.js.map