import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The recipe command */
export const recipe: CommandInfo[] = [
  {
    name: 'recipe',
    documentation: 'Unlocks recipe in the recipe book for a player.',
    permission_level: 1,
    parameters: [
      { text: 'recipe', type: ParameterType.keyword, required: true },
      { text: 'give', type: ParameterType.keyword, required: true },
      { text: 'player', type: ParameterType.selector, required: true, options: { playerOnly: true } },
      { text: 'recipe', type: ParameterType.recipe, required: true },
    ],
  },
  {
    name: 'recipe',
    documentation: 'Unlocks recipe in the recipe book for a player.',
    permission_level: 1,
    parameters: [
      { text: 'recipe', type: ParameterType.keyword, required: true },
      { text: 'take', type: ParameterType.keyword, required: true },
      { text: 'player', type: ParameterType.selector, required: true, options: { playerOnly: true } },
      { text: 'recipe', type: ParameterType.recipe, required: true },
    ],
  },
];
