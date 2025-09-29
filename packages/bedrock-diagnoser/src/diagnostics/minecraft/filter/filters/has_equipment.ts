import { Minecraft } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder } from '../../../../types';
import { behaviorpack_item_diagnose } from '../../../behavior-pack/item';

export function diagnose_filter_has_equipment(filter: Minecraft.Filter.Filter, diagnoser: DiagnosticsBuilder) {
  const item = filter.value;

  if (!item || typeof item !== 'string') return;

  behaviorpack_item_diagnose(item, diagnoser);
}
