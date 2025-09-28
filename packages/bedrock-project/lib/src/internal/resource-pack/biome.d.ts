import { ComponentContainer } from 'bc-minecraft-bedrock-types/lib/minecraft/components';
import { FormatVersion } from "../types/format-version";
/** */
export interface Biome extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    "minecraft:client_biome": {
        description: {
            identifier: string;
        };
        components: ComponentContainer;
    };
}
/**
 *
 */
export declare namespace Biome {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Biome;
}
