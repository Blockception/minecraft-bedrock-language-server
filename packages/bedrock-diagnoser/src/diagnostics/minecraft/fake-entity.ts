import { DiagnosticsBuilder, DiagnosticSeverity } from "../../types";
import { Types } from "bc-minecraft-bedrock-types";
import { Text } from "bc-minecraft-bedrock-project";

export function minecraft_fakentity_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void {
  const data = diagnoser.context.getProjectData().projectData;
  const id = Text.UnQuote(value.text);

  //Project has defined
  if (data.general.fakeEntities.has(id)) return;

  //Nothing then report error
  diagnoser.add(
    value,
    `Cannot find fake entity definition: ${id}`,
    DiagnosticSeverity.error,
    "minecraft.fakeentity.missing"
  );
}
