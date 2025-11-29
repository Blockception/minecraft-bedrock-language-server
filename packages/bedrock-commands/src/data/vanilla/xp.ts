import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The xp command */
export const xp: CommandInfo[] = [
  {
    name: 'xp',
    documentation: 'Adds or removes player experience.',
    permission_level: 1,
    parameters: [
      { text: 'xp', type: ParameterType.keyword, required: true },
      { text: 'amount', type: ParameterType.integer, required: true },
      { text: 'player', type: ParameterType.selector, required: false, options: { playerOnly: true } },
    ],
  },
  {
    name: 'xp',
    documentation: 'Adds or removes player experience.',
    permission_level: 1,
    parameters: [
      { text: 'xp', type: ParameterType.keyword, required: true },
      { text: 'amount', type: ParameterType.xp, required: true },
      { text: 'player', type: ParameterType.selector, required: false, options: { playerOnly: true } },
    ],
  },
];