
import { MolangSet } from 'bc-minecraft-molang';
import { References, Using } from '../../../types/references';
import { BaseObject } from 'bc-minecraft-bedrock-types';

/** */
export interface AnimationController extends BaseObject {
  /** */
  molang: MolangSet;
  /** */
  animations: References;
  /** */
  events: Using;
}
