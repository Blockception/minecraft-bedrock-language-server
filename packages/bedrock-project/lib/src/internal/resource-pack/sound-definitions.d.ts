import { FormatVersion } from "../types/format-version";
/** */
export interface SoundDefinitions extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    sound_definitions: Record<string, SoundDefinition>;
}
/** */
export interface SoundDefinition {
    /** */
    category: string;
    /** */
    sounds: (string | SoundSpec)[];
}
/** */
export interface SoundSpec {
    /**The relative path to the file */
    name?: string;
    /** Whenever or not the file needs to be streamed */
    stream?: boolean;
}
/** */
export declare namespace SoundDefinitions {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is SoundDefinitions;
}
