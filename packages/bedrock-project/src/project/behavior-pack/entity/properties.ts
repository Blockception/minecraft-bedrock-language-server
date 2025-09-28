export interface EntityBoolProperty {
  default: boolean;
  name: string;
  type: "bool";
  client_sync?: boolean;
}

export namespace EntityBoolProperty {
  export function is(value: any): value is EntityBoolProperty {
    if (typeof value !== "object") return false;
    if (value.type !== "bool") return false;

    return true;
  }
}

export interface EntityFloatProperty {
  default: number;
  name: string;
  range: [number, number];
  type: "float";
  client_sync?: boolean;
}

export namespace EntityFloatProperty {
  export function is(value: any): value is EntityFloatProperty {
    if (typeof value !== "object") return false;
    if (value.type !== "float") return false;

    return true;
  }
}

export interface EntityIntProperty {
  default: number;
  name: string;
  range: [number, number];
  type: "int";
  client_sync?: boolean;
}

export namespace EntityIntProperty {
  export function is(value: any): value is EntityIntProperty {
    if (typeof value !== "object") return false;
    if (value.type !== "int") return false;

    return true;
  }
}

export interface EntityEnumProperty {
  client_sync?: boolean;
  default: string;
  name: string;
  type: "enum";
  values: string[];
}

export namespace EntityEnumProperty {
  export function is(value: any): value is EntityEnumProperty {
    if (typeof value !== "object") return false;
    if (value.type !== "enum") return false;

    return true;
  }
}

export type EntityProperty = EntityBoolProperty | EntityFloatProperty | EntityIntProperty | EntityEnumProperty;
