import { Internal } from 'bc-minecraft-bedrock-project';
import { DocumentDiagnosticsBuilder } from '../../../types';
import { Json } from '../../json';
import { lint_check_fog_naming, lint_check_identity_format, lint_check_namespace } from '../../lint';
import { diagnose_molang_syntax_current_document } from '../../molang';

/**Diagnoses the given document as a fog
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_fog_document(diagnoser: DocumentDiagnosticsBuilder): void {
  //TODO add rp diagnostics
  const fog = Json.LoadReport<Internal.ResourcePack.Fog>(diagnoser);
  if (!Internal.ResourcePack.Fog.is(fog)) return;
  diagnose_molang_syntax_current_document(diagnoser, fog);

  const identifier = fog['minecraft:fog_settings'].description.identifier;

  // Run configurable lint checks for identity format, namespace, and fog naming
  lint_check_identity_format(identifier, diagnoser);
  lint_check_namespace(identifier, diagnoser);
  lint_check_fog_naming(identifier, diagnoser);
}
