import { Errors } from "../..";
import { DiagnosticsBuilder } from "../../../types";

export function model_is_defined(modelId: string, diagnoser: DiagnosticsBuilder): boolean {
  //Project has model
  const model = diagnoser.context.getProjectData().resources.models.get(modelId, diagnoser.project);
  if (model === undefined) {
    Errors.missing("resources", "models", modelId, diagnoser);
    return false;
  }
  return true;
}
