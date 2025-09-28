import { General, Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder, DiagnosticSeverity } from "../../types";

export function general_string_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder) {
  if (General.String.is(value.text)) return;

  diagnoser.add(value, `Invalid minecraft string: '${value.text}'`, DiagnosticSeverity.error, "general.string.invalid");
}
