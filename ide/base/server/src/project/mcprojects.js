"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProject = getProject;
exports.GetProjectAsync = GetProjectAsync;
exports.getProjectEmpty = getProjectEmpty;
exports.overlay = overlay;
const bc_minecraft_project_1 = require("bc-minecraft-project");
/**
 *
 * @param folder
 * @returns
 */
function getProject(folder, settings) {
    return overlay(bc_minecraft_project_1.MCProject.loadSync(folder), settings);
}
/**
 *
 * @param folder
 * @returns
 */
async function GetProjectAsync(folder, settings) {
    return bc_minecraft_project_1.MCProject.load(folder).then((project) => {
        return overlay(project, settings);
    });
}
/**
 *
 * @returns
 */
function getProjectEmpty(settings) {
    return overlay(bc_minecraft_project_1.MCProject.createEmpty(), settings);
}
/**
 *
 * @param project
 * @returns
 */
function overlay(project, settings) {
    overlayIf(project, 'education.enable', `${settings.Education.Enable}`);
    overlayIf(project, 'diagnostic.enable', `${settings.Diagnostics.Enable}`);
    overlayIf(project, 'diagnostic.lang', `${settings.Diagnostics.Lang}`);
    overlayIf(project, 'diagnostic.json', `${settings.Diagnostics.Json}`);
    overlayIf(project, 'diagnostic.mcfunction', `${settings.Diagnostics.Mcfunctions}`);
    overlayIf(project, 'diagnostic.objectives', `${settings.Diagnostics.Objectives}`);
    overlayIf(project, 'diagnostic.tags', `${settings.Diagnostics.Tags}`);
    overlayIf(project, 'completion.json', `${settings.Completion.JSON}`);
    overlayIf(project, 'completion.lang.comments', `${settings.Completion.Lang.Comments}`);
    overlayIf(project, 'completion.lang.dynamic', `${settings.Completion.Lang.Dynamic}`);
    return project;
}
function overlayIf(project, key, value) {
    if (project.attributes[key] === undefined)
        project.attributes[key] = value;
}
//# sourceMappingURL=mcprojects.js.map