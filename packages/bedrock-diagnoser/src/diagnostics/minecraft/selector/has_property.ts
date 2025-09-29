import { Entity } from "bc-minecraft-bedrock-project/src/project/behavior-pack";
import { Types } from "bc-minecraft-bedrock-types";
import { CompactJson } from "bc-minecraft-bedrock-types/src/minecraft/json";
import { Minecraft } from "bc-minecraft-bedrock-types";
import { DiagnosticSeverity, DiagnosticsBuilder } from "../../../types";
import { NoopDiagnoser } from "../../../types/noop";
import { general_range_float_diagnose, general_range_integer_diagnose } from "../../general";

export function minecraft_selector_has_property_diagnose(
  attr: CompactJson.IKeyNode,
  sel: Minecraft.Selector.Selector,
  diagnoser: DiagnosticsBuilder
): boolean {
  let result = true;
  if (!CompactJson.isObject(attr)) {
    const type = CompactJson.Type[attr.type];

    diagnoser.add(
      CompactJson.toOffsetWord(attr),
      `Expected a object, not a ${type}`,
      DiagnosticSeverity.error,
      "minecraft.selector.has_property.type"
    );

    return false;
  }

  attr.value.forEach((item) => {
    result = entity_has_property(item, diagnoser) && result;
  });

  return result;
}

function entity_has_property(attr: CompactJson.IKeyNode, diagnoser: DiagnosticsBuilder): boolean {
  if (!CompactJson.isString(attr)) {
    const type = CompactJson.Type[attr.type];

    diagnoser.add(
      CompactJson.toOffsetWord(attr),
      `Can't handle ${type}, needs to be a string/boolean/number`,
      DiagnosticSeverity.error,
      "minecraft.selector.has_property.type"
    );
    return false;
  }

  const entityData = diagnoser.context.getProjectData().projectData.behaviorPacks.entities;
  const key = Types.OffsetWord.create(attr.key, attr.offset);
  const value = CompactJson.valueToOffsetWord(attr);

  let entities: Array<Entity.Entity> = [];
  entityData.forEach((entity) => {
    if (entity.properties.some((item) => item.name === key.text)) {
      entities.push(entity);
    }
  });

  // Filter on only entities match on type
  if (entities.length > 1) {
    entities = entities.filter((item) =>
      item.properties.some((item) => {
        switch (item.type) {
          case "bool":
            return value.text === "true" || value.text === "false";
          case "float":
            const frange = { min: item.range[0], max: item.range[1] };
            return general_range_float_diagnose(value, new NoopDiagnoser(diagnoser), frange);
          case "int":
            const irange = { min: item.range[0], max: item.range[1] };
            return general_range_integer_diagnose(value, new NoopDiagnoser(diagnoser), irange);
          case "enum":
            return item.values.includes(value.text);
        }
      })
    );
  }

  if (entities.length === 0) {
    diagnoser.add(
      key,
      `No entity has the property '${key.text}'`,
      DiagnosticSeverity.error,
      "minecraft.selector.has_property.notfound"
    );
    return false;
  }

  return true;
}
