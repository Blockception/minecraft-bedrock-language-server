import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The controlscheme command */
export const controlscheme: CommandInfo[] = [
  {
    name: 'controlscheme',
    documentation: 'Sets or clears control scheme.',
    permission_level: 1,
    parameters: [
      { text: 'controlscheme', type: ParameterType.keyword, required: true },
      { text: 'players', type: ParameterType.selector, required: true },
      { text: 'clear', type: ParameterType.unknown, required: true },
    ],
  },
  {
    name: 'controlscheme',
    documentation: 'Sets or clears control scheme.',
    permission_level: 1,
    parameters: [
      { text: 'controlscheme', type: ParameterType.keyword, required: true },
      { text: 'players', type: ParameterType.selector, required: true },
      { text: 'set', type: ParameterType.unknown, required: true },
      { text: 'control scheme', type: ParameterType.unknown, required: true },
    ],
  },
];