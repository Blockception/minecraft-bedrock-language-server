import { Internal } from 'bc-minecraft-bedrock-project';
import { FormatVersion } from 'bc-minecraft-bedrock-types/src/minecraft';
import { ComponentBehavior } from 'bc-minecraft-bedrock-types/src/minecraft/components';
import { Vanilla } from 'bc-minecraft-bedrock-vanilla-data';
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../../types';
import { Context } from '../../../../utility/components';
import { component_error, ComponentCheck, components_check } from '../../../../utility/components/checks';
import { diagnose_block_culling_geo_and_rules } from '../../../resource-pack/block-culling';
import { model_is_defined } from '../../../resource-pack/model/diagnose';
import { behaviorpack_loot_table_diagnose } from '../../loot-table';
import { is_block_defined } from '../diagnose';
import { safeObjectKeys } from 'bc-minecraft-bedrock-shared';

/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
export function behaviorpack_diagnose_block_components(
  container: ComponentBehavior,
  context: Context<Internal.BehaviorPack.Block>,
  diagnoser: DocumentDiagnosticsBuilder,
): void {
  components_check(container, context, diagnoser, component_test);
}

const component_test: Record<string, ComponentCheck<Internal.BehaviorPack.Block>> = {
  // deprecated
  'minecraft:aim_collision': deprecated_component('minecraft:selection_box'),
  'minecraft:block_collision': deprecated_component('minecraft:selection_box'),
  'minecraft:block_light_absorption': deprecated_component('minecraft:light_dampening'),
  'minecraft:block_light_emission': deprecated_component('minecraft:light_emission'),
  'minecraft:block_light_filter': deprecated_component('minecraft:light_dampening'),
  'minecraft:breakonpush': deprecated_component(),
  'minecraft:breathability': deprecated_component(),
  'minecraft:creative_category': deprecated_component('description.menu_category'),
  'minecraft:destroy_time': deprecated_component('minecraft:destructible_by_mining'),
  'minecraft:entity_collision': deprecated_component('minecraft:collision_box'),
  'minecraft:explosion_resistance': deprecated_component('minecraft:destructible_by_explosion'),
  'minecraft:immovable': deprecated_component(),
  'minecraft:on_fall_on': deprecated_component('minecraft:custom_components'),
  'minecraft:on_interact': deprecated_component('minecraft:custom_components'),
  'minecraft:on_placed': deprecated_component('minecraft:custom_components'),
  'minecraft:on_player_destroyed': deprecated_component('minecraft:custom_components'),
  'minecraft:on_player_placing': deprecated_component('minecraft:custom_components'),
  'minecraft:on_step_off': deprecated_component('minecraft:custom_components'),
  'minecraft:on_step_on': deprecated_component('minecraft:custom_components'),
  'minecraft:onlypistonpush': deprecated_component(),
  'minecraft:partial_visibility': deprecated_component('minecraft:geometry.bone_visibility'),
  'minecraft:pick_collision': deprecated_component('minecraft:selection_box'),
  'minecraft:preventsjumping': deprecated_component(),
  'minecraft:queued_ticking': deprecated_component('minecraft:custom_components'),
  'minecraft:random_ticking': deprecated_component('minecraft:custom_components'),
  'minecraft:rotation': deprecated_component('minecraft:transformation'),
  'minecraft:unit_cube': deprecated_component('geometry.minecraft:full_block'),
  'minecraft:unwalkable': deprecated_component(),

  // General
  'minecraft:destructible_by_mining': (name, component, context, diagnoser) => {
    const destroyTime = component.seconds_to_destroy;
    if (!destroyTime) return;

    component.item_specific_speeds?.forEach((specific_speed: any) => {
      if (specific_speed.destroy_speed && specific_speed.destroy_speed > destroyTime) {
        diagnoser.add(
          specific_speed.destroy_speed,
          `Item specific destroy speed ${specific_speed.destroy_speed} cannot be higher than block's destroy time ${destroyTime}`,
          DiagnosticSeverity.error,
          'behaviorpack.block.components.fast_break_speed',
        );
      }
    });
  },
  'minecraft:placement_filter': (name, component, context, diagnoser) => {
    for (const condition of component.conditions) {
      condition.block_filter
        ?.map((block: string | { name: string } | { tags: string }) =>
          typeof block === 'string' ? block : 'name' in block ? block.name : undefined,
        )
        .forEach((block: string | undefined) => {
          if (typeof block == 'string') is_block_defined(block, diagnoser);
        });
    }
  },
  'minecraft:geometry': (name, component, context, diagnoser) => {
    try {
      if (
        !context.components.includes('minecraft:material_instances') &&
        FormatVersion.isGreaterOrEqualThan(context.source.format_version as FormatVersion, [1, 21, 80])
      )
        diagnoser.add(
          name,
          `"minecraft:geometry" requires "minecraft:material_instances" in format versions >= 1.21.80`,
          DiagnosticSeverity.error,
          'behaviorpack.block.components.material_instances_x_geometry',
        );
    } catch (err) {
      // Leaving empty as the base diagnoser should flag an invalid format version
    }

    if (typeof component === 'string') {
      model_is_defined(component, diagnoser);
    } else if (typeof component === 'object') {
      if (component.value) model_is_defined(component.value, diagnoser);
      if (component.identifier) model_is_defined(component.identifier, diagnoser);
      if (component.culling && component.identifier)
        diagnose_block_culling_geo_and_rules(component.identifier, component.culling, diagnoser);
    }
  },
  'minecraft:loot': (name, component, context, diagnoser) => {
    if (typeof component === 'string') behaviorpack_loot_table_diagnose(component, diagnoser);
  },
  'minecraft:material_instances': (name, component, context, diagnoser) => {
    try {
      if (
        !context.components.includes('minecraft:geometry') &&
        FormatVersion.isGreaterOrEqualThan(context.source.format_version as FormatVersion, [1, 21, 80])
      )
        diagnoser.add(
          name,
          `"minecraft:material_instances" requires "minecraft:geometry" in format versions >= 1.21.80`,
          DiagnosticSeverity.error,
          'behaviorpack.block.components.material_instances_x_geometry',
        );
    } catch (err) {
      // Leaving empty as the base diagnoser should flag an invalid format version
    }

    safeObjectKeys(component)
      .map((value) => component[value].texture)
      .forEach((textureId) => {
        if (
          !diagnoser.context
            .getProjectData()
            .projectData.resourcePacks.terrainTextures.find((val) => val.id == textureId) &&
          !Vanilla.ResourcePack.TextureTerrain.includes(textureId)
        ) {
          diagnoser.add(
            textureId,
            `Texture reference "${textureId}" was not defined in terrain_texture.json`,
            DiagnosticSeverity.error,
            'behaviorpack.block.components.texture_not_found',
          );
        }
      });

    if (new Set(safeObjectKeys(component).map((value) => component[value].render_method)).size > 1)
      diagnoser.add(
        name,
        'Custom blocks were never intended to support multiple different render_method inside this component',
        DiagnosticSeverity.error,
        'behaviorpack.block.components.multiple_render_methods',
      );
  },
  'minecraft:custom_components': (name, component, context, diagnoser) => {
    try {
      if (FormatVersion.isGreaterThan(context.source.format_version as FormatVersion, [1, 21, 90]))
        diagnoser.add(
          context.source.format_version,
          `'minecraft:custom_components' is deprecated in versions after 1.21.80`,
          DiagnosticSeverity.warning,
          'behaviorpack.block.components.custom_components_deprecation',
        );
    } catch (err) {
      // Leaving empty as the base diagnoser should flag an invalid format version
    }
  },
  'minecraft:item_visual': (name, component, context, diagnoser) => {
    minimum_version_required(context.source, name, [1, 21, 50], diagnoser);
  },
  'minecraft:liquid_detection': (name, component, context, diagnoser) => {
    minimum_version_required(context.source, name, [1, 21, 50], diagnoser);
  },
  'minecraft:redstone_conductivity': (name, component, context, diagnoser) => {
    minimum_version_required(context.source, name, [1, 21, 30], diagnoser);
  },
  'minecraft:replaceable': (name, component, context, diagnoser) => {
    minimum_version_required(context.source, name, [1, 21, 60], diagnoser);
  },
  'minecraft:movable': (name, component, context, diagnoser) => {
    minimum_version_required(context.source, name, [1, 21, 100], diagnoser);
  },
};

function minimum_version_required(
  block: Internal.BehaviorPack.Block,
  name: string,
  version: [number, number, number],
  diagnoser: DocumentDiagnosticsBuilder,
) {
  try {
    if (FormatVersion.isLessThan(block.format_version as FormatVersion, version)) {
      diagnoser.add(
        name,
        `${name} requires a format version of ${version.join('.')} or greater to use.`,
        DiagnosticSeverity.error,
        'behaviorpack.block.components.' + name.split(':')[1],
      );
    }
  } catch (err) {
    // Leaving empty as the base diagnoser should flag an invalid format version
  }
}

function deprecated_component(replacement?: string) {
  const str = replacement ? ', replace with ' + replacement : '';
  return component_error(
    'This component is no longer supported' + str + '. You are recommended to use the latest format version.',
    'behaviorpack.block.components.deprecated',
  );
}
