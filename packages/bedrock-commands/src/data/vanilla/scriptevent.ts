import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The scriptevent command */
export const scriptevent: CommandInfo[] = [
  {
    name: 'scriptevent',
    documentation: 'Triggers a script event with an ID and message.',
    permission_level: 1,
    parameters: [
      { text: 'scriptevent', type: ParameterType.keyword, required: true },
      { text: 'message id', type: ParameterType.string, required: true },
      { text: 'message', type: ParameterType.message, required: true },
    ],
  },
];