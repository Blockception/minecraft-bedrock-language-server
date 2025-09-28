"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_feature_rules_document = diagnose_feature_rules_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const types_1 = require("../../../types");
const json_1 = require("../../json");
const duplicate_check_1 = require("../../packs/duplicate-check");
const diagnose_1 = require("../feature/diagnose");
const molang_1 = require("../../molang");
const filter_1 = require("../../minecraft/filter");
/**
 * Diagnoses the given document as an feature rule
 * @param diagnoser The diagnoser builder to receive the errors
 */
function diagnose_feature_rules_document(diagnoser) {
    var _a;
    const featureRule = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.FeatureRule.is(featureRule))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, featureRule);
    const identifier = featureRule["minecraft:feature_rules"].description.identifier;
    // check that no other exists with this id
    (0, duplicate_check_1.no_other_duplicates)("behaviorpack.components", diagnoser.context.getProjectData().projectData.behaviorPacks.features_rules, identifier, diagnoser);
    const pass = featureRule["minecraft:feature_rules"].conditions.placement_pass;
    const feature = featureRule["minecraft:feature_rules"].description.places_feature;
    if ((0, diagnose_1.behaviorpack_feature_diagnose)(feature, diagnoser) && pass == "pregeneration_pass") {
        const type = (_a = diagnoser.context.getProjectData().projectData.behaviorPacks.features.get(feature)) === null || _a === void 0 ? void 0 : _a.type;
        if (type && !type.includes("carver"))
            diagnoser.add(feature, pass + " is reserved for carver features", types_1.DiagnosticSeverity.error, "behaviorpack.features_rules.pregeneration_pass");
    }
    (0, filter_1.minecraft_diagnose_filters)(featureRule['minecraft:feature_rules'].conditions['minecraft:biome_filter'], diagnoser);
}
//# sourceMappingURL=document.js.map