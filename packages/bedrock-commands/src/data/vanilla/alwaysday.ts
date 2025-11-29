import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The alwaysday command */
export const alwaysday: CommandInfo[] = [
  {
    name: 'alwaysday',
    documentation: 'Locks and unlocks the day-night cycle.',
    permission_level: 1,
    parameters: [
      { text: 'alwaysday', type: ParameterType.keyword, required: true },
      { text: 'lock', type: ParameterType.boolean, required: false },
    ],
  },
];