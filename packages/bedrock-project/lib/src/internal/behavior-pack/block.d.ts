import { ComponentContainer } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { FormatVersion } from "../types/format-version";
export interface Block extends Readonly<FormatVersion> {
    format_version: string;
    "minecraft:block": {
        description: {
            identifier: string;
            register_to_creative_menu?: boolean;
            is_experimental?: boolean;
            properties?: Record<string, string[] | number[] | boolean[]>;
        };
        permutations?: Permutation[];
        components: ComponentContainer;
        events?: Record<string, any>;
    };
}
export interface Permutation {
    condition?: string;
    components?: ComponentContainer;
}
/** */
export declare namespace Block {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Block;
}
