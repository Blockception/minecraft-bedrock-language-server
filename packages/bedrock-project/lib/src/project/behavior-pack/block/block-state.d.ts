/**The block state description*/
interface BaseBlockState<T extends string, U> {
    /**The name of the block state*/
    name: string;
    /**The type of the block state*/
    type: T;
    /**The possible values of the block state*/
    values: U[];
}
export type BlockStateInt = BaseBlockState<"int", number>;
export type BlockStateBool = BaseBlockState<"bool", boolean>;
export type BlockStateString = BaseBlockState<"string", string>;
export type BlockState = BlockStateInt | BlockStateBool | BlockStateString;
/** */
export declare namespace BlockState {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is BlockState;
    /**
     *
     * @param name
     * @param values
     * @returns
     */
    function create(name: string, values: string[] | number[] | boolean[]): BlockState | undefined;
}
export {};
