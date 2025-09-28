import { ComponentContainer, ComponentGroups } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { CommandContainer } from "../general/commands";
import { ScriptContainer } from "../types";

/**The interface that deals with entity events that add or remove component groups*/
export interface EntityEventGroup {
  /**The group of entity events*/
  component_groups?: string[];
}

/** */
export interface EntityEvent {
  /** */
  add?: EntityEventGroup;
  /** */
  remove?: EntityEventGroup;
  /** */
  sequence?: EntityEvent[];
  /** */
  randomize?: (EntityEvent & { weight: number })[];
  /** */
  set_property?: Record<string, string | number | boolean>;
  /** The command to run when the event is triggered */
  queue_command?: CommandContainer;
  /** */
  trigger: string;
}

/**
 *
 */
export interface EntityBooleanProperty {
  /** */
  type: "bool";
  /** The default value or molang expression */
  default: boolean | string;
}

export interface EntityFloatProperty {
  /** */
  type: "float";
  /** The default value or molang expression */
  default: number | string;
  /** */
  range: [number, number];
}

export interface EntityEnumProperty {
  /** */
  type: "enum";
  /** The default value or molang expression */
  values: Array<string>;
  /** */
  default: string;
  /** */
  client_sync: true;
}

export interface EntityIntProperty {
  /** */
  type: "int";
  /** The default value or molang expression */
  default: number | string;
  /** */
  range: [number, number];
}

export type EntityProperty = EntityBooleanProperty | EntityFloatProperty | EntityIntProperty | EntityEnumProperty;

/**
 * @deprecated Replace with @see {@link ComponentContainer}
 */
export type EntityComponentContainer = ComponentContainer;

/** */
export interface EntityDescription extends ScriptContainer {
  /** */
  identifier: string;
  /** */
  is_spawnable?: boolean;
  /** */
  is_summonable?: boolean;
  /** */
  is_experimental: boolean;
  /** */
  runtime_identifier: string;
  /** */
  properties?: Record<string, EntityProperty>;
}

/** */
export interface Entity {
  /** */
  format_version: string;
  /** */
  "minecraft:entity": {
    /** */
    description: EntityDescription;
    /** */
    component_groups?: ComponentGroups;
    /** */
    components: ComponentContainer;
    /** */
    events?: Record<string, EntityEvent>;
  };
  uses_beta_features?: boolean;
}

/** */
export namespace Entity {
  /**
   *
   * @param value
   */
  export function is(value: any): value is Entity {
    if (
      typeof value === "object" &&
      typeof value.format_version === "string" &&
      typeof value["minecraft:entity"] === "object"
    ) {
      const b = value["minecraft:entity"];

      if (
        typeof b.description === "object" &&
        typeof b.description.identifier === "string" &&
        typeof b.components === "object"
      ) {
        return true;
      }
    }

    return false;
  }
}
