import { FormatVersion } from "../types/format-version";
interface Category {
    category_name: "construction" | "equipment" | "items" | "nature";
    groups: Group[];
}
interface Group {
    group_identifier?: {
        name: string;
        icon: string | undefined;
    };
    items: string[] | NamedItem[];
}
interface NamedItem {
    name: string;
}
/** */
export interface ItemCatalog extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    "minecraft:crafting_items_catalog": {
        categories: Category[];
    };
}
/** */
export declare namespace ItemCatalog {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is ItemCatalog;
}
export {};
