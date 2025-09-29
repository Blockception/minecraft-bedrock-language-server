 
import { Internal } from "bc-minecraft-bedrock-project";
import { DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json";
import { diagnose_molang_syntax_current_document } from "../../molang";

export function diagnose_block_culling_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const rules = Json.LoadReport<Internal.ResourcePack.BlockCulling>(diagnoser);
  if (!Internal.ResourcePack.BlockCulling.is(rules)) return;
  diagnose_molang_syntax_current_document(diagnoser, rules);

  // TODO check block_culling document
}
