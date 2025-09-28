import { ComponentBehavior } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../../types";
import { Context } from "../../../../utility/components";
import { ComponentCheck, components_check } from "../../../../utility/components/checks";
import { Internal } from "bc-minecraft-bedrock-project";
import { fog_is_defined } from "../../fog/diagnose";
import { diagnose_resourcepack_sound } from "../../sounds";

/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
export function resourcepack_diagnose_biome_components(
  container: ComponentBehavior,
  context: Context<Internal.ResourcePack.Biome>,
  diagnoser: DocumentDiagnosticsBuilder
): void {
  components_check(container, context, diagnoser, component_test);
}

const component_test: Record<string, ComponentCheck<Internal.ResourcePack.Biome>> = {
  "minecraft:ambient_sounds": (name, component, context, diagnoser) => {
    if (typeof component.addition === "string") diagnose_resourcepack_sound(component.addition, diagnoser);
    if (typeof component.loop === "string") diagnose_resourcepack_sound(component.loop, diagnoser);
    if (typeof component.mood === "string") diagnose_resourcepack_sound(component.mood, diagnoser);
  },
  "minecraft:water_appearance": (name, component, context, diagnoser) => {
    if (component.surface_color === undefined && component.surface_opacity === undefined)
      diagnoser.add(
        name,
        "Component needs at least one property",
        DiagnosticSeverity.error,
        "resourcepack.biome.water_appearance.minimum_properties"
      );
  },
  "minecraft:atmosphere_identifier": (name, component, context, diagnoser) => {
    //TODO
  },
  "minecraft:color_grading_identifier": (name, component, context, diagnoser) => {
    //TODO
  },
  "minecraft:lighting_identifier": (name, component, context, diagnoser) => {
    //TODO
  },
  "minecraft:water_identifier": (name, component, context, diagnoser) => {
    //TODO
  },
  "minecraft:fog_appearance": (name, component, context, diagnoser) => {
    fog_is_defined(component.fog_identifier, diagnoser);
  },
};
