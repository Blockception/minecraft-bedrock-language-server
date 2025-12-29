
import { BaseObject } from 'bc-minecraft-bedrock-types';
import { MolangSet } from 'bc-minecraft-molang';
import { Using } from '../../../types/references';

/** */
export interface AnimationController extends BaseObject {
  /** */
  molang: MolangSet;
  /** */
  animations: Using;
  /** */
  particles: Using;
  /** */
  sounds: Using;
}
