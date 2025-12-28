
import { MolangSet } from 'bc-minecraft-molang';
import { References, Using } from '../../../types/references';

/** */
export interface AnimationController extends BaseObject {
  /** */
  molang: MolangSet;
  /** */
  animations: References;
  /** */
  events: Using;
}
