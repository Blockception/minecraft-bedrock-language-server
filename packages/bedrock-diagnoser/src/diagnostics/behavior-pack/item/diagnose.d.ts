import { DiagnosticsBuilder } from '../../../types';
import { OffsetWord } from 'bc-minecraft-bedrock-shared';
interface Item extends OffsetWord {
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
//# sourceMappingURL=diagnose.d.ts.map