import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../types';
import { Errors } from '../..';

/**Checks if the biome exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
export function is_biome_defined(id: string, diagnoser: DiagnosticsBuilder, namespace_required = false): boolean {
  if (namespace_required && id.split(':').length == 1)
    diagnoser.add(
      id,
      'A namespace is required to reference the biome',
      DiagnosticSeverity.error,
      'behaviorpack.biome.namespace_required',
    );

  //Project has biome
  const anim = diagnoser.context.getProjectData().behaviors.biomes.get(id, diagnoser.project);
  if (anim === undefined) {
    Errors.missing('behaviors', 'biomes', id, diagnoser);
    return false;
  }
  return true;
}
