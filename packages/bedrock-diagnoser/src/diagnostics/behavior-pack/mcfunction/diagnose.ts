import { Text } from 'bc-minecraft-bedrock-project';

import { Errors } from '../..';
import { DiagnosticsBuilder } from '../../../types';

export function mcfunction_is_defined(value: OffsetWord, diagnoser: DiagnosticsBuilder): boolean {
  const id = Text.UnQuote(value.text);

  //Project has mcfunction
  const fn = diagnoser.context.getProjectData().behaviors.functions.get(id, diagnoser.project);
  if (fn === undefined) {
    Errors.missing('behaviors', 'trading', id, diagnoser, value);
    return false;
  }

  return true;
}
