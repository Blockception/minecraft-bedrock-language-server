/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentBehavior } from "bc-minecraft-bedrock-types/src/minecraft/components";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../../types";
import { Context } from "../../../../utility/components";
import { component_error, ComponentCheck, components_check } from "../../../../utility/components/checks";
import { Internal } from "bc-minecraft-bedrock-project";
import { is_block_defined } from '../../block';
import { is_biome_defined } from '../diagnose';

/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
export function behaviorpack_diagnose_biome_components(
  container: ComponentBehavior,
  context: Context<Internal.BehaviorPack.Biome>,
  diagnoser: DocumentDiagnosticsBuilder
): void {
  components_check(container, context, diagnoser, component_test);
}

const component_test: Record<string, ComponentCheck<Internal.BehaviorPack.Biome>> = {
  "minecraft:surface_parameters": deprecated_component("minecraft:surface_builder"),
  "minecraft:frozen_ocean_surface": deprecated_component("minecraft:surface_builder"),
  "minecraft:mesa_surface": deprecated_component("minecraft:surface_builder"),
  "minecraft:swamp_surface": deprecated_component("minecraft:surface_builder"),
  "minecraft:the_end_surface": deprecated_component("minecraft:surface_builder"),
  "minecraft:climate": (name, component, context, diagnoser) => {
    const particles = ["ash", "blue_spores", "red_spores", "white_ash"]
    Object.keys(component).forEach(key => {
      if (particles.includes(key)) diagnoser.add(key, "This capability has been moved to the client_biome.json", DiagnosticSeverity.error, "behaviorpack.biome.components.climate.particles");
    })
  },
  "minecraft:overworld_generation_rules": (name, component, context, diagnoser) => {
    if (!context.source['minecraft:biome'].description.identifier.startsWith('minecraft:')) return component_error("Pre Caves and cliffs components do nothing with biome generation and will return a content error when used in custom biomes", "behaviorpack.biome.components.pre_1.17_component")
  },
  "minecraft:multinoise_generation_rules": (name, component, context, diagnoser) => {
    if (!context.source['minecraft:biome'].description.identifier.startsWith('minecraft:')) return component_error("Pre Caves and cliffs components do nothing with biome generation and will return a content error when used in custom biomes", "behaviorpack.biome.components.pre_1.17_component")
  },
  "minecraft:surface_builder": (name, component, context, diagnoser) => {
    const builder = component.builder
    const properties = ["sea_floor_material", "foundation_material", "mid_material", "top_material", "sea_material"]
    properties.forEach(key => {
      if (typeof builder[key] === 'string') is_block_defined(builder[key], diagnoser);
    })
  },
  "minecraft:replace_biomes": (name, component, context, diagnoser) => {
    if (Array.isArray(component.replacements)) component.replacements.forEach((entry: any) => {
      entry.targets.forEach((id: string) => {
        is_biome_defined(id, diagnoser, true) // TODO: Is this limited to replacing vanilla biomes only?
      });
    })
  }
};

function deprecated_component(replacement?: string) {
  const str = replacement ? ", replace with " + replacement : "";

  return component_error(
    `This component is no longer supported${str}. You are recommended to use the latest format version.`,
    "behaviorpack.biome.components.deprecated"
  );
}