import { Types } from "bc-minecraft-bedrock-types";
import { Errors } from "../..";
import { DiagnosticsBuilder } from "../../../types";

export function diagnose_resourcepack_sounds(data: Types.Definition | undefined, diagnoser: DiagnosticsBuilder): void {
  if (data === undefined) return;

  const resources = diagnoser.context.getProjectData().resources;
  Types.Definition.forEach(data, (ref, id) => {
    const sound = resources.sounds.get(id, diagnoser.project);
    if (sound === undefined) {
      Errors.missing("resources", "sounds", ref + "/" + id, diagnoser);
    }
  });
}

export function diagnose_resourcepack_sound(id: string | undefined, diagnoser: DiagnosticsBuilder): void {
  if (id === undefined) return;

  const pdata = diagnoser.context.getProjectData().resources.sounds.get(id, diagnoser.project);
  if (pdata === undefined) {
    Errors.missing("resources", "sounds", id, diagnoser);
  }
}
