import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The place command */
export const place: CommandInfo[] = [
  {
    name: 'place',
    documentation: 'Places a jigsaw structure, feature, or feature rule in the world.',
    permission_level: 2,
    parameters: [
      { text: 'place', type: ParameterType.keyword, required: true },
      { text: 'feature', type: ParameterType.keyword, required: true },
      { text: 'feature', type: ParameterType.locateFeature, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: false },
      { text: 'position y', type: ParameterType.coordinate, required: false },
      { text: 'position z', type: ParameterType.coordinate, required: false },
    ],
  },
  {
    name: 'place',
    documentation: 'Places a jigsaw structure, feature, or feature rule in the world.',
    permission_level: 2,
    parameters: [
      { text: 'place', type: ParameterType.keyword, required: true },
      { text: 'featurerule', type: ParameterType.keyword, required: true },
      { text: 'featurerule', type: ParameterType.locateFeature, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: false },
      { text: 'position y', type: ParameterType.coordinate, required: false },
      { text: 'position z', type: ParameterType.coordinate, required: false },
    ],
  },
  {
    name: 'place',
    documentation: 'Places a jigsaw structure, feature, or feature rule in the world.',
    permission_level: 2,
    parameters: [
      { text: 'place', type: ParameterType.keyword, required: true },
      { text: 'jigsaw', type: ParameterType.keyword, required: true },
      { text: 'pool', type: ParameterType.function, required: true },
      { text: 'jigsaw target', type: ParameterType.jigsaw, required: true },
      { text: 'max depth', type: ParameterType.integer, required: true },
      { text: 'pos x', type: ParameterType.coordinate, required: false },
      { text: 'pos y', type: ParameterType.coordinate, required: false },
      { text: 'pos z', type: ParameterType.coordinate, required: false },
      { text: 'keep jigsaws', type: ParameterType.boolean, required: false },
      { text: 'include entities', type: ParameterType.boolean, required: false },
      { text: 'liquid settings', type: ParameterType.unknown, required: false },
    ],
  },
  {
    name: 'place',
    documentation: 'Places a jigsaw structure, feature, or feature rule in the world.',
    permission_level: 2,
    parameters: [
      { text: 'place', type: ParameterType.keyword, required: true },
      { text: 'structure', type: ParameterType.keyword, required: true },
      { text: 'structure', type: ParameterType.jigsaw, required: true },
      { text: 'pos x', type: ParameterType.coordinate, required: false },
      { text: 'pos y', type: ParameterType.coordinate, required: false },
      { text: 'pos z', type: ParameterType.coordinate, required: false },
      { text: 'ignore start height', type: ParameterType.boolean, required: false },
      { text: 'keep jigsaws', type: ParameterType.boolean, required: false },
      { text: 'include entities', type: ParameterType.boolean, required: false },
      { text: 'liquid settings', type: ParameterType.unknown, required: false },
    ],
  },
];
