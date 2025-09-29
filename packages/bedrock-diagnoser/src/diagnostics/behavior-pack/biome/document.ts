import { Internal } from "bc-minecraft-bedrock-project";
import { getUsedComponents } from "bc-minecraft-bedrock-types/src/minecraft/components";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../types";
import { Context } from "../../../utility/components";
import { Json } from "../../json";
import { no_other_duplicates } from "../../packs/duplicate-check";
import { behaviorpack_biome_components_dependencies } from "./components/dependencies";
import { behaviorpack_diagnose_biome_components } from "./components/diagnose";
import { FormatVersion } from 'bc-minecraft-bedrock-types/src/minecraft';

/**Diagnoses the given document as an bp biome
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_biome_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const biome = Json.LoadReport<Internal.BehaviorPack.Biome>(diagnoser);
  if (!Internal.BehaviorPack.Biome.is(biome)) return;

  const identifier = biome["minecraft:biome"].description.identifier;
  const context: Context<Internal.BehaviorPack.Biome> = {
    source: biome,
    components: getUsedComponents(biome["minecraft:biome"]),
  };

  behaviorpack_diagnose_biome_components(biome["minecraft:biome"], context, diagnoser);
  behaviorpack_biome_components_dependencies(biome, context, diagnoser);

  // check that no other exists with this id
  no_other_duplicates(
    "behaviorpack.biome",
    diagnoser.context.getProjectData().projectData.behaviorPacks.biomes,
    identifier,
    diagnoser
  );

  try {
      if (FormatVersion.isLessThan(biome.format_version as FormatVersion, [1, 21, 110])) {
        diagnoser.add(
          "format_version",
          `Server side biome JSON files should be version 1.21.110 or higher`,
          DiagnosticSeverity.error,
          "behaviorpack.biome.min_version"
        );
      }
       
    } catch (err) {
      // Leaving empty as the base diagnoser should flag an invalid format version
    }

}