"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_coordinate_diagnose = minecraft_coordinate_diagnose;
exports.minecraft_coordinate_set_diagnose = minecraft_coordinate_set_diagnose;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
function minecraft_coordinate_diagnose(value, diagnoser) {
    if (bc_minecraft_bedrock_types_1.Minecraft.Coordinate.is(value.text))
        return true;
    diagnoser.add(value, 'Invalid coordinate value: ' + value.text, types_1.DiagnosticSeverity.error, 'minecraft.coordinate.invalid');
    return false;
}
/**
 * Validates coordinate groups across all matching overloads.
 * When multiple overloads are provided, the first one with valid coordinate usage is preferred
 * to avoid false positives (e.g. when a name-tag overload would consume a coordinate as a string).
 * @param overloads The matching command overloads to validate against
 * @param commandParams The actual parameters provided in the command
 * @param diagnoser The diagnostics builder
 */
function minecraft_coordinate_set_diagnose(overloads, commandParams, diagnoser) {
    const patternParams = overloads.length > 1
        ? (overloads.find((o) => coordinateGroupsAreValid(o.parameters, commandParams)) ?? overloads[0]).parameters
        : overloads[0].parameters;
    let i = 0;
    while (i < patternParams.length) {
        if (patternParams[i].type !== bc_minecraft_bedrock_command_1.ParameterType.coordinate) {
            i++;
            continue;
        }
        // Find the end of the consecutive run of coordinate parameters
        let end = i;
        while (end + 1 < patternParams.length && patternParams[end + 1].type === bc_minecraft_bedrock_command_1.ParameterType.coordinate)
            end++;
        if (end === i + 1) {
            // 2-coord group (e.g. spreadplayers x,z): local (^) coordinates require all 3 axes and are disallowed
            for (let g = i; g <= end; g++) {
                const p = commandParams[g];
                if (p?.text.startsWith('^')) {
                    diagnoser.add(p, `Cannot use local coordinates (^) for a 2D position`, types_1.DiagnosticSeverity.error, 'minecraft.coordinate.local');
                }
            }
        }
        else {
            // 3-coord triplets: must be complete and must not mix local (^) with non-local types
            for (let g = i; g + 2 <= end; g += 3) {
                const provided = [commandParams[g], commandParams[g + 1], commandParams[g + 2]].filter((p) => p !== undefined);
                if (provided.length === 0)
                    continue;
                if (provided.length < 3) {
                    diagnoser.add(provided[provided.length - 1], `Coordinates must be specified as a complete set of 3 (x y z), only ${provided.length} provided`, types_1.DiagnosticSeverity.error, 'minecraft.coordinate.incomplete');
                    continue;
                }
                const hasLocal = provided.some((p) => p.text.startsWith('^'));
                if (hasLocal && provided.some((p) => !p.text.startsWith('^'))) {
                    diagnoser.add(provided[0], `Cannot mix local coordinates (^) with absolute or relative coordinates`, types_1.DiagnosticSeverity.error, 'minecraft.coordinate.mixed');
                }
            }
        }
        i = end + 1;
    }
}
/**
 * Returns true if all coordinate groups in this overload are valid for the given command params.
 * Used to prefer a well-matching overload over one that would produce false-positive errors.
 */
function coordinateGroupsAreValid(patternParams, commandParams) {
    let i = 0;
    while (i < patternParams.length) {
        if (patternParams[i].type !== bc_minecraft_bedrock_command_1.ParameterType.coordinate) {
            i++;
            continue;
        }
        let end = i;
        while (end + 1 < patternParams.length && patternParams[end + 1].type === bc_minecraft_bedrock_command_1.ParameterType.coordinate)
            end++;
        if (end === i + 1) {
            // 2-coord group: ^ not allowed
            for (let g = i; g <= end; g++) {
                if (commandParams[g]?.text.startsWith('^'))
                    return false;
            }
        }
        else {
            // 3-coord triplets: must be complete and not mixed
            for (let g = i; g + 2 <= end; g += 3) {
                const provided = [commandParams[g], commandParams[g + 1], commandParams[g + 2]].filter((p) => p !== undefined);
                if (provided.length > 0 && provided.length < 3)
                    return false;
                if (provided.length === 3) {
                    const hasLocal = provided.some((p) => p.text.startsWith('^'));
                    if (hasLocal && provided.some((p) => !p.text.startsWith('^')))
                        return false;
                }
            }
        }
        i = end + 1;
    }
    return true;
}
//# sourceMappingURL=coordinate.js.map