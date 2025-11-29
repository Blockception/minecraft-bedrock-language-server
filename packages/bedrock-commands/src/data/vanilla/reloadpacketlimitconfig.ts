import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The reloadpacketlimitconfig command */
export const reloadpacketlimitconfig: CommandInfo[] = [
  {
    name: 'reloadpacketlimitconfig',
    documentation: 'Reload packet limit config from file',
    permission_level: 4,
    parameters: [
      { text: 'reloadpacketlimitconfig', type: ParameterType.keyword, required: true },
    ],
  },
];