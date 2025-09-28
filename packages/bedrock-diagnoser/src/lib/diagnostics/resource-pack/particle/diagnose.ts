import { Types } from "bc-minecraft-bedrock-types";
import { Errors } from "../..";
import { DiagnosticsBuilder } from "../../../../main";

export function particle_is_defined(id: string | Types.OffsetWord, diagnoser: DiagnosticsBuilder): void {
  const strId = typeof id === "string" ? id : id.text;

  //Project has particle
  const particle = diagnoser.context.getProjectData().resources.particles.get(strId, diagnoser.project);
  if (particle === undefined) {
    return Errors.missing("behaviors", "animations", strId, diagnoser, id);
  }
}
