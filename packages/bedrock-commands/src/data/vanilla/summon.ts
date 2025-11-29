import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The summon command */
export const summon: CommandInfo[] = [
  {
    name: 'summon',
    documentation: 'Summons an entity.',
    permission_level: 1,
    parameters: [
      { text: 'summon', type: ParameterType.keyword, required: true },
      { text: 'entity type', type: ParameterType.entity, required: true },
      { text: 'name tag', type: ParameterType.string, required: true },
      { text: 'spawnPos x', type: ParameterType.coordinate, required: false },
      { text: 'spawnPos y', type: ParameterType.coordinate, required: false },
      { text: 'spawnPos z', type: ParameterType.coordinate, required: false },
    ],
  },
  {
    name: 'summon',
    documentation: 'Summons an entity.',
    permission_level: 1,
    parameters: [
      { text: 'summon', type: ParameterType.keyword, required: true },
      { text: 'entity type', type: ParameterType.entity, required: true },
      { text: 'spawnPos x', type: ParameterType.coordinate, required: false },
      { text: 'spawnPos y', type: ParameterType.coordinate, required: false },
      { text: 'spawnPos z', type: ParameterType.coordinate, required: false },
      { text: 'facing', type: ParameterType.keyword, required: true },
      { text: 'look at entity', type: ParameterType.selector, required: true },
      { text: 'spawn event', type: ParameterType.event, required: false },
      { text: 'name tag', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'summon',
    documentation: 'Summons an entity.',
    permission_level: 1,
    parameters: [
      { text: 'summon', type: ParameterType.keyword, required: true },
      { text: 'entity type', type: ParameterType.entity, required: true },
      { text: 'spawnPos x', type: ParameterType.coordinate, required: false },
      { text: 'spawnPos y', type: ParameterType.coordinate, required: false },
      { text: 'spawnPos z', type: ParameterType.coordinate, required: false },
      { text: 'facing', type: ParameterType.keyword, required: true },
      { text: 'lookAtPosition x', type: ParameterType.coordinate, required: true },
      { text: 'lookAtPosition y', type: ParameterType.coordinate, required: true },
      { text: 'lookAtPosition z', type: ParameterType.coordinate, required: true },
      { text: 'spawn event', type: ParameterType.event, required: false },
      { text: 'name tag', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'summon',
    documentation: 'Summons an entity.',
    permission_level: 1,
    parameters: [
      { text: 'summon', type: ParameterType.keyword, required: true },
      { text: 'entity type', type: ParameterType.entity, required: true },
      { text: 'spawnPos x', type: ParameterType.coordinate, required: false },
      { text: 'spawnPos y', type: ParameterType.coordinate, required: false },
      { text: 'spawnPos z', type: ParameterType.coordinate, required: false },
      { text: 'y rot', type: ParameterType.rotation, required: false },
      { text: 'x rot', type: ParameterType.rotation, required: false },
      { text: 'spawn event', type: ParameterType.event, required: false },
      { text: 'name tag', type: ParameterType.string, required: false },
    ],
  },
];