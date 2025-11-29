import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The setworldspawn command */
export const setworldspawn: CommandInfo[] = [
  {
    name: 'setworldspawn',
    documentation: 'Sets the world spawn.',
    permission_level: 1,
    parameters: [
      { text: 'setworldspawn', type: ParameterType.keyword, required: true },
      { text: 'spawnPoint x', type: ParameterType.coordinate, required: false },
      { text: 'spawnPoint y', type: ParameterType.coordinate, required: false },
      { text: 'spawnPoint z', type: ParameterType.coordinate, required: false },
    ],
  },
];