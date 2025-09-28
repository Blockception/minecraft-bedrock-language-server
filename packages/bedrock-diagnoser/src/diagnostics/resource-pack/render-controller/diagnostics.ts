import { ProjectItem } from "bc-minecraft-bedrock-project";
import { Errors } from "../..";
import { DiagnosticsBuilder, EntityAnimationMolangCarrier, WithMetadata } from "../../../types";
import { diagnose_molang_implementation, MolangMetadata } from "../../molang/diagnostics";

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
