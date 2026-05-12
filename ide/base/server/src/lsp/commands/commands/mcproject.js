"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMcProject = createMcProject;
const bc_minecraft_project_1 = require("bc-minecraft-project");
const mcprojects_1 = require("../../../project/mcprojects");
const util_1 = require("../../../util");
const util_2 = require("../util");
async function createMcProject(context) {
    const workspaceProcessor = (0, util_2.getWorkspace)(context);
    const ws = await workspaceProcessor.get();
    if (ws === null) {
        throw new Error('trouble loading the workspaces');
    }
    for (let I = 0; I < ws.length; I++) {
        const folder = ws[I].uri;
        const p = (0, mcprojects_1.getProject)(folder, context.settings);
        bc_minecraft_project_1.MCProject.saveSync(util_1.Fs.FromVscode(folder), p);
    }
}
//# sourceMappingURL=mcproject.js.map