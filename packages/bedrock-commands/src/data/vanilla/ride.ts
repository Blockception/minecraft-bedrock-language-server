import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The ride command */
export const ride: CommandInfo[] = [
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'riders', type: ParameterType.selector, required: true },
      { text: 'start_riding', type: ParameterType.keyword, required: true },
      { text: 'ride', type: ParameterType.selector, required: true },
      { text: 'teleport ride', type: ParameterType.keyword, required: false },
      { text: 'if group fits', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'riders', type: ParameterType.selector, required: true },
      { text: 'start_riding', type: ParameterType.keyword, required: true },
      { text: 'ride', type: ParameterType.selector, required: true },
      { text: 'teleport ride', type: ParameterType.keyword, required: false },
      { text: 'until full', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'riders', type: ParameterType.selector, required: true },
      { text: 'start_riding', type: ParameterType.keyword, required: true },
      { text: 'ride', type: ParameterType.selector, required: true },
      { text: 'teleport rider', type: ParameterType.keyword, required: false },
      { text: 'if group fits', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'riders', type: ParameterType.selector, required: true },
      { text: 'start_riding', type: ParameterType.keyword, required: true },
      { text: 'ride', type: ParameterType.selector, required: true },
      { text: 'teleport rider', type: ParameterType.keyword, required: false },
      { text: 'until full', type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'riders', type: ParameterType.selector, required: true },
      { text: 'stop_riding', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'riders', type: ParameterType.selector, required: true },
      { text: 'summon_ride', type: ParameterType.keyword, required: true },
      { text: 'entity type', type: ParameterType.entity, required: true },
      { text: 'no ride change', type: ParameterType.keyword, required: false },
      { text: 'spawn event', type: ParameterType.string, required: false },
      { text: 'name tag', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'riders', type: ParameterType.selector, required: true },
      { text: 'summon_ride', type: ParameterType.keyword, required: true },
      { text: 'entity type', type: ParameterType.entity, required: true },
      { text: 'reassign rides', type: ParameterType.keyword, required: false },
      { text: 'spawn event', type: ParameterType.string, required: false },
      { text: 'name tag', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'riders', type: ParameterType.selector, required: true },
      { text: 'summon_ride', type: ParameterType.keyword, required: true },
      { text: 'entity type', type: ParameterType.entity, required: true },
      { text: 'skip riders', type: ParameterType.keyword, required: false },
      { text: 'spawn event', type: ParameterType.string, required: false },
      { text: 'name tag', type: ParameterType.string, required: false },
    ],
  },
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'rides', type: ParameterType.selector, required: true },
      { text: 'evict_riders', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'ride',
    documentation: 'Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.',
    permission_level: 1,
    parameters: [
      { text: 'ride', type: ParameterType.keyword, required: true },
      { text: 'rides', type: ParameterType.selector, required: true },
      { text: 'summon_rider', type: ParameterType.keyword, required: true },
      { text: 'entity type', type: ParameterType.entity, required: true },
      { text: 'spawn event', type: ParameterType.string, required: false },
      { text: 'name tag', type: ParameterType.string, required: false },
    ],
  },
];