import { DefinitionItem } from "bc-minecraft-bedrock-project";
import { DiagnosticSeverity, DiagnosticsBuilder } from "../../../types";

export function diagnose_block_culling_geo_and_rules(geoId: string, cullingId: string, diagnoser: DiagnosticsBuilder) {
  const resources = diagnoser.context.getProjectData().resources;
  const modelItem = resources.models.get(geoId, diagnoser.project);
  const cullingRuleItem = resources.block_culling_rules.get(cullingId, diagnoser.project);

  if (!modelItem || DefinitionItem.is(modelItem)) return;
  if (!cullingRuleItem || DefinitionItem.is(cullingRuleItem)) return;
  const model = modelItem.item;
  const cullingRule = cullingRuleItem.item;

  // Affected bones need to be defined
  cullingRule.affected_bones.defined.forEach((bone) => {
    if (Array.isArray(model.bones)) {
      if (model.bones.includes(bone)) return;
    } else {
      if (model.bones.defined.has(bone)) return;
    }

    diagnoser.add(
      cullingId,
      `The geometry '${geoId}' does not contain the bone '${bone}' as defined in the culling rule '${cullingId}'`,
      DiagnosticSeverity.warning,
      "resourcepack.block_culling.missing_bone"
    );
  });
}
