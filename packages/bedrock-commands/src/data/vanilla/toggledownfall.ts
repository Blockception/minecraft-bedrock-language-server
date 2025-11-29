import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The toggledownfall command */
export const toggledownfall: CommandInfo[] = [
  {
    name: 'toggledownfall',
    documentation: 'Toggles the weather.',
    permission_level: 1,
    parameters: [
      { text: 'toggledownfall', type: ParameterType.keyword, required: true },
    ],
  },
];