import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The allowlist command */
export const allowlist: CommandInfo[] = [
  {
    name: 'allowlist',
    documentation: 'Manages the server allowlist.',
    permission_level: 4,
    parameters: [
      { text: 'allowlist', type: ParameterType.keyword, required: true },
      { text: 'add', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'allowlist',
    documentation: 'Manages the server allowlist.',
    permission_level: 4,
    parameters: [
      { text: 'allowlist', type: ParameterType.keyword, required: true },
      { text: 'list', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'allowlist',
    documentation: 'Manages the server allowlist.',
    permission_level: 4,
    parameters: [
      { text: 'allowlist', type: ParameterType.keyword, required: true },
      { text: 'off', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'allowlist',
    documentation: 'Manages the server allowlist.',
    permission_level: 4,
    parameters: [
      { text: 'allowlist', type: ParameterType.keyword, required: true },
      { text: 'on', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'allowlist',
    documentation: 'Manages the server allowlist.',
    permission_level: 4,
    parameters: [
      { text: 'allowlist', type: ParameterType.keyword, required: true },
      { text: 'reload', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'allowlist',
    documentation: 'Manages the server allowlist.',
    permission_level: 4,
    parameters: [
      { text: 'allowlist', type: ParameterType.keyword, required: true },
      { text: 'remove', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.string, required: false },
    ],
  },
];