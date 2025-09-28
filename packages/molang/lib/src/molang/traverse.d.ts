import { MolangType } from "./functions";
/**
 * Traverses the object and returns all the molang strings
 * @param obj The object to traverse
 * @param callbackfn The callback to call when a molang string is found
 */
export declare function traverse(obj: any, callbackfn: (molang: string, type: MolangType, path: string) => void, path?: string): void;
