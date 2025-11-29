import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The locate command */
export const locate: CommandInfo[] = [
  {
    name: 'locate',
    documentation: 'Displays the coordinates for the closest structure or biome of a given type.',
    permission_level: 1,
    parameters: [
      { text: 'locate', type: ParameterType.keyword, required: true },
      { text: 'biome', type: ParameterType.keyword, required: true },
      { text: 'biome', type: ParameterType.biome, required: true },
    ],
  },
  {
    name: 'locate',
    documentation: 'Displays the coordinates for the closest structure or biome of a given type.',
    permission_level: 1,
    parameters: [
      { text: 'locate', type: ParameterType.keyword, required: true },
      { text: 'structure', type: ParameterType.keyword, required: true },
      { text: 'structure', type: ParameterType.structure, required: true },
      { text: 'use new chunks only', type: ParameterType.boolean, required: false },
    ],
  },
];