import { Internal } from 'bc-minecraft-bedrock-project';
import { ComponentBehavior } from 'bc-minecraft-bedrock-types/src/minecraft/components';
import { DocumentDiagnosticsBuilder } from '../../../../types';
import { Context } from '../../../../utility/components';
import { ComponentCheck, components_check } from '../../../../utility/components/checks';
import { minecraft_diagnose_filters } from '../../../minecraft/filter';
import { behaviorpack_entity_event_diagnose, behaviorpack_entityid_diagnose } from '../../entity';
import { is_block_defined } from '../../block';

/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
export function behaviorpack_diagnose_spawnrule_components(
  container: ComponentBehavior,
  context: Context<Internal.BehaviorPack.SpawnRule>,
  diagnoser: DocumentDiagnosticsBuilder,
): void {
  components_check(container, context, diagnoser, component_test);
}

const component_test: Record<string, ComponentCheck<Internal.BehaviorPack.SpawnRule>> = {
  'minecraft:biome_filter': (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component, diagnoser);
  },
  'minecraft:delay_filter': (name, component, context, diagnoser) => {
    if (typeof component.identifier == 'string') behaviorpack_entityid_diagnose(component.identifier, diagnoser);
  },
  'minecraft:herd': (name, component, context, diagnoser) => {
    const entity = diagnoser.context
      .getProjectData()
      .projectData.behaviorPacks.entities.get(context.source['minecraft:spawn_rules'].description.identifier);
    if (!entity) return;
    if (typeof component.event == 'string')
      behaviorpack_entity_event_diagnose(component.event, name, entity.events, diagnoser);
  },
  'minecraft:permute_type': (name, component, context, diagnoser) => {
    processEntries(component, (entry: any) => {
      if (typeof entry.entity_type == 'string') behaviorpack_entityid_diagnose(entry.entity_type, diagnoser);
    });
  },
  'minecraft:spawn_event': (name, component, context, diagnoser) => {
    const entity = diagnoser.context
      .getProjectData()
      .projectData.behaviorPacks.entities.get(context.source['minecraft:spawn_rules'].description.identifier);
    if (!entity) return;
    if (typeof component.event == 'string')
      behaviorpack_entity_event_diagnose(component.event, name, entity.events, diagnoser);
  },
  'minecraft:spawns_on_block_filter': (name, component, context, diagnoser) => {
    if (typeof component == 'string') is_block_defined(component, diagnoser);
    else if (Array.isArray(component))
      component.forEach((entry) => {
        if (typeof entry == 'string') is_block_defined(entry, diagnoser);
        else if (typeof entry == 'object' && typeof entry.name == 'string') is_block_defined(entry.name, diagnoser);
      });
    else if (typeof component == 'object' && typeof component.name == 'string')
      is_block_defined(component.name, diagnoser);
  },
  'minecraft:spawns_on_block_prevented_filter': (name, component, context, diagnoser) => {
    if (typeof component == 'string') is_block_defined(component, diagnoser);
    else if (Array.isArray(component))
      component.forEach((entry) => {
        if (typeof entry == 'string') is_block_defined(entry, diagnoser);
        else if (typeof entry == 'object' && typeof entry.name == 'string') is_block_defined(entry.name, diagnoser);
      });
    else if (typeof component == 'object' && typeof component.name == 'string')
      is_block_defined(component.name, diagnoser);
  },
};

//! Move into some util place as this function is duplicated in entity/components/diagnose.ts
function processEntries<T>(data: T | T[], callback: (entry: T) => void) {
  if (Array.isArray(data)) data.forEach(callback);
  else if (data) callback(data);
}
