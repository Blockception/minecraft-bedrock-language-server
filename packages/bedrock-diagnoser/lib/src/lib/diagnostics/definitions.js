"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.education_enabled = education_enabled;
exports.check_definition_value = check_definition_value;
const bc_minecraft_project_1 = require("bc-minecraft-project");
const types_1 = require("../types");
/**Returns if the project has education enabled
 * @param diagnoser The diagnostics builder to add the errors to
 * @returns True if education is enabled, false if not*/
function education_enabled(diagnoser) {
    return diagnoser.project.attributes["education.enable"] === "true";
}
/**Checks if the Definition has the given value, if it has then return `true`, if it also excluded will report it to the diagnoser.
 * If it is neither in defined or excluded then `false` is return
 * @param container The container to check
 * @param value The value to find
 * @param diagnoser The diagnoser to report to
 * @returns false is not found in either exclusion or definitions*/
function check_definition_value(container, value, diagnoser) {
    if (bc_minecraft_project_1.Definition.is(container)) {
        //Is defined
        if (container.defined.includes(value))
            return true;
        //Is excluded
        if (container.excluded.includes(value)) {
            diagnoser.add(value, "Value has been blacklisted through the project files", types_1.DiagnosticSeverity.error, "project.excluded");
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=definitions.js.map