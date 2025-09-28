import { FormatVersion } from "../types/format-version";

interface Category {
    category_name: "construction" | "equipment" | "items" | "nature",
    groups: Group[]
}

interface Group {
    group_identifier?: {
        name: string,
        icon: string | undefined
    },
    items: string[] | NamedItem[]
}

interface NamedItem {
    name: string
}

/** */
export interface ItemCatalog extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    "minecraft:crafting_items_catalog": {
        categories: Category[]
    }
}

/** */
export namespace ItemCatalog {
    /**
     *
     * @param value
     * @returns
     */
    export function is(value: any): value is ItemCatalog {
        if (value && typeof value.format_version === "string" && typeof value === 'object') {
            const catalog = value['minecraft:crafting_items_catalog']
            if (!catalog || typeof catalog != 'object') return false;
            const categories = catalog.categories
            if (Array.isArray(categories) && categories.length >= 1 && typeof categories[0] == 'object') return true;
        }
        return false;
    }
}