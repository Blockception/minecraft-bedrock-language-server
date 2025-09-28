import { FormatVersion } from "../types/format-version";
/** */
export interface Item extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    "minecraft:item": {
        /** */
        description: {
            /** */
            identifier: string;
            /** */
            category?: string;
            /** */
            is_experimental?: boolean;
        };
        /** */
        components: Record<string, any>;
        /** */
        events?: Record<string, any>;
    };
}
/** */
export declare namespace Item {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Item;
}
