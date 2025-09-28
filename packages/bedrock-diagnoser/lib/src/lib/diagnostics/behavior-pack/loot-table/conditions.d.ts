import { DiagnosticsBuilder } from "../../../types";
/**
 *
 */
export interface LootCondition {
    /** */
    condition: string;
}
/**
 *
 * @param value
 * @param diagnoser
 */
export declare function behaviorpack_loot_table_condition_diagnose(value: LootCondition, diagnoser: DiagnosticsBuilder): void;
