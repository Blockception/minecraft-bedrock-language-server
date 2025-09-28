/** */
export interface FormatVersion {
    /** */
    format_version: string;
}
/** */
export declare namespace FormatVersion {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is FormatVersion;
    /**
     *
     * @param value
     * @returns
     */
    function get(value: FormatVersion | number[] | string): {
        major: number;
        minor: number;
        patch: number;
    };
}
