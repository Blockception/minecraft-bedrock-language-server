import { DiagnosticsBuilder } from '../../../types';
import { Errors } from '../..';

export function behaviorpack_item_catalog_diagnose(id: string, diagnoser: DiagnosticsBuilder): boolean {
  const feat = diagnoser.context.getProjectData().behaviors.itemGroups.get(id, diagnoser.project);
  if (feat === undefined) {
    Errors.missing('behaviors', 'itemGroups', id, diagnoser);
    return false;
  }

  return true;
}
