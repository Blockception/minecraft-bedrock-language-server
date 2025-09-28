import { Minecraft } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder, DiagnosticSeverity } from "../../../../types";
import { diagnose_entity_property_usage } from "../../../behavior-pack/entity/properties";

export function diagnose_filter_property(filter: Minecraft.Filter.Filter, diagnoser: DiagnosticsBuilder) {
  const { domain, value, test } = filter;

  if (!domain) return;

  const entities = diagnoser.context.getProjectData().projectData.behaviorPacks.entities;

  let diagnosed = false;

  entities.forEach((entity) => {
    if (entity.properties) {
      const property = entity.properties.find((property) => property.name === domain);
      if (property) {
        if (test.replace("_property", "") != property.type)
          diagnoser.add(
            "filters/" + property.name,
            `Property type ${property.type} does not match filter ${filter.test}`,
            DiagnosticSeverity.warning,
            "behaviorpack.entity.property.filter_mismatch"
          );
        diagnose_entity_property_usage([property], domain, value as string | number | boolean, "filter", diagnoser);
        diagnosed = true;
      }
    }
  });

  // If no definition for it is found in any entity
  if (!diagnosed)
    diagnoser.add(
      `$filters/${domain}`,
      `Entity property definition for "${domain}" not found`,
      DiagnosticSeverity.error,
      "behaviorpack.entity.property.unknown_property"
    );
}
