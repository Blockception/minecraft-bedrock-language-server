import { Internal } from 'bc-minecraft-bedrock-project';
import { DiagnosticsBuilder } from '../../../../types';
import { components_dependencies, Context, DependedMap } from '../../../../utility/components';

//Map of components that are depended on all other specified components
const component_dependents_all: DependedMap = {
  'minecraft:food': ['minecraft:use_modifiers'],
  'minecraft:shooter': ['minecraft:projectile'],
  'minecraft:throwable': ['minecraft:projectile'],
  'minecraft:bundle_interaction': ['minecraft:storage_item'],
  'minecraft:storage_item': ['minecraft:bundle_interaction'],
};

//Map of components that are depended on one of the other specified components
const component_dependents_any: DependedMap = {};

/**
 * Checks if components dependencies are present, a component might need others to be present
 * @param item The item to check
 * @param diagnoser The diagnoser to report to*/
export function behaviorpack_item_components_dependencies(
  item: Internal.BehaviorPack.Item,
  context: Context<Internal.BehaviorPack.Item>,
  diagnoser: DiagnosticsBuilder,
): void {
  components_dependencies('item', context, diagnoser, component_dependents_all, component_dependents_any);
}
