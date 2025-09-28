import { Minecraft, Types } from "bc-minecraft-bedrock-types";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { DiagnosticsBuilder, DiagnosticSeverity } from "../../../types";
import { check_definition_value, education_enabled } from "../../definitions";
import { behaviorpack_check_blockstates } from "../block-state/diagnose";
import { Errors } from "../..";

/**
 *
 * @param blockDescriptor
 * @param diagnoser
 */
export function behaviorpack_check_blockdescriptor(
  blockDescriptor: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder
): void {
  behaviorpack_check_blockid_from_descriptor(blockDescriptor, diagnoser);
  behaviorpack_check_blockstates(blockDescriptor, diagnoser);
}

export function behaviorpack_check_blockid_from_descriptor(
  blockDescriptor: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder
): boolean {
  return is_block_defined(Minecraft.Block.getId(blockDescriptor.text), diagnoser);
}

/**Checks if the blocks exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
export function is_block_defined(id: string, diagnoser: DiagnosticsBuilder): boolean {
  //Project has block
  const anim = diagnoser.context.getProjectData().behaviors.blocks.get(id, diagnoser.project);
  if (anim === undefined) {
    Errors.missing("behaviors", "blocks", id, diagnoser);
    return false;
  }
  return true;
}
