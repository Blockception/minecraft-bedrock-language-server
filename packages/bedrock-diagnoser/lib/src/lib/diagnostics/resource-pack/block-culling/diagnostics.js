"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_block_culling_geo_and_rules = diagnose_block_culling_geo_and_rules;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const types_1 = require("../../../types");
function diagnose_block_culling_geo_and_rules(geoId, cullingId, diagnoser) {
    const resources = diagnoser.context.getProjectData().resources;
    const modelItem = resources.models.get(geoId, diagnoser.project);
    const cullingRuleItem = resources.block_culling_rules.get(cullingId, diagnoser.project);
    if (!modelItem || bc_minecraft_bedrock_project_1.DefinitionItem.is(modelItem))
        return;
    if (!cullingRuleItem || bc_minecraft_bedrock_project_1.DefinitionItem.is(cullingRuleItem))
        return;
    const model = modelItem.item;
    const cullingRule = cullingRuleItem.item;
    // Affected bones need to be defined
    cullingRule.affected_bones.defined.forEach((bone) => {
        if (Array.isArray(model.bones)) {
            if (model.bones.includes(bone))
                return;
        }
        else {
            if (model.bones.defined.has(bone))
                return;
        }
        diagnoser.add(cullingId, `The geometry '${geoId}' does not contain the bone '${bone}' as defined in the culling rule '${cullingId}'`, types_1.DiagnosticSeverity.warning, "resourcepack.block_culling.missing_bone");
    });
}
//# sourceMappingURL=diagnostics.js.map