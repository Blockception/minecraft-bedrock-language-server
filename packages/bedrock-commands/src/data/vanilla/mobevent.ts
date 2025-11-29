import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The mobevent command */
export const mobevent: CommandInfo[] = [
  {
    name: 'mobevent',
    documentation: 'Controls what mob events are allowed to run.',
    permission_level: 1,
    parameters: [
      { text: 'mobevent', type: ParameterType.keyword, required: true },
      { text: 'event', type: ParameterType.event, required: true },
      { text: 'value', type: ParameterType.boolean, required: false },
    ],
  },
];
