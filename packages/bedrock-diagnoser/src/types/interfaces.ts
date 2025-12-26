import { References } from 'bc-minecraft-bedrock-project';
import { AnimationCarrier } from '../diagnostics/minecraft';
import { User } from '../diagnostics/molang';
import { Identifiable } from '@blockception/packages-shared';

/**
 * The type that is used to store the animation data & molang data
 */
export type EntityAnimationMolangCarrier = Identifiable & AnimationCarrier<References> & User;

export interface EventCarrier {
  events?: Map<string, any>;
}
