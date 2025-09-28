import { FormatVersion } from "../types/format-version";
/** */
export type Model = ModelLegacy | ModelModern;
/** */
export declare namespace Model {
    function is(value: any): value is Model;
}
/** */
export type ModelLegacy = FormatVersion & Record<string, ModelLegacySpec>;
/** */
export declare namespace ModelLegacy {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is ModelLegacy;
}
/** */
export interface ModelLegacySpec {
    /** */
    bones: Bone[];
}
export declare namespace ModelLegacySpec {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is ModelLegacySpec;
}
/** */
export interface ModelModern extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    "minecraft:geometry": ModelModernSpec[];
}
/** */
export declare namespace ModelModern {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is ModelModern;
}
/** */
export interface ModelModernSpec {
    /** */
    description: {
        /** */
        identifier: string;
    };
    bones: Bone[];
}
/** */
export declare namespace ModelModernSpec {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is ModelModernSpec;
}
export interface Bone {
    /** */
    name: string;
    /** */
    parent: string;
    /** */
    binding?: string;
    /** */
    locators?: Record<string, [number, number, number]>;
}
