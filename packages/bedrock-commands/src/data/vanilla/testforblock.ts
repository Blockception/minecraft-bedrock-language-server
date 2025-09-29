import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The testforblock command */
export const testforblock: CommandInfo[] = [
  {
    name: 'testforblock',
    documentation: 'Tests whether a certain block is in a specific location.',
    permission_level: 1,
    parameters: [
      { text: 'testforblock', type: ParameterType.keyword, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: true },
      { text: 'position y', type: ParameterType.coordinate, required: true },
      { text: 'position z', type: ParameterType.coordinate, required: true },
      { text: 'tile name', type: ParameterType.block, required: true },
      { text: 'block states', type: ParameterType.blockStates, required: false },
    ],
  },
];
