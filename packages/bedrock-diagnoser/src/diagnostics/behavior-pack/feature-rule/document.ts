import { Internal } from "bc-minecraft-bedrock-project";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json";
import { no_other_duplicates } from "../../packs/duplicate-check";
import { behaviorpack_feature_diagnose } from "../feature/diagnose";
import { diagnose_molang_syntax_current_document } from "../../molang";
import { minecraft_diagnose_filters } from '../../minecraft/filter';

/**
 * Diagnoses the given document as an feature rule
 * @param diagnoser The diagnoser builder to receive the errors
 */
export function diagnose_feature_rules_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const featureRule = Json.LoadReport<Internal.BehaviorPack.FeatureRule>(diagnoser);
  if (!Internal.BehaviorPack.FeatureRule.is(featureRule)) return;
  diagnose_molang_syntax_current_document(diagnoser, featureRule);

  const identifier = featureRule["minecraft:feature_rules"].description.identifier;

  // check that no other exists with this id
  no_other_duplicates(
    "behaviorpack.components",
    diagnoser.context.getProjectData().projectData.behaviorPacks.features_rules,
    identifier,
    diagnoser
  );

  const pass = featureRule["minecraft:feature_rules"].conditions.placement_pass;
  const feature = featureRule["minecraft:feature_rules"].description.places_feature;

  if (behaviorpack_feature_diagnose(feature, diagnoser) && pass == "pregeneration_pass") {
    const type = diagnoser.context.getProjectData().projectData.behaviorPacks.features.get(feature)?.type;
    if (type && !type.includes("carver"))
      diagnoser.add(
        feature,
        pass + " is reserved for carver features",
        DiagnosticSeverity.error,
        "behaviorpack.features_rules.pregeneration_pass"
      );
  }

  minecraft_diagnose_filters(featureRule['minecraft:feature_rules'].conditions['minecraft:biome_filter'], diagnoser);
}
