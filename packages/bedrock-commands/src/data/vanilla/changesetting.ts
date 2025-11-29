import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The changesetting command */
export const changesetting: CommandInfo[] = [
  {
    name: 'changesetting',
    documentation: "Changes a setting on the dedicated server while it's running.",
    permission_level: 4,
    parameters: [
      { text: 'changesetting', type: ParameterType.keyword, required: true },
      { text: 'allow-cheats', type: ParameterType.keyword, required: true },
      { text: 'value', type: ParameterType.boolean, required: true },
    ],
  },
  {
    name: 'changesetting',
    documentation: "Changes a setting on the dedicated server while it's running.",
    permission_level: 4,
    parameters: [
      { text: 'changesetting', type: ParameterType.keyword, required: true },
      { text: 'difficulty', type: ParameterType.keyword, required: true },
      { text: 'value', type: ParameterType.difficulty, required: true },
    ],
  },
  {
    name: 'changesetting',
    documentation: "Changes a setting on the dedicated server while it's running.",
    permission_level: 4,
    parameters: [
      { text: 'changesetting', type: ParameterType.keyword, required: true },
      { text: 'difficulty', type: ParameterType.keyword, required: true },
      { text: 'value', type: ParameterType.integer, required: true },
    ],
  },
];
