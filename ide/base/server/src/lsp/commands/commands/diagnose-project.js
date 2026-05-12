"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnoseProject = diagnoseProject;
exports.rescanProject = rescanProject;
const util_1 = require("../util");
/**
 * @see {Commands.DiagnoseProject}
 * @param context
 * @returns
 */
function diagnoseProject(context) {
    const workspaceProcessor = (0, util_1.getWorkspace)(context);
    return workspaceProcessor.start(context.token);
}
/**
 * @see {Commands.ScanProjects}
 */
function rescanProject(context) {
    const workspaceProcessor = (0, util_1.getWorkspace)(context);
    context.database.clear();
    return workspaceProcessor.start(context.token);
}
//# sourceMappingURL=diagnose-project.js.map