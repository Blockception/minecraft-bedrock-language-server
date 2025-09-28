import { Definition } from "bc-minecraft-bedrock-types/lib/types/definition";
import { DiagnosticsBuilder, WithMetadata } from "../../../types";
import { MolangMetadata, User } from "../../molang";
/**
 *
 * @param id
 * @param data
 * @param diagnoser
 */
export declare function diagnose_animation_controller_implementation(id: string, user: User, diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>, definitions: {
    particles?: Definition;
    sounds?: Definition;
}): void;
