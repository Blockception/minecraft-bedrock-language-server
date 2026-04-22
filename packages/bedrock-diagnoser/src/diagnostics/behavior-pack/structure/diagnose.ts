import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { Text } from 'bc-minecraft-bedrock-project';
import { Errors } from '../..';
import { DiagnosticsBuilder } from '../../../types';
import { check_definition_value } from '../../definitions';

export function diagnose_structure_implementation(
  id: OffsetWord | string,
  diagnoser: DiagnosticsBuilder,
): boolean {
  const strId = Text.UnQuote(typeof id === 'string' ? id : id.text);

  const data = diagnoser.context.getProjectData().projectData;

  // Check general structures (vanilla etc.)
  if (data.general.structures.has(strId)) return true;

  // Check project-defined structures
  const struc = diagnoser.context.getProjectData().behaviors.structures.get(strId, diagnoser.project);
  if (struc !== undefined) return true;

  // Check definitions (from project configuration)
  if (check_definition_value(diagnoser.project.definitions.structure, strId, diagnoser)) return true;

  // Check behavior pack structures collection
  if (data.behaviorPacks.structures.has(strId)) return true;

  //Nothing then report error
  Errors.missing('behaviors', 'structures', strId, diagnoser, id);
  return false;
}
