/**
 *
 */
export interface Settings {
    /** */
    Education: {
        /** */
        Enable: boolean;
    };
    /** */
    Diagnostics: {
        /** */
        Enable: boolean;
        /** */
        Lang: boolean;
        /** */
        Json: boolean;
        /** */
        Mcfunctions: boolean;
        /** */
        Objectives: boolean;
        /** */
        Tags: boolean;
    };
    /** */
    Plugin: {
        /** */
        CodeLens: boolean;
    };
    Completion: {
        JSON: boolean;
        Lang: {
            Dynamic: boolean;
            Comments: boolean;
        };
    };
}
/**
 *
 */
export declare namespace Settings {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any | Settings): value is Settings;
    /**
     *
     * @param value
     * @returns
     */
    function clone(value: Settings): Settings;
    /**
     *
     * @returns
     */
    function createDefaultSettings(): Settings;
}
//# sourceMappingURL=settings.d.ts.map