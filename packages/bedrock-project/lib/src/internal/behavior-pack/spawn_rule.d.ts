import { ComponentContainer } from 'bc-minecraft-bedrock-types/lib/minecraft/components';
import { FormatVersion } from "../types/format-version";
/** */
export interface SpawnRule extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    "minecraft:spawn_rules": {
        description: {
            identifier: string;
            population_control: string;
        };
        conditions: ComponentContainer[];
    };
}
/**
 *
 */
export declare namespace SpawnRule {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is SpawnRule;
}
