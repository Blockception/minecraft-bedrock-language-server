import { Types } from 'bc-minecraft-bedrock-types';
/** */
export interface State {
    /** */
    animations?: (Types.Conditional | string)[];
    /** */
    on_entry?: string[];
    /** */
    on_exit?: string[];
    /** */
    transitions?: Types.Conditional[];
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
