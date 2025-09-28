import { FormatVersion } from "../types/format-version";

const features = [
    'minecraft:weighted_random_feature',
    'minecraft:aggregate_feature',
    'minecraft:cave_carver_feature',
    'minecraft:fossil_feature',
    'minecraft:geode_feature',
    'minecraft:growing_plant_feature',
    'minecraft:multiface_feature',
    'minecraft:nether_cave_carver_feature',
    'minecraft:ore_feature',
    'minecraft:partially_exposed_blob_feature',
    'minecraft:scatter_feature',
    'minecraft:search_feature',
    'minecraft:sequence_feature',
    'minecraft:single_block_feature',
    'minecraft:snap_to_surface_feature',
    'minecraft:structure_template_feature',
    'minecraft:surface_relative_threshold_feature',
    'minecraft:tree_feature',
    'minecraft:underwater_cave_carver_feature',
    'minecraft:vegetation_patch_feature'
]

/** */
export interface Feature extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    'minecraft:weighted_random_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:aggregate_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:cave_carver_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:fossil_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:geode_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:growing_plant_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:multiface_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:nether_cave_carver_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:ore_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:partially_exposed_blob_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:scatter_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:search_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:sequence_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:single_block_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:snap_to_surface_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:structure_template_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:surface_relative_threshold_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:tree_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:underwater_cave_carver_feature'?: {
        description: {
            identifier: string
        }
    },
    'minecraft:vegetation_patch_feature'?: {
        description: {
            identifier: string
        }
    }
}

/** */
export namespace Feature {
    /**
     *
     * @param value
     * @returns
     */
    export function is(value: any): value is Feature {
        if (value && typeof value.format_version === "string" && typeof value === 'object') {
            const keys = Object.keys(value)
            const type = features.filter(feature => keys.includes(feature))[0]
            if (type && typeof value[type].description === 'object' && typeof value[type].description.identifier === 'string') return true
        }
        return false;
    }
}