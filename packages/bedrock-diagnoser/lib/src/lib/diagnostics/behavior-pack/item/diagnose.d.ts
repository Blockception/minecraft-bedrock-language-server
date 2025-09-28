import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder } from "../../../types";
interface Item extends Types.OffsetWord {
    data?: number;
}
export declare function behaviorpack_item_diagnose(value: Item | string, diagnoser: DiagnosticsBuilder): boolean;
export interface ItemDefinition {
    namespace: string;
    id: string;
    variant: string;
}
export declare namespace ItemDefinition {
    /**
     * Parses item ids into their subcomponents that follow syntax like:
     * - `<namespace>:<id>:[variant]`
     * - `<id>:[variant]`
     * @param id
     */
    function parse(id: string): ItemDefinition;
}
export {};
