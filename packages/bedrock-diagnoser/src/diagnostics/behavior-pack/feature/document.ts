import { Internal } from "bc-minecraft-bedrock-project";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json";
import { no_other_duplicates } from "../../packs/duplicate-check";
import { behaviorpack_feature_diagnose } from "./diagnose";
import { is_block_defined } from "../block";
import { diagnose_structure_implementation } from "../structure";
import { diagnose_molang_syntax_current_document } from "../../molang";

/**
 * Diagnoses the given document as an item
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_feature_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const feature = Json.LoadReport<Internal.BehaviorPack.Feature>(diagnoser);
  if (!Internal.BehaviorPack.Feature.is(feature)) return;
  diagnose_molang_syntax_current_document(diagnoser, feature);

  const identifier = findFeatureIdentifier(feature);
  if (!identifier) return;

  const path = diagnoser.document.uri.split("/");
  if (
    !identifier.endsWith(
      path
        .slice(path.findIndex((v) => v == "features") + 1)
        .join("/")
        .replace(".json", "")
    )
  )
    diagnoser.add(
      identifier,
      `Feature identifier must match the relative path to the components up to and including the file name`,
      DiagnosticSeverity.error,
      "behaviorpack.components.identifier"
    );

  // check that no other exists with this id
  no_other_duplicates(
    "behaviorpack.components",
    diagnoser.context.getProjectData().projectData.behaviorPacks.features,
    identifier,
    diagnoser
  );

  const components = feature as Record<keyof Internal.BehaviorPack.Feature, any>;

  if (components["minecraft:aggregate_feature"])
    components["minecraft:aggregate_feature"].features?.forEach((id: string) => {
      behaviorpack_feature_diagnose(id, diagnoser);
    });

  if (components["minecraft:cave_carver_feature"])
    diagnose_block_reference(components["minecraft:cave_carver_feature"].fill_with, diagnoser);

  if (components["minecraft:fossil_feature"])
    diagnose_block_reference(components["minecraft:fossil_feature"].ore_block, diagnoser);

  if (components["minecraft:geode_feature"]) {
    diagnose_block_reference(components["minecraft:geode_feature"].filler, diagnoser);
    diagnose_block_reference(components["minecraft:geode_feature"].inner_layer, diagnoser);
    diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
    diagnose_block_reference(components["minecraft:geode_feature"].middle_layer, diagnoser);

    components["minecraft:geode_feature"].inner_placements?.forEach((id: string) => {
      diagnose_block_reference(id, diagnoser);
    });

    diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
    diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
    diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
    diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
    diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
  }

  if (components["minecraft:growing_plant_feature"]) {
    components["minecraft:growing_plant_feature"].body_blocks?.forEach((id: string) => {
      diagnose_block_reference(id, diagnoser);
    });

    components["minecraft:growing_plant_feature"].head_blocks?.forEach((id: string) => {
      diagnose_block_reference(id, diagnoser);
    });
  }

  if (components["minecraft:multiface_feature"]) {
    diagnose_block_reference(components["minecraft:multiface_feature"].places_block, diagnoser);
    diagnose_block_reference(components["minecraft:multiface_feature"].can_place_on, diagnoser);
  }

  if (components["minecraft:nether_cave_carver_feature"])
    diagnose_block_reference(components["minecraft:nether_cave_carver_feature"].fill_with, diagnoser);

  if (components["minecraft:ore_feature"])
    components["minecraft:ore_feature"].replace_rules?.forEach((entry: any) => {
      diagnose_block_reference(entry.places_block, diagnoser);
      entry.may_replace?.forEach((ref: any) => {
        diagnose_block_reference(ref, diagnoser);
      });
    });

  if (components["minecraft:partially_exposed_blob_feature"])
    diagnose_block_reference(components["minecraft:partially_exposed_blob_feature"].places_block, diagnoser);

  if (components["minecraft:scatter_feature"])
    behaviorpack_feature_diagnose(components["minecraft:scatter_feature"].places_feature, diagnoser);

  if (components["minecraft:search_feature"])
    behaviorpack_feature_diagnose(components["minecraft:search_feature"].places_feature, diagnoser);

  if (components["minecraft:search_feature"])
    components["minecraft:search_feature"].features?.forEach((id: string) => {
      behaviorpack_feature_diagnose(id, diagnoser);
    });

  if (components["minecraft:single_block_feature"]) {
    if (Array.isArray(components["minecraft:single_block_feature"].places_block))
      components["minecraft:single_block_feature"].places_block?.forEach((entry: string) => {
        diagnose_block_reference(entry, diagnoser);
      });
    else diagnose_block_reference(components["minecraft:single_block_feature"].places_block, diagnoser);
  }

  if (components["minecraft:snap_to_surface_feature"])
    behaviorpack_feature_diagnose(components["minecraft:snap_to_surface_feature"].feature_to_snap, diagnoser);

  if (components["minecraft:structure_template_feature"]) {
    if (typeof components["minecraft:structure_template_feature"].structure_name == "string")
      diagnose_structure_implementation(
        '"' + components["minecraft:structure_template_feature"].structure_name + '"',
        diagnoser
      );

    components["minecraft:structure_template_feature"].constraints?.block_intersection?.block_allowlist?.forEach(
      (id: string) => {
        diagnose_block_reference(id, diagnoser);
      }
    );

    components["minecraft:structure_template_feature"].constraints?.block_intersection?.block_whitelist?.forEach(
      (id: string) => {
        diagnose_block_reference(id, diagnoser);
      }
    );
  }

  if (components["minecraft:surface_relative_threshold_feature"])
    behaviorpack_feature_diagnose(
      components["minecraft:surface_relative_threshold_feature"].feature_to_place,
      diagnoser
    );

  //TODO Tree components

  if (components["minecraft:underwater_cave_carver_feature"]) {
    diagnose_block_reference(components["minecraft:underwater_cave_carver_feature"].fill_with, diagnoser);
    diagnose_block_reference(components["minecraft:underwater_cave_carver_feature"].replace_air_with, diagnoser);
  }

  if (components["minecraft:vegetation_patch_feature"]) {
    components["minecraft:vegetation_patch_feature"].replaceable_blocks?.forEach((id: string) => {
      diagnose_block_reference(id, diagnoser);
    });

    diagnose_block_reference(components["minecraft:vegetation_patch_feature"].ground_block, diagnoser);
    behaviorpack_feature_diagnose(components["minecraft:vegetation_patch_feature"].vegetation_feature, diagnoser);
  }

  if (components["minecraft:weighted_random_feature"]) {
    components["minecraft:weighted_random_feature"].features?.forEach((entry: string) => {
      behaviorpack_feature_diagnose(entry[0], diagnoser);
    });
  }
}

function findFeatureIdentifier(source: Internal.BehaviorPack.Feature): string | undefined {
  for (const key in source) {
    if (key != "format_version") return (source as any)[key]?.description?.identifier;
  }
  return undefined;
}

function diagnose_block_reference(reference: string | any, diagnoser: DocumentDiagnosticsBuilder) {
  if (typeof reference == "string") is_block_defined(reference, diagnoser);
  else if (typeof reference.name == "string") is_block_defined(reference.name, diagnoser);
}
