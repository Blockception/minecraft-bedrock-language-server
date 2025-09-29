import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The code command */
export const code: CommandInfo[] = [
  {
    name: 'code',
    documentation: '??',
    permission_level: 1,
    parameters: [{ text: 'code', type: ParameterType.keyword, required: true }],
  },
];
