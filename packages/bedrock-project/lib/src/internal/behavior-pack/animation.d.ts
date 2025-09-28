import { FormatVersion } from "../types";
/** */
export interface Animation {
    /** */
    animation_length?: number;
    /** */
    loop?: boolean;
    /** */
    timeline?: Record<string, string | string[]>;
}
/** */
export declare namespace Animation {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Animation;
}
/** */
export interface Animations extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    animations: {
        /** */
        [animation: string]: Animation;
    };
}
/** */
export declare namespace Animations {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Animations;
}
