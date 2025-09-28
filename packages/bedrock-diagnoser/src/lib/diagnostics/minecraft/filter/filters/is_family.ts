import { Minecraft } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder, DiagnosticSeverity } from "../../../../types";
import { minecraft_family_diagnose } from "../../family";

export function diagnose_filter_is_family(filter: Minecraft.Filter.Filter, diagnoser: DiagnosticsBuilder) {
  const family = filter.value;

  if (!family) {
    return diagnoser.add(
      "test/is_family",
      "Family is not defined",
      DiagnosticSeverity.error,
      "minecraft.filter.is_family.type"
    );
  }

  if (typeof family !== "string") {
    return diagnoser.add(
      `test/is_family/${family}`,
      "Family is not defined",
      DiagnosticSeverity.error,
      "minecraft.filter.is_family.type"
    );
  }

  minecraft_family_diagnose(family, diagnoser);
}
