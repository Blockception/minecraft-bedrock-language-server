"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_manifest_diagnose = minecraft_manifest_diagnose;
exports.minecraft_manifest_header_diagnose = minecraft_manifest_header_diagnose;
exports.minecraft_manifest_required_module = minecraft_manifest_required_module;
exports.minecraft_manifest_version = minecraft_manifest_version;
const types_1 = require("../../types");
function minecraft_manifest_diagnose(m, diagnoser) {
    var _a;
    minecraft_manifest_header_diagnose(m.header, diagnoser);
    (_a = m.modules) === null || _a === void 0 ? void 0 : _a.forEach((m) => {
        minecraft_manifest_version(m.version, diagnoser, "modules/version");
    });
}
function minecraft_manifest_header_diagnose(m, diagnoser) {
    //Version check
    minecraft_manifest_version(m.version, diagnoser, "header/version");
}
/**
 *
 * @param m
 * @param diagnoser
 * @param required_type
 * @returns
 */
function minecraft_manifest_required_module(m, diagnoser, ...required_type) {
    const modules = m.modules;
    if (modules) {
        for (let I = 0; I < modules.length; I++) {
            const module = modules[I];
            if (typeof module.type === "string" && required_type.includes(module.type))
                return true;
        }
    }
    //No correct module found
    diagnoser.add("modules", "This manifest is required to have the following module type one of " + required_type.join(", "), types_1.DiagnosticSeverity.error, "minecraft.manifest.module.missing");
    return false;
}
function minecraft_manifest_version(version, diagnoser, path) {
    if (typeof version == "string") {
        if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(version))
            diagnoser.add(path, "Version string needs to match semver", types_1.DiagnosticSeverity.error, "minecraft.manifest.version.invalid");
        return;
    }
    if (version.length != 3) {
        diagnoser.add(path, "The version number needs to be an array of 3 items", types_1.DiagnosticSeverity.error, "minecraft.manifest.version.invalid");
    }
    if (version[0] < 1) {
        diagnoser.add(`${path}/${version[0]}`, "By convention, the version numbering needs to be atleast [1, 0, 0]", types_1.DiagnosticSeverity.warning, "minecraft.manifest.version.minimum");
    }
}
//# sourceMappingURL=manifest.js.map