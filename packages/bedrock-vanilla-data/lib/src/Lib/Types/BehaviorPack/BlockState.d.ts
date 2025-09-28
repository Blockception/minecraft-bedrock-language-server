export type BlockState = BlockStateBool | BlockStateInt | BlockStateString;
export interface BlockStateBool {
    name: string;
    type: "bool";
    values: boolean[];
}
export interface BlockStateInt {
    name: string;
    type: "int";
    values: number[];
}
export interface BlockStateString {
    name: string;
    type: "string";
    values: string[];
}
/**
 *
 */
export declare namespace BlockState {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any | BlockState): value is BlockState;
    function isInt(value: BlockState): value is BlockStateInt;
    function isBool(value: BlockState): value is BlockStateBool;
    function isString(value: BlockState): value is BlockStateString;
}
