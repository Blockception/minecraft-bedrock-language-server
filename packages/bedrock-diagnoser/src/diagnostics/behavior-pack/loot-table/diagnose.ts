import { Types } from 'bc-minecraft-bedrock-types';
import { Errors } from '../..';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../types';

export function behaviorpack_loot_table_diagnose(
  value: Types.OffsetWord | string,
  diagnoser: DiagnosticsBuilder,
): boolean {
  const id = typeof value === 'string' ? value : value.text;

  if (has_loot_table(id, diagnoser)) {
    return true;
  }
  return false;
}

export function behaviorpack_loot_table_short_diagnose(
  value: Types.OffsetWord | string,
  diagnoser: DiagnosticsBuilder,
) {
  let id = typeof value === 'string' ? value : value.text;

  //Strip ""
  if (id.startsWith('"')) {
    id = id.slice(1);
  }
  if (id.endsWith('"')) {
    id = id.slice(0, -1);
  }
  if (!id.startsWith('loot_tables/')) {
    id = 'loot_tables/' + id;
  }
  if (!id.endsWith('.json')) {
    id = id + '.json';
  }

  if (has_loot_table(id, diagnoser)) {
    return true;
  }

  diagnoser.add(
    value,
    `Cannot find behaviorpack loot_table definition: ${id}`,
    DiagnosticSeverity.error,
    'behaviorpack.loot_table.missing',
  );
  return false;
}

function has_loot_table(id: string, diagnoser: DiagnosticsBuilder): boolean {
  //Project has loot table
  const table = diagnoser.context.getProjectData().behaviors.loot_tables.get(id, diagnoser.project);
  if (table === undefined) {
    Errors.missing('behaviors', 'loot_tables', id, diagnoser);
    return false;
  }

  return true;
}
