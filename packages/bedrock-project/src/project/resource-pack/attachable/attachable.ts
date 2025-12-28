
import { MolangSet } from 'bc-minecraft-molang';
import { References } from '../../../types/references';

/** */
export interface Attachable extends BaseObject {
  /** */
  animations: References;
  /** */
  molang: MolangSet;
}
