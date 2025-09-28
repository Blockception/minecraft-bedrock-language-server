export interface EntityBoolProperty {
    default: boolean;
    name: string;
    type: "bool";
    client_sync?: boolean;
}
export declare namespace EntityBoolProperty {
    function is(value: any): value is EntityBoolProperty;
}
export interface EntityFloatProperty {
    default: number;
    name: string;
    range: [number, number];
    type: "float";
    client_sync?: boolean;
}
export declare namespace EntityFloatProperty {
    function is(value: any): value is EntityFloatProperty;
}
export interface EntityIntProperty {
    default: number;
    name: string;
    range: [number, number];
    type: "int";
    client_sync?: boolean;
}
export declare namespace EntityIntProperty {
    function is(value: any): value is EntityIntProperty;
}
export interface EntityEnumProperty {
    client_sync?: boolean;
    default: string;
    name: string;
    type: "enum";
    values: string[];
}
export declare namespace EntityEnumProperty {
    function is(value: any): value is EntityEnumProperty;
}
export type EntityProperty = EntityBoolProperty | EntityFloatProperty | EntityIntProperty | EntityEnumProperty;
