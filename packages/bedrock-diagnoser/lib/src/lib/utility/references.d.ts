import { References } from "bc-minecraft-bedrock-project";
/**
 * Iterates over the given data
 * @param data A Using, Defined, or an array of T
 * @param callback The callback to call
 * @returns void
 * @example forEach(Using.create(["a", "b", "c"]), (v)=>console.log(v));
 */
export declare function forEach(data: Partial<References> | string[] | undefined, callback: (key: string) => void): void;
