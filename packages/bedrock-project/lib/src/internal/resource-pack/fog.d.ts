import { FormatVersion } from "../types/format-version";
/** */
export interface Fog extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    "minecraft:fog_settings": FogContainer;
}
/** */
export interface FogContainer {
    /** */
    description: FogDescription;
    /** */
    distance?: {
        air?: FogDistance;
        water?: FogDistance;
        lava?: FogDistance;
        lava_resistance?: FogDistance;
        powder_snow?: FogDistance;
        weather?: FogDistance;
    };
    /** */
    volumetric?: any;
}
/** */
export interface FogDescription {
    /** */
    identifier: string;
}
/** */
export interface FogDistance {
    /** */
    fog_start?: number;
    /** */
    fog_end?: number;
    /** */
    fog_color?: string;
    /** */
    render_distance_type?: "fixed" | "render";
}
/**
 *
 */
export declare namespace Fog {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Fog;
}
