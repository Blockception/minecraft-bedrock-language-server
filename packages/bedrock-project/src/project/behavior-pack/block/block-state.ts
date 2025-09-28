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
export namespace BlockState {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is BlockState {
    if (value && typeof value.name === "string" && typeof value.type === "string") {
      if (typeof value.type === "string") {
        if (Array.isArray(value.values)) return true;
      }
    }

    return false;
  }

  /**
   *
   * @param name
   * @param values
   * @returns
   */
  export function create(name: string, values: string[] | number[] | boolean[]): BlockState | undefined {
    const f = typeof values[0];

    switch (f) {
      case "boolean":
        return {
          name: name,
          type: "bool",
          values: values as boolean[],
        };

      default:
      case "string":
        return {
          name: name,
          type: "string",
          values: values as string[],
        };
      case "number":
        return {
          name: name,
          type: "int",
          values: values as number[],
        };
    }
  }
}
