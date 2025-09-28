import { FormatVersion } from "../types/format-version";

const recipes = [
  'minecraft:recipe_furnace',
  'minecraft:recipe_brewing_container',
  'minecraft:recipe_brewing_mix',
  'minecraft:recipe_shaped',
  'minecraft:recipe_shapeless',
  'minecraft:recipe_smithing_transform',
]

interface ItemDescriptor {
  item: string
  count?: number
  data?: number
}

interface TagDescriptor {
  tag: string
}

type Item = string | ItemDescriptor | TagDescriptor

interface Context {
  context: string
}

type Unlock = Context | ItemDescriptor[] | TagDescriptor[]

/** */
export interface Recipe extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  "minecraft:recipe_furnace"?: {
    description: {
      identifier: string
    },
    tags: string[],
    input: Item,
    output: Item,
    unlock: Unlock
  };
  "minecraft:recipe_brewing_container"?: {
    description: {
      identifier: string
    },
    tags: string[],
    input: Item,
    output: Item,
    reagent: Item,
    unlock: Unlock
  };
  "minecraft:recipe_brewing_mix"?: {
    description: {
      identifier: string
    },
    tags: string[],
    input: Item,
    output: Item,
    reagent: Item,
    unlock: Unlock
  };
  "minecraft:recipe_shaped"?: {
    description: {
      identifier: string
    },
    tags: string[],
    pattern: [string] | [string, string] | [string, string, string],
    key: Record<string, Item>,
    result: Item | Item[],
    unlock: Unlock
  };
  "minecraft:recipe_shapeless"?: {
    description: {
      identifier: string
    },
    tags: string[],
    ingredients: Item[],
    result: Item | Item[],
    unlock: Unlock
  };
  "minecraft:recipe_smithing_transform"?: {
    description: {
      identifier: string
    },
    tags: string[],
    base: Item,
    template: string,
    addition: Item,
    result: Item,
    unlock: Unlock
  };
}

/**
 *
 */
export namespace Recipe {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Recipe {
    if (typeof value === "object" && typeof value.format_version === "string") {

      const keys = Object.keys(value)
      const type = recipes.filter(name => keys.includes(name))[0]

      if (typeof type !== 'string') return false;

      const desc = value[type].description;

      if (typeof desc === "object" && typeof desc.identifier === "string") {
        return true;
      }
    }

    return false;
  }
}
