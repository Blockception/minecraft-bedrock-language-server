export declare function get(): Promise<MinecraftCommandData>;
export interface MinecraftCommandData {
    name: string;
    module_type: string;
    minecraft_version: string;
    command_enums: Array<CommandEnum>;
    commands: Array<Command>;
}
export declare namespace MinecraftCommandData {
    function is(data: any | MinecraftCommandData): data is MinecraftCommandData;
}
export interface Command {
    name: string;
    description: string;
    aliases: Array<{
        name: string;
    }>;
    overloads: Array<CommandOverload>;
    permission_level: number;
    require_cheats: boolean;
}
export interface CommandOverload {
    name: string;
    params: Array<CommandParameter>;
}
export interface CommandParameter {
    name: string;
    type: {
        name: string;
    };
    is_optional: boolean;
}
export interface CommandEnum {
    name: string;
    values: Array<CommandEnumValue>;
}
export interface CommandEnumValue {
    value: string;
}
//# sourceMappingURL=minecraft-data.d.ts.map