"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_manifest = diagnose_manifest;
const types_1 = require("bc-minecraft-bedrock-project/lib/src/internal/types");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_2 = require("../../../types");
const json_1 = require("../../json/json");
const manifest_1 = require("../../minecraft/manifest");
/**
 * Diagnoses the given document as an bp manifest
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_manifest(diagnoser) {
    const manifest = json_1.Json.LoadReport(diagnoser);
    if (!json_1.Json.TypeCheck(manifest, diagnoser, "manifest", "minecraft.manifest.invalid", types_1.Manifest.is))
        return;
    (0, manifest_1.minecraft_manifest_diagnose)(manifest, diagnoser);
    (0, manifest_1.minecraft_manifest_required_module)(manifest, diagnoser, "data", "javascript", "script");
    //BP specific
    check_min_engine_version(manifest.header.min_engine_version, diagnoser);
}
function check_min_engine_version(version, diagnoser) {
    const pack = diagnoser.context.getProjectData().projectData.behaviorPacks.get(diagnoser.document);
    /**No pack then skip */
    if (pack === undefined)
        return;
    /**Only need to check if there are functions */
    if (pack.functions.count() === 0)
        return;
    if (version !== undefined) {
        if (bc_minecraft_bedrock_types_1.Types.Version.compare(version, { major: 1, minor: 8, patch: 0 }) >= 0)
            return;
    }
    return diagnoser.add("header", "Behaviorpacks with mcfunctions need `min_engine_version` of at-least value: '1.8.0'", types_2.DiagnosticSeverity.error, "behaviorpack.manifest.min_engine_version");
}
//# sourceMappingURL=document.js.map