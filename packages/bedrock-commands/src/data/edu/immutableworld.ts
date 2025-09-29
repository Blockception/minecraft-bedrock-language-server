import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The immutableworld command */
export const immutableworld: CommandInfo[] = [
  {
    name: 'immutableworld',
    documentation: 'Sets the immutable state of the world',
    permission_level: 1,
    parameters: [
      { text: 'immutableworld', type: ParameterType.keyword, required: true },
      { text: 'immutableworld', type: ParameterType.boolean, required: false },
    ],
  },
];
