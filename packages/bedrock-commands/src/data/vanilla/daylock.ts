import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The daylock command */
export const daylock: CommandInfo[] = [
  {
    name: 'daylock',
    documentation: 'Locks and unlocks the day-night cycle.',
    permission_level: 1,
    parameters: [
      { text: 'daylock', type: ParameterType.keyword, required: true },
      { text: 'lock', type: ParameterType.boolean, required: false },
    ],
  },
];