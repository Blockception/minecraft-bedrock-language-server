import { ComponentBehavior, ComponentContainer } from 'bc-minecraft-bedrock-types/src/minecraft/components';
import { DiagnosticsBuilder } from '../../../..';
import { minecraft_diagnose_filters } from '../../../minecraft/filter/diagnose';

type Container = ComponentBehavior & { events?: Record<string, any> } & { filters?: any };

/**
 *
 * @param container
 * @param diagnoser
 * @returns
 */
export function behaviorpack_entity_components_filters(
  container: Container | undefined,
  diagnoser: DiagnosticsBuilder,
) {
  if (container === undefined) return;

  // Components
  if (container.components) {
    traverse_object(container.components, diagnoser);
  }

  // Component groups
  if (container.component_groups) {
    Object.values(container.component_groups).forEach((group) => traverse_object(group, diagnoser));
  }

  // Events
  if (container.events) {
    Object.values(container.events).forEach((event) => traverse_object(event, diagnoser));
  }

  if (container.filters) {
    minecraft_diagnose_filters(container.filters, diagnoser);
  }
}

function traverse_object(data: ComponentContainer, diagnoser: DiagnosticsBuilder) {
  Object.keys(data).forEach((property_key) => {
    const property = data[property_key];
    if (typeof property === 'object') {
      if (property_key.includes('filter')) {
        minecraft_diagnose_filters(property, diagnoser);
      } else {
        traverse_object(property, diagnoser);
      }
    }
  });
}
