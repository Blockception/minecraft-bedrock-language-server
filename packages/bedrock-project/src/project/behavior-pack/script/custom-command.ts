import { CommandContainer, CommandInfo } from 'bc-minecraft-bedrock-command';
import { Identifiable, Location, Locatable } from 'bc-minecraft-bedrock-shared';

export interface CustomCommand extends Identifiable, Locatable {
  syntaxes: CommandInfo[];
}

export namespace CustomCommand {
  export function create(id: string, uri: string, syntaxes: CommandInfo[]): CustomCommand {
    const line = syntaxes[0]?.source?.line ?? 0;

    return {
      id,
      syntaxes,
      location: Location.create(uri, line),
    };
  }
}

type CommandsForEach = {
  forEach(callbackfn: (value: CustomCommand) => void): void;
};

export function toCommandContainer(commands: CommandsForEach): CommandContainer {
  const output: CommandContainer = {};

  commands.forEach((command) => {
    output[command.id] = command.syntaxes;
  });

  return output;
}
