import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';
import { check_definition_value } from '../definitions';
import { OffsetWord } from '@blockception/packages-shared';

export function minecraft_objectives_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): boolean {
  if (diagnoser.project.attributes['diagnostic.objective'] === 'false') {
    return true;
  }

  //Length check
  const id = value.text;

  if (!/^[a-zA-Z0-9\-_.:]+$/gim.test(id)) {
    diagnoser.add(
      value,
      `Illegal character found in objective: '${id}'.`,
      DiagnosticSeverity.error,
      'minecraft.objective.invalid',
    );
  }

  //Defined in McProject
  if (check_definition_value(diagnoser.project.definitions.objective, id, diagnoser)) {
    return true;
  }

  //Project has defined
  const data = diagnoser.context.getProjectData().projectData;
  if (data.general.objectives.has(id)) {
    return true;
  }

  //Nothing then report error
  diagnoser.add(
    value,
    `Cannot find objective definition: ${id}`,
    DiagnosticSeverity.error,
    'minecraft.objective.missing',
  );
  return false;
}
