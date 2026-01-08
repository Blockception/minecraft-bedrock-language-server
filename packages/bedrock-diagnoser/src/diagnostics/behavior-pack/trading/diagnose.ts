import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { Errors } from '../..';
import { DiagnosticsBuilder } from '../../../types';

export function diagnose_trading_implementation(id: OffsetWord | string, diagnoser: DiagnosticsBuilder): boolean {
  const strId = typeof id === 'string' ? id : id.text;

  //Project has trading
  const anim = diagnoser.context.getProjectData().behaviors.trading.get(strId, diagnoser.project);
  if (anim === undefined) {
    Errors.missing('behaviors', 'trading', strId, diagnoser, id);
    return false;
  }

  return true;
}
