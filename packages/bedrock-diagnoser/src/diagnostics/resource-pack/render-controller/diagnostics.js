"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render_controller_diagnose_implementation = render_controller_diagnose_implementation;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const __1 = require("../..");
const diagnostics_1 = require("../../molang/diagnostics");
/**
 *
 * @param id
 * @param data
 * @param diagnoser
 */
function render_controller_diagnose_implementation(id, user, diagnoser) {
    const controller = diagnoser.context.getProjectData().resources.renderControllers.get(id, diagnoser.project);
    if (controller === undefined) {
        __1.Errors.missing('behaviors', 'trading', id, diagnoser);
        return;
    }
    if (bc_minecraft_bedrock_project_1.ProjectItem.is(controller)) {
        (0, diagnostics_1.diagnose_molang_implementation)(user, controller.item, diagnoser);
    }
}
//# sourceMappingURL=diagnostics.js.map