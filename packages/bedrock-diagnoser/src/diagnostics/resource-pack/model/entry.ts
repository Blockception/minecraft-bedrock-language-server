import { DocumentDiagnosticsBuilder } from '../../../types';
import { Internal } from 'bc-minecraft-bedrock-project';
import { Json } from '../../json';
import { lint_check_model_naming } from '../../lint';

/**Diagnoses the given document as a model
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_model_document(diagnoser: DocumentDiagnosticsBuilder): void {
  //Load model
  const model = Json.LoadReport<Internal.ResourcePack.Model>(diagnoser);
  if (!Internal.ResourcePack.Model.is(model)) return;

  // For modern models, validate each geometry identifier
  if (Internal.ResourcePack.ModelModern.is(model)) {
    model['minecraft:geometry'].forEach((spec) => {
      if (Internal.ResourcePack.ModelModernSpec.is(spec)) {
        lint_check_model_naming(spec.description.identifier, diagnoser);
      }
    });
  }

  // TODO model check, parents
}
