import * as General from "../general/controllers/state";
import { FormatVersion } from "../types";
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
export interface State extends General.State {
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
