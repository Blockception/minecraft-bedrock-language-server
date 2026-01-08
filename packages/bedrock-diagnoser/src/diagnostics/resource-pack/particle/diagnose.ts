import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { Errors } from '../..';
import { DiagnosticsBuilder } from '../../..';

export function particle_is_defined(id: string | OffsetWord, diagnoser: DiagnosticsBuilder): void {
  const strId = typeof id === 'string' ? id : id.text;

  //Project has particle
  const particle = diagnoser.context.getProjectData().resources.particles.get(strId, diagnoser.project);
  if (particle === undefined) {
    return Errors.missing('behaviors', 'animations', strId, diagnoser, id);
  }
}
