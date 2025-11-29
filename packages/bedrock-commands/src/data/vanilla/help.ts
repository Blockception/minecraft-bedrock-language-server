import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The help command */
export const help: CommandInfo[] = [
  {
    name: 'help',
    documentation: 'Provides help/list of commands.',
    permission_level: 0,
    parameters: [
      { text: 'help', type: ParameterType.keyword, required: true },
      { text: 'command', type: ParameterType.command, required: false },
    ],
  },
  {
    name: 'help',
    documentation: 'Provides help/list of commands.',
    permission_level: 0,
    parameters: [
      { text: 'help', type: ParameterType.keyword, required: true },
      { text: 'command', type: ParameterType.command, required: false },
    ],
  },
  {
    name: 'help',
    documentation: 'Provides help/list of commands.',
    permission_level: 0,
    parameters: [
      { text: 'help', type: ParameterType.keyword, required: true },
      { text: 'page', type: ParameterType.integer, required: true },
    ],
  },
  {
    name: 'help',
    documentation: 'Provides help/list of commands.',
    permission_level: 0,
    parameters: [
      { text: 'help', type: ParameterType.keyword, required: true },
      { text: 'page', type: ParameterType.integer, required: true },
    ],
  },
];