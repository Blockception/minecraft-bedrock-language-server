import { Conditional } from 'bc-minecraft-bedrock-shared';
/** */
export interface State {
    /** */
    animations?: (Conditional | string)[];
    /** */
    on_entry?: string[];
    /** */
    on_exit?: string[];
    /** */
    transitions?: Conditional[];
}
/** */
export declare namespace State {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is State;
}
//# sourceMappingURL=state.d.ts.map