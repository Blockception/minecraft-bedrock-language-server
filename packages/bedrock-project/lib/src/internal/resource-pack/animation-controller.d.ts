import { Types } from "bc-minecraft-bedrock-types";
import * as General from "../general/controllers/state";
import { FormatVersion } from "../types/format-version";
/** */
export interface AnimationControllers extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    animation_controllers: {
        /** */
        [controller: string]: AnimationController;
    };
}
/** */
export declare namespace AnimationControllers {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is AnimationControllers;
}
/** */
export interface AnimationController {
    /** */
    initial_state?: string;
    /** */
    states: Record<string, State>;
}
/** */
export declare namespace AnimationController {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is AnimationController;
}
/** */
export interface State extends General.State {
    /** */
    blend_transition?: number;
    /** */
    blend_via_shortest_path?: boolean;
    /** */
    particle_effects?: {
        effect?: string;
        locator?: string;
    }[];
    /** */
    sound_effects?: {
        effect?: string;
    }[];
    /** */
    variables?: Types.Definition;
}
/** */
export declare namespace State {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is State;
}
