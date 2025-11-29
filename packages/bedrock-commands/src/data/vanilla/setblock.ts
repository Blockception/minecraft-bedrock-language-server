import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The setblock command */
export const setblock: CommandInfo[] = [
  {
    name: 'setblock',
    documentation: 'Changes a block to another block.',
    permission_level: 1,
    parameters: [
      { text: 'setblock', type: ParameterType.keyword, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: true },
      { text: 'position y', type: ParameterType.coordinate, required: true },
      { text: 'position z', type: ParameterType.coordinate, required: true },
      { text: 'tile name', type: ParameterType.block, required: true },
      { text: 'block states', type: ParameterType.blockStates, required: true },
      { text: 'destroy', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'setblock',
    documentation: 'Changes a block to another block.',
    permission_level: 1,
    parameters: [
      { text: 'setblock', type: ParameterType.keyword, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: true },
      { text: 'position y', type: ParameterType.coordinate, required: true },
      { text: 'position z', type: ParameterType.coordinate, required: true },
      { text: 'tile name', type: ParameterType.block, required: true },
      { text: 'block states', type: ParameterType.blockStates, required: true },
      { text: 'keep', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'setblock',
    documentation: 'Changes a block to another block.',
    permission_level: 1,
    parameters: [
      { text: 'setblock', type: ParameterType.keyword, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: true },
      { text: 'position y', type: ParameterType.coordinate, required: true },
      { text: 'position z', type: ParameterType.coordinate, required: true },
      { text: 'tile name', type: ParameterType.block, required: true },
      { text: 'block states', type: ParameterType.blockStates, required: true },
      { text: 'replace', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'setblock',
    documentation: 'Changes a block to another block.',
    permission_level: 1,
    parameters: [
      { text: 'setblock', type: ParameterType.keyword, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: true },
      { text: 'position y', type: ParameterType.coordinate, required: true },
      { text: 'position z', type: ParameterType.coordinate, required: true },
      { text: 'tile name', type: ParameterType.block, required: true },
      { text: 'destroy', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'setblock',
    documentation: 'Changes a block to another block.',
    permission_level: 1,
    parameters: [
      { text: 'setblock', type: ParameterType.keyword, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: true },
      { text: 'position y', type: ParameterType.coordinate, required: true },
      { text: 'position z', type: ParameterType.coordinate, required: true },
      { text: 'tile name', type: ParameterType.block, required: true },
      { text: 'keep', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'setblock',
    documentation: 'Changes a block to another block.',
    permission_level: 1,
    parameters: [
      { text: 'setblock', type: ParameterType.keyword, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: true },
      { text: 'position y', type: ParameterType.coordinate, required: true },
      { text: 'position z', type: ParameterType.coordinate, required: true },
      { text: 'tile name', type: ParameterType.block, required: true },
      { text: 'replace', type: ParameterType.keyword, required: false },
    ],
  },
];
