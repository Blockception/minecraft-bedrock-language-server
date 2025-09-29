import { Internal } from 'bc-minecraft-bedrock-project';
import { DiagnosticsBuilder } from '../../../../types';
import { components_dependencies, Context, DependedMap } from '../../../../utility/components';

//Map of components that are depended on all other specified components
const component_dependents_all: DependedMap = {};

//Map of components that are depended on one of the other specified components
const component_dependents_any: DependedMap = {};

/**
 * Checks if components dependencies are present, a component might need others to be present
 * @param block The entity to check
 * @param diagnoser The diagnoser to report to*/
export function behaviorpack_block_components_dependencies(
  block: Internal.BehaviorPack.Block,
  context: Context<Internal.BehaviorPack.Block>,
  diagnoser: DiagnosticsBuilder,
): void {
  components_dependencies('block', context, diagnoser, component_dependents_all, component_dependents_any);
}
