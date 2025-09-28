import { Identifiable } from "bc-minecraft-bedrock-types/lib/types";
import { MolangDataSetKey } from "bc-minecraft-molang";
import { MolangSet } from "bc-minecraft-molang/lib/src/molang";
import { DiagnosticsBuilder, WithMetadata } from "../../types";
/**
 * The user of the resource, the user should have the nessecary things defined for the resource to use
 */
export interface User extends Identifiable {
    id: string;
    molang: MolangSet;
}
/**
 * The resource that has molang / statements that require to be defined
 */
export interface Resource extends Identifiable {
    id: string;
    molang: MolangSet;
}
export interface MolangMetadata {
    userType: MolangDataSetKey;
}
/**
 * Diagnoses the given molang sets, the using party checks upon the definer if they have setup properly
 * @param using The set of molang data that is being used
 * @param definer The set of molang data that is defined
 * @param diagnoser The diagnoser to report to
 */
export declare function diagnose_molang_implementation(user: User, resource: Resource, diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>): void;
