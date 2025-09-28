import { Types } from "bc-minecraft-bedrock-types";
import { FormatVersion } from "../types/format-version";
import { ScriptContainer } from "../types";
/** */
export interface Attachable extends Readonly<FormatVersion> {
    /** */
    "minecraft:attachable": AttachableContainer;
}
/** */
export interface AttachableContainer {
    /** */
    description: AttachableDescription;
}
/** */
export interface AttachableDescription extends ScriptContainer {
    /** */
    identifier: string;
    /** */
    materials?: {
        /** */
        default?: string;
        /** */
        enchanted?: string;
    };
    /** */
    animations?: Types.Definition;
    /** */
    animation_controllers?: string[];
    /** */
    particle_effects?: Types.Definition;
    /** */
    geometry?: Types.Definition;
    /** */
    render_controllers?: (string | Types.Definition)[];
    /** */
    sound_effects?: Types.Definition;
    /** */
    textures?: Types.Definition;
}
/** */
export declare namespace Attachable {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Attachable;
}
