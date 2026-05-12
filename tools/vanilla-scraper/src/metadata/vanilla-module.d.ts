/**
 * Vanilla module data structure
 */
export interface VanillaModule<T> {
    name: string;
    module_type: string;
    minecraft_version: string;
    vanilla_data_type: string;
    data_items: T[];
}
/**
 * Create a new VanillaModule
 */
export declare function createVanillaModule<T>(): VanillaModule<T>;
/**
 * Convert vanilla module items using a mapping function
 */
export declare function convertVanillaModule<T, U>(filepath: string, receiver: U[], mapFn: (item: T) => U): void;
/**
 * Convert vanilla module items using a mapping function that returns arrays
 */
export declare function convertVanillaModuleFlat<T, U>(filepath: string, receiver: U[], mapFn: (item: T) => U[]): void;
//# sourceMappingURL=vanilla-module.d.ts.map