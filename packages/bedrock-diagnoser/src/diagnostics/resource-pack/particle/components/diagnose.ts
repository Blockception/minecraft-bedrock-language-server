import { ComponentBehavior } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../../types";
import { Context } from "../../../../utility/components";
import { ComponentCheck, components_check } from "../../../../utility/components/checks";
import { Internal } from "bc-minecraft-bedrock-project";
import { is_block_defined } from "../../../behavior-pack/block";

/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
export function resourcepack_diagnose_particle_components(
  container: ComponentBehavior,
  context: Context<Internal.ResourcePack.Particle>,
  diagnoser: DocumentDiagnosticsBuilder
): void {
  components_check(container, context, diagnoser, component_test);
}

const component_test: Record<string, ComponentCheck<Internal.ResourcePack.Particle>> = {
  "minecraft:particle_appearance_billboard": (name, component, context, diagnoser) => {
    const flipbook = component["uv"]?.["flipbook"];
    if (!flipbook) return;
    if (flipbook["max_frame"] === undefined)
      diagnoser.add(
        name + "/uv/flipbook",
        "Required property 'max_frame' is missing",
        DiagnosticSeverity.error,
        "resourcepack.particle.component.particle_appearance_billboard.max_frame"
      );
  },
  "minecraft:particle_expire_if_in_blocks": (name, component, context, diagnoser) => {
    component.forEach((block: string) => {
      if (typeof block == "string") is_block_defined(block, diagnoser);
    });
  },
  "minecraft:particle_expire_if_not_in_blocks": (name, component, context, diagnoser) => {
    component.forEach((block: string) => {
      if (typeof block == "string") is_block_defined(block, diagnoser);
    });
  },
  "minecraft:particle_motion_collision": (name, component, context, diagnoser) => {
    if (component.collision_radius === undefined)
      diagnoser.add(
        name,
        "Required property 'collision_radius' is missing",
        DiagnosticSeverity.error,
        "resourcepack.particle.component.particle_motion_collision.radius"
      );
  },
};
