import { Errors } from '../..';
import { DiagnosticsBuilder } from '../../../types';

export function behaviorpack_featurerule_diagnose(id: string, diagnoser: DiagnosticsBuilder): boolean {
  const rules = diagnoser.context.getProjectData().behaviors.features_rules.get(id, diagnoser.project);
  if (rules === undefined) {
    Errors.missing('behaviors', 'features_rules', id, diagnoser);
    return false;
  }

  return false;
}
