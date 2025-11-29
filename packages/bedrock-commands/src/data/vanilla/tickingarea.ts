import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The tickingarea command */
export const tickingarea: CommandInfo[] = [
  {
    name: 'tickingarea',
    documentation: 'Add, remove, or list ticking areas.',
    permission_level: 1,
    parameters: [
      { text: 'tickingarea', type: ParameterType.keyword, required: true },
      { text: 'add', type: ParameterType.keyword, required: true },
      { text: 'circle', type: ParameterType.keyword, required: true },
      { text: 'center x', type: ParameterType.coordinate, required: true },
      { text: 'center y', type: ParameterType.coordinate, required: true },
      { text: 'center z', type: ParameterType.coordinate, required: true },
      { text: 'radius', type: ParameterType.integer, required: true },
      { text: 'name', type: ParameterType.tickingarea, required: false },
      { text: 'preload', type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: 'tickingarea',
    documentation: 'Add, remove, or list ticking areas.',
    permission_level: 1,
    parameters: [
      { text: 'tickingarea', type: ParameterType.keyword, required: true },
      { text: 'add', type: ParameterType.keyword, required: true },
      { text: 'from x', type: ParameterType.coordinate, required: true },
      { text: 'from y', type: ParameterType.coordinate, required: true },
      { text: 'from z', type: ParameterType.coordinate, required: true },
      { text: 'to x', type: ParameterType.coordinate, required: true },
      { text: 'to y', type: ParameterType.coordinate, required: true },
      { text: 'to z', type: ParameterType.coordinate, required: true },
      { text: 'name', type: ParameterType.tickingarea, required: false },
      { text: 'preload', type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: 'tickingarea',
    documentation: 'Add, remove, or list ticking areas.',
    permission_level: 1,
    parameters: [
      { text: 'tickingarea', type: ParameterType.keyword, required: true },
      { text: 'list', type: ParameterType.keyword, required: true },
      { text: 'all-dimensions', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'tickingarea',
    documentation: 'Add, remove, or list ticking areas.',
    permission_level: 1,
    parameters: [
      { text: 'tickingarea', type: ParameterType.keyword, required: true },
      { text: 'preload', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.tickingarea, required: true },
      { text: 'preload', type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: 'tickingarea',
    documentation: 'Add, remove, or list ticking areas.',
    permission_level: 1,
    parameters: [
      { text: 'tickingarea', type: ParameterType.keyword, required: true },
      { text: 'preload', type: ParameterType.keyword, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: true },
      { text: 'position y', type: ParameterType.coordinate, required: true },
      { text: 'position z', type: ParameterType.coordinate, required: true },
      { text: 'preload', type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: 'tickingarea',
    documentation: 'Add, remove, or list ticking areas.',
    permission_level: 1,
    parameters: [
      { text: 'tickingarea', type: ParameterType.keyword, required: true },
      { text: 'remove', type: ParameterType.keyword, required: true },
      { text: 'name', type: ParameterType.tickingarea, required: true },
    ],
  },
  {
    name: 'tickingarea',
    documentation: 'Add, remove, or list ticking areas.',
    permission_level: 1,
    parameters: [
      { text: 'tickingarea', type: ParameterType.keyword, required: true },
      { text: 'remove', type: ParameterType.keyword, required: true },
      { text: 'position x', type: ParameterType.coordinate, required: true },
      { text: 'position y', type: ParameterType.coordinate, required: true },
      { text: 'position z', type: ParameterType.coordinate, required: true },
    ],
  },
  {
    name: 'tickingarea',
    documentation: 'Add, remove, or list ticking areas.',
    permission_level: 1,
    parameters: [
      { text: 'tickingarea', type: ParameterType.keyword, required: true },
      { text: 'remove_all', type: ParameterType.keyword, required: true },
    ],
  },
];