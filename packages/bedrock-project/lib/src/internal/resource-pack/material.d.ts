import { FormatVersion } from "../types/format-version";
/** */
export interface Material extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    [material: string]: any;
}
/** */
export declare namespace Material {
    function is(value: any): value is Material;
}
