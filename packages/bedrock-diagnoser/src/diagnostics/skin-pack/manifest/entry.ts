import { Manifest } from "bc-minecraft-bedrock-project/src/internal/types";
import { DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json/json";
import { minecraft_manifest_diagnose, minecraft_manifest_required_module } from "../../minecraft/manifest";

/**Diagnoses the given document as an bp manifest
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function Diagnose(diagnoser: DocumentDiagnosticsBuilder): void {
  const manifest = Json.LoadReport<Manifest>(diagnoser);

  //check if manifest is valid
  if (!Json.TypeCheck(manifest, diagnoser, "manifest", "minecraft.manifest.invalid", Manifest.is)) return;

  minecraft_manifest_diagnose(manifest, diagnoser);
  minecraft_manifest_required_module(manifest, diagnoser, "skin_pack");
}
