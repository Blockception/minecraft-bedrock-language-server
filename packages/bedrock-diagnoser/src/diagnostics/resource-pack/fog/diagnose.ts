import { Errors } from "../..";
import { DiagnosticsBuilder } from "../../..";

export function fog_is_defined(id: string, diagnoser: DiagnosticsBuilder): boolean {
  //Project has fog
  const fog = diagnoser.context.getProjectData().resources.fogs.get(id, diagnoser.project);
  if (fog === undefined) {
    Errors.missing("resources", "fogs", id, diagnoser);
    return false;
  }
  return true;
}
