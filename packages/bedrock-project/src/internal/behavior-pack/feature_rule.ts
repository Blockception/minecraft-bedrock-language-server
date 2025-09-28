import { FormatVersion } from "../types/format-version";

interface Fraction {
    numerator: number,
    denominator: number
}

interface DistributionObject {
    distribution: "uniform" | "fixed_grid" | "jittered_grid" | "gaussian" | "inverse_gaussian" | "triangle",
    extent: [number, number]
}

/** */
export interface FeatureRule extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    "minecraft:feature_rules": {
        description: {
            identifier: string,
            places_feature: string
        },
        conditions: {
            placement_pass: string,
            "minecraft:biome_filter": object
        },
        distribution: {
            iterations: number | string,
            x: string | Fraction | DistributionObject,
            y: string | Fraction | DistributionObject,
            z: string | Fraction | DistributionObject
        }
    }
}

/** */
export namespace FeatureRule {
    /**
     *
     * @param value
     * @returns
     */
    export function is(value: any): value is FeatureRule {
        if (value && typeof value.format_version === "string" && typeof value === 'object') {
            const rule = value['minecraft:feature_rules']
            if (!rule || typeof rule != 'object') return false;
            const description = rule.description
            if (typeof description == 'object' && typeof description.identifier == 'string' && typeof description.places_feature == 'string') return true;
        }
        return false;
    }
}
