import { FormatVersion } from "../types/format-version";
/** */
export interface Feature extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    'minecraft:weighted_random_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:aggregate_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:cave_carver_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:fossil_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:geode_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:growing_plant_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:multiface_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:nether_cave_carver_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:ore_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:partially_exposed_blob_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:scatter_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:search_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:sequence_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:single_block_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:snap_to_surface_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:structure_template_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:surface_relative_threshold_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:tree_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:underwater_cave_carver_feature'?: {
        description: {
            identifier: string;
        };
    };
    'minecraft:vegetation_patch_feature'?: {
        description: {
            identifier: string;
        };
    };
}
/** */
export declare namespace Feature {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Feature;
}
