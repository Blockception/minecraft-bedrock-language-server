"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspace = getWorkspace;
const workspace_processor_1 = require("../process/workspace-processor");
function getWorkspace(context) {
    const workspaceProcessor = context.services.service(workspace_processor_1.WorkspaceProcessor);
    if (workspaceProcessor === undefined) {
        throw new Error('cannot find the workspace processor');
    }
    return workspaceProcessor;
}
//# sourceMappingURL=util.js.map