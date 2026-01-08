import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';
import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { Text } from 'bc-minecraft-bedrock-project';
import { check_definition_value } from '../definitions';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';

/**
 *
 * @param value
 * @param diagnoser
 * @returns True if the family was found in an entity
 */
export function minecraft_family_diagnose(value: OffsetWord | string, diagnoser: DiagnosticsBuilder): boolean {
  const id = Text.UnQuote(typeof value === 'string' ? value : value.text);

  //Defined in McProject
  if (check_definition_value(diagnoser.project.definitions.family, id, diagnoser)) return true;

  let out = false;

  const data = diagnoser.context.getProjectData().projectData;
  //Project has defined
  data.behaviorPacks.entities.forEach((entity) => {
    if (entity.families.defined.has(id)) out = true;
  });

  if (out) return true;

  //Vanilla has defined
  if (MinecraftData.General.Entities.families.includes(id)) return true;

  //Nothing then report error
  diagnoser.add(value, `Cannot find family definition: ${id}`, DiagnosticSeverity.error, 'minecraft.family.missing');
  return false;
}
