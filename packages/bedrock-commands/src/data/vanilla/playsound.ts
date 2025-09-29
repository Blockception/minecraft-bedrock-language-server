import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The playsound command */
export const playsound: CommandInfo[] = [
  {
    name: 'playsound',
    documentation: 'Plays a sound.',
    permission_level: 1,
    parameters: [
      { text: 'playsound', type: ParameterType.keyword, required: true },
      { text: 'sound', type: ParameterType.sound, required: true },
      { text: 'player', type: ParameterType.selector, required: false, options: { playerOnly: true } },
      { text: 'position x', type: ParameterType.coordinate, required: false },
      { text: 'position y', type: ParameterType.coordinate, required: false },
      { text: 'position z', type: ParameterType.coordinate, required: false },
      { text: 'volume', type: ParameterType.float, required: false },
      { text: 'pitch', type: ParameterType.float, required: false },
      { text: 'minimum volume', type: ParameterType.float, required: false },
    ],
  },
];
