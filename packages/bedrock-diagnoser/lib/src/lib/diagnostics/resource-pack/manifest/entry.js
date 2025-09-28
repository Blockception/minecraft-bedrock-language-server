"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_manifest_document = diagnose_manifest_document;
const types_1 = require("bc-minecraft-bedrock-project/lib/src/internal/types");
const json_1 = require("../../json/json");
const manifest_1 = require("../../minecraft/manifest");
/**Diagnoses the given document as a manifest
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_manifest_document(diagnoser) {
    const manifest = json_1.Json.LoadReport(diagnoser);
    if (!json_1.Json.TypeCheck(manifest, diagnoser, "manifest", "minecraft.manifest.invalid", types_1.Manifest.is))
        return;
    (0, manifest_1.minecraft_manifest_diagnose)(manifest, diagnoser);
    (0, manifest_1.minecraft_manifest_required_module)(manifest, diagnoser, "resources");
}
//# sourceMappingURL=entry.js.map