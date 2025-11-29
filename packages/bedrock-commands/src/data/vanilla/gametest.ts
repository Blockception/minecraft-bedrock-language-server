import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The gametest command */
export const gametest: CommandInfo[] = [
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'clearall', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'create', type: ParameterType.keyword, required: true },
      { text: 'test name', type: ParameterType.string, required: true },
      { text: 'width', type: ParameterType.integer, required: false },
      { text: 'height', type: ParameterType.integer, required: false },
      { text: 'depth', type: ParameterType.integer, required: false },
    ],
  },
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'pos', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'run', type: ParameterType.keyword, required: true },
      { text: 'test name', type: ParameterType.string, required: true },
      { text: 'rotation steps', type: ParameterType.integer, required: false },
    ],
  },
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'run', type: ParameterType.keyword, required: true },
      { text: 'test name', type: ParameterType.string, required: true },
      { text: 'stop on failure', type: ParameterType.boolean, required: true },
      { text: 'repeat count', type: ParameterType.integer, required: true },
      { text: 'rotation steps', type: ParameterType.integer, required: false },
    ],
  },
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'runset', type: ParameterType.keyword, required: true },
      { text: 'tag', type: ParameterType.string, required: false },
      { text: 'rotation steps', type: ParameterType.integer, required: false },
    ],
  },
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'runsetuntilfail', type: ParameterType.keyword, required: true },
      { text: 'tag', type: ParameterType.string, required: false },
      { text: 'rotation steps', type: ParameterType.integer, required: false },
    ],
  },
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'runthese', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'runthis', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'gametest',
    documentation: 'Interacts with gametest.',
    permission_level: 1,
    parameters: [
      { text: 'gametest', type: ParameterType.keyword, required: true },
      { text: 'stopall', type: ParameterType.keyword, required: true },
    ],
  },
];