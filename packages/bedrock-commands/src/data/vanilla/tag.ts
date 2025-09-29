import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The tag command */
export const tag: CommandInfo[] = [
  {
    name: 'tag',
    documentation: 'Manages tags stored in entities.',
    permission_level: 1,
    parameters: [
      { text: 'tag', type: ParameterType.keyword, required: true },
      { text: 'entity', type: ParameterType.selector, required: true },
      { text: 'add', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.tag, required: true },
    ],
  },
  {
    name: 'tag',
    documentation: 'Manages tags stored in entities.',
    permission_level: 1,
    parameters: [
      { text: 'tag', type: ParameterType.keyword, required: true },
      { text: 'entity', type: ParameterType.selector, required: true },
      { text: 'list', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'tag',
    documentation: 'Manages tags stored in entities.',
    permission_level: 1,
    parameters: [
      { text: 'tag', type: ParameterType.keyword, required: true },
      { text: 'entity', type: ParameterType.selector, required: true, options: { wildcard: true } },
      { text: 'remove', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.tag, required: true },
    ],
  },
];
