import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { MolangDataSetKey } from "bc-minecraft-molang";
import { DiagnosticsBuilder, DiagnosticSeverity, EntityAnimationMolangCarrier, WithMetadata } from "../../../types";
import { education_enabled } from "../../definitions";
import { diagnose_molang_implementation, MolangMetadata } from "../../molang/diagnostics";
import { Errors } from "../..";
import { ProjectItem } from "bc-minecraft-bedrock-project";

/**
 *
 * @param id
 * @param data
 * @param diagnoser
 */
export function render_controller_diagnose_implementation(
  id: string,
  user: EntityAnimationMolangCarrier,
  diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>
): void {
  const controller = diagnoser.context.getProjectData().resources.render_controllers.get(id, diagnoser.project);
  if (controller === undefined) {
    Errors.missing("behaviors", "trading", id, diagnoser);
    return;
  }

  if (ProjectItem.is(controller)) {
    diagnose_molang_implementation(user, controller.item, diagnoser);
  }
}
