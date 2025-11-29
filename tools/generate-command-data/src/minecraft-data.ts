const command_data_url =
  'https://raw.githubusercontent.com/Mojang/bedrock-samples/refs/heads/main/metadata/command_modules/mojang-commands.json';

export async function get(): Promise<MinecraftCommandData> {
  return fetch(command_data_url)
    .then((response) => response.json())
    .then((data) => {
      if (!MinecraftCommandData.is(data)) {
        console.log('Invalid command data format', data);
        throw new Error('Invalid command data format');
      }
      return data;
    });
}

export interface MinecraftCommandData {
  name: string;
  module_type: string;
  minecraft_version: string;
  command_enums: Array<CommandEnum>;
  commands: Array<Command>;
}

export namespace MinecraftCommandData {
  export function is(data: any | MinecraftCommandData): data is MinecraftCommandData {
    return (
      typeof data.name === 'string' &&
      typeof data.module_type === 'string' &&
      Array.isArray(data.command_enums) &&
      Array.isArray(data.commands)
    );
  }
}

export interface Command {
  name: string;
  description: string;
  aliases: Array<{ name: string }>;
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
  type: { name: string };
  is_optional: boolean;
}

export interface CommandEnum {
  name: string;
  values: Array<CommandEnumValue>;
}

export interface CommandEnumValue {
  value: string;
}
