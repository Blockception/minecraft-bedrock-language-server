import { FormatVersion } from "../types/format-version";
interface ItemDescriptor {
    item: string;
    count?: number;
    data?: number;
}
interface TagDescriptor {
    tag: string;
}
type Item = string | ItemDescriptor | TagDescriptor;
interface Context {
    context: string;
}
type Unlock = Context | ItemDescriptor[] | TagDescriptor[];
/** */
export interface Recipe extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    "minecraft:recipe_furnace"?: {
        description: {
            identifier: string;
        };
        tags: string[];
        input: Item;
        output: Item;
        unlock: Unlock;
    };
    "minecraft:recipe_brewing_container"?: {
        description: {
            identifier: string;
        };
        tags: string[];
        input: Item;
        output: Item;
        reagent: Item;
        unlock: Unlock;
    };
    "minecraft:recipe_brewing_mix"?: {
        description: {
            identifier: string;
        };
        tags: string[];
        input: Item;
        output: Item;
        reagent: Item;
        unlock: Unlock;
    };
    "minecraft:recipe_shaped"?: {
        description: {
            identifier: string;
        };
        tags: string[];
        pattern: [string] | [string, string] | [string, string, string];
        key: Record<string, Item>;
        result: Item | Item[];
        unlock: Unlock;
    };
    "minecraft:recipe_shapeless"?: {
        description: {
            identifier: string;
        };
        tags: string[];
        ingredients: Item[];
        result: Item | Item[];
        unlock: Unlock;
    };
    "minecraft:recipe_smithing_transform"?: {
        description: {
            identifier: string;
        };
        tags: string[];
        base: Item;
        template: string;
        addition: Item;
        result: Item;
        unlock: Unlock;
    };
}
/**
 *
 */
export declare namespace Recipe {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Recipe;
}
export {};
