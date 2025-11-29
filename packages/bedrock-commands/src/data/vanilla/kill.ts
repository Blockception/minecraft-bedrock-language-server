import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The kill command */
export const kill: CommandInfo[] = [
  {
    name: 'kill',
    documentation: 'Kills entities (players, mobs, etc.).',
    permission_level: 1,
    parameters: [
      { text: 'kill', type: ParameterType.keyword, required: true },
      { text: 'target', type: ParameterType.selector, required: false },
    ],
  },
];