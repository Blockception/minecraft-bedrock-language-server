import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The enchant command */
export const enchant: CommandInfo[] = [
  {
    name: 'enchant',
    documentation: "Adds an enchantment to a player's selected item.",
    permission_level: 1,
    parameters: [
      { text: 'enchant', type: ParameterType.keyword, required: true },
      { text: 'player', type: ParameterType.selector, required: true },
      { text: 'enchantment id', type: ParameterType.integer, required: true },
      { text: 'level', type: ParameterType.integer, required: false },
    ],
  },
  {
    name: 'enchant',
    documentation: "Adds an enchantment to a player's selected item.",
    permission_level: 1,
    parameters: [
      { text: 'enchant', type: ParameterType.keyword, required: true },
      { text: 'player', type: ParameterType.selector, required: true },
      { text: 'enchantment name', type: ParameterType.enchant, required: true },
      { text: 'level', type: ParameterType.integer, required: false },
    ],
  },
];
