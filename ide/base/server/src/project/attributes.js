"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEducationEnabled = IsEducationEnabled;
exports.IsDiagnosticsEnabled = IsDiagnosticsEnabled;
exports.IsDiagnosticsJsonEnabled = IsDiagnosticsJsonEnabled;
exports.IsDiagnosticsLangEnabled = IsDiagnosticsLangEnabled;
const interfaces_1 = require("./interfaces");
/**
 *
 * @param project
 * @returns
 */
function IsEducationEnabled(project) {
    if (interfaces_1.MCProjectprovider.is(project)) {
        project = project.configuration();
    }
    return project.attributes['education.enable'] === 'true';
}
/**
 *
 * @param project
 * @returns
 */
function IsDiagnosticsEnabled(project) {
    if (interfaces_1.MCProjectprovider.is(project)) {
        project = project.configuration();
    }
    return project.attributes['diagnostic.enable'] === 'true';
}
/**
 *
 * @param project
 * @returns
 */
function IsDiagnosticsJsonEnabled(project) {
    if (interfaces_1.MCProjectprovider.is(project)) {
        project = project.configuration();
    }
    return project.attributes['diagnostic.json'] === 'true';
}
/**
 *
 * @param project
 * @returns
 */
function IsDiagnosticsLangEnabled(project) {
    if (interfaces_1.MCProjectprovider.is(project)) {
        project = project.configuration();
    }
    return project.attributes['diagnostic.lang'] === 'true';
}
//# sourceMappingURL=attributes.js.map