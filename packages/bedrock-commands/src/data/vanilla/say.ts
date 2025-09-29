import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The say command */
export const say: CommandInfo[] = [
  {
    name: 'say',
    documentation: 'Sends a message in the chat to other players.',
    permission_level: 1,
    parameters: [
      { text: 'say', type: ParameterType.keyword, required: true },
      { text: 'message', type: ParameterType.message, required: true },
    ],
  },
];
