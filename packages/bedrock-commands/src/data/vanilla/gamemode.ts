import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The gamemode command */
export const gamemode: CommandInfo[] = [
  {
    name: 'gamemode',
    documentation: "Sets a player's game mode.",
    permission_level: 1,
    parameters: [
      { text: 'gamemode', type: ParameterType.keyword, required: true },
      { text: 'game mode', type: ParameterType.gamemode, required: true },
      { text: 'player', type: ParameterType.selector, required: false },
    ],
  },
  {
    name: 'gamemode',
    documentation: "Sets a player's game mode.",
    permission_level: 1,
    parameters: [
      { text: 'gamemode', type: ParameterType.keyword, required: true },
      { text: 'game mode', type: ParameterType.integer, required: true },
      { text: 'player', type: ParameterType.selector, required: false },
    ],
  },
];