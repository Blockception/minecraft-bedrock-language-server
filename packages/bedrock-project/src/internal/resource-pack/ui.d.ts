/** Represents the structure of a Minecraft Bedrock UI definition file. */
export interface UI {
    /** The namespace for all elements defined in this file */
    namespace?: string;
    /** UI element definitions, keyed by element name (may include @inheritance syntax) */
    [key: string]: UIElement | string | undefined;
}
/** Represents a UI element definition within a Minecraft Bedrock UI file. */
export interface UIElement {
    /** The type of UI element */
    type?: string;
    [key: string]: any;
}
/** Utility functions for working with UI definition objects. */
export declare namespace UI {
    /**
     * Checks if a value is a UI definition object (has at least one object-valued property or a namespace)
     * @param value
     * @returns
     */
    function is(value: any): value is UI;
}
//# sourceMappingURL=ui.d.ts.map